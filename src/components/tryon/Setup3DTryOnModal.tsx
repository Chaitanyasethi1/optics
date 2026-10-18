"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  X,
  Camera,
  Upload,
  AlertCircle,
  RefreshCw,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Compass,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Check,
} from "lucide-react";
import { useTryOn } from "@/context/TryOnContext";

type ScanStep = "front" | "left" | "right" | "up" | "down" | "completed";

export default function Setup3DTryOnModal() {
  const { setupModalOpen, setSetupModalOpen, setTryOnData, userPhoto } = useTryOn();

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const faceLandmarkerRef = useRef<any>(null);
  const animLoopRef = useRef<number | null>(null);

  const [activeTab, setActiveTab] = useState<"instant" | "scan3d">("scan3d");
  const [streamActive, setStreamActive] = useState(false);
  const [loadingModel, setLoadingModel] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  // 3D 5-Direction Scan State
  const [scanStep, setScanStep] = useState<ScanStep>("front");
  const [stepHoldProgress, setStepHoldProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState({
    front: false,
    left: false,
    right: false,
    up: false,
    down: false,
  });
  const savedFrontData = useRef<{ dataUrl: string; calib: any } | null>(null);
  const holdCounter = useRef(0);

  // Play audio feedback chime
  const playChime = useCallback((freq = 880) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch (e) {
      // AudioContext unavailable or autoplay blocked
    }
  }, []);

  // Initialize MediaPipe Face Landmarker on modal open
  const initFaceLandmarker = useCallback(async () => {
    if (faceLandmarkerRef.current) return faceLandmarkerRef.current;
    try {
      setLoadingModel(true);
      const { FilesetResolver, FaceLandmarker } = await import("@mediapipe/tasks-vision");
      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
      );
      const landmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numFaces: 1,
      });

      faceLandmarkerRef.current = landmarker;
      setLoadingModel(false);
      return landmarker;
    } catch (err) {
      console.warn("GPU fallback to CPU:", err);
      try {
        const { FilesetResolver, FaceLandmarker } = await import("@mediapipe/tasks-vision");
        const filesetResolver = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
        );
        const landmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
            delegate: "CPU",
          },
          runningMode: "VIDEO",
          numFaces: 1,
        });
        faceLandmarkerRef.current = landmarker;
        setLoadingModel(false);
        return landmarker;
      } catch (cpuErr) {
        setErrorMessage("Facial vision engine could not be initialized in this browser.");
        setLoadingModel(false);
        return null;
      }
    }
  }, []);

  const startCamera = async () => {
    setErrorMessage(null);
    try {
      await initFaceLandmarker();
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 960 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setStreamActive(true);
      }
    } catch (err: any) {
      console.error("Camera access error:", err);
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setErrorMessage("Camera permission was declined. Please allow camera access or upload a photo.");
      } else {
        setErrorMessage("Camera unavailable. You can upload a portrait photo instead.");
      }
    }
  };

  const stopCamera = useCallback(() => {
    if (animLoopRef.current) {
      cancelAnimationFrame(animLoopRef.current);
      animLoopRef.current = null;
    }
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setStreamActive(false);
  }, []);

  useEffect(() => {
    if (setupModalOpen) {
      startCamera();
      // Reset scan step
      setScanStep("front");
      setCompletedSteps({ front: false, left: false, right: false, up: false, down: false });
      holdCounter.current = 0;
      setStepHoldProgress(0);
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [setupModalOpen]);

  // Extract calibration from a snapshot image/canvas
  const extractCalibration = async (canvasOrImg: HTMLCanvasElement | HTMLImageElement, width: number, height: number) => {
    let landmarker = faceLandmarkerRef.current;
    if (!landmarker) {
      landmarker = await initFaceLandmarker();
    }

    if (landmarker) {
      try {
        const results = landmarker.detect(canvasOrImg);
        if (results.faceLandmarks && results.faceLandmarks.length > 0) {
          const landmarks = results.faceLandmarks[0];

          // Eye pupil centers
          const eye1 = {
            x: ((landmarks[33].x + landmarks[133].x) / 2) * width,
            y: ((landmarks[33].y + landmarks[133].y) / 2) * height,
          };
          const eye2 = {
            x: ((landmarks[263].x + landmarks[362].x) / 2) * width,
            y: ((landmarks[263].y + landmarks[362].y) / 2) * height,
          };

          const leftEye = eye1.x < eye2.x ? eye1 : eye2;
          const rightEye = eye1.x < eye2.x ? eye2 : eye1;

          const ipd = Math.hypot(rightEye.x - leftEye.x, rightEye.y - leftEye.y);
          const angle = Math.atan2(rightEye.y - leftEye.y, rightEye.x - leftEye.x);

          const pupilMidX = (leftEye.x + rightEye.x) / 2;
          const pupilMidY = (leftEye.y + rightEye.y) / 2;

          const noseTipX = landmarks[4] ? landmarks[4].x * width : pupilMidX;
          const noseTipY = landmarks[4] ? landmarks[4].y * height : pupilMidY;
          const yaw = (noseTipX - pupilMidX) / (ipd * 0.4 || 1);
          const neutralNoseDist = ipd * 0.58;
          const pitch = (noseTipY - pupilMidY - neutralNoseDist) / (ipd * 0.45 || 1);

          return {
            x: pupilMidX,
            y: pupilMidY,
            ipd,
            angle,
            yaw,
            pitch,
            imgWidth: width,
            imgHeight: height,
          };
        }
      } catch (e) {
        console.error("Landmark error:", e);
      }
    }

    // Fallback: standard anatomical adult proportions centered in frame
    return {
      x: width * 0.5,
      y: height * 0.42,
      ipd: width * 0.24,
      angle: 0,
      yaw: 0,
      pitch: 0,
      imgWidth: width,
      imgHeight: height,
    };
  };

  // Helper to capture current video snapshot mirrored
  const captureMirroredSnapshot = () => {
    const video = videoRef.current;
    if (!video || video.readyState < 2) return null;

    const offCanvas = document.createElement("canvas");
    offCanvas.width = video.videoWidth;
    offCanvas.height = video.videoHeight;
    const ctx = offCanvas.getContext("2d");
    if (!ctx) return null;

    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(video, -offCanvas.width, 0, offCanvas.width, offCanvas.height);
    ctx.restore();

    return {
      canvas: offCanvas,
      dataUrl: offCanvas.toDataURL("image/jpeg", 0.92),
      width: offCanvas.width,
      height: offCanvas.height,
    };
  };

  // 1-Click Fast Photo Capture
  const handleTakePhoto = async () => {
    const snapshot = captureMirroredSnapshot();
    if (!snapshot) return;

    setIsCapturing(true);
    const calib = await extractCalibration(snapshot.canvas, snapshot.width, snapshot.height);
    playChime(920);

    setTryOnData(snapshot.dataUrl, calib);
    setIsCapturing(false);
    stopCamera();
    setSetupModalOpen(false);
  };

  // Upload still photo fallback
  const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCapturing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = async () => {
        const calib = await extractCalibration(img, img.naturalWidth || img.width, img.naturalHeight || img.height);
        playChime(920);
        setTryOnData(img.src, calib);
        setIsCapturing(false);
        stopCamera();
        setSetupModalOpen(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // 3D 5-Direction Live Tracking Loop
  useEffect(() => {
    if (!streamActive || activeTab !== "scan3d" || scanStep === "completed") return;

    let isRunning = true;
    let lastTime = -1;

    const loop = () => {
      if (!isRunning) return;

      const video = videoRef.current;
      const landmarker = faceLandmarkerRef.current;

      if (video && landmarker && video.readyState >= 2 && video.currentTime !== lastTime) {
        lastTime = video.currentTime;
        try {
          const detections = landmarker.detectForVideo(video, performance.now());
          if (detections.faceLandmarks && detections.faceLandmarks.length > 0) {
            const raw = detections.faceLandmarks[0];
            const w = video.videoWidth;
            const h = video.videoHeight;

            // Mirror landmarks for mirrored camera view
            const lm = raw.map((pt: any) => ({ ...pt, x: 1 - pt.x }));

            const eye1 = {
              x: ((lm[33].x + lm[133].x) / 2) * w,
              y: ((lm[33].y + lm[133].y) / 2) * h,
            };
            const eye2 = {
              x: ((lm[263].x + lm[362].x) / 2) * w,
              y: ((lm[263].y + lm[362].y) / 2) * h,
            };
            const leftEye = eye1.x < eye2.x ? eye1 : eye2;
            const rightEye = eye1.x < eye2.x ? eye2 : eye1;
            const ipd = Math.hypot(rightEye.x - leftEye.x, rightEye.y - leftEye.y);
            const pupilMidX = (leftEye.x + rightEye.x) / 2;
            const pupilMidY = (leftEye.y + rightEye.y) / 2;

            const noseTipX = lm[4] ? lm[4].x * w : pupilMidX;
            const noseTipY = lm[4] ? lm[4].y * h : pupilMidY;
            const yaw = (noseTipX - pupilMidX) / (ipd * 0.4 || 1);
            const neutralNoseDist = ipd * 0.58;
            const pitch = (noseTipY - pupilMidY - neutralNoseDist) / (ipd * 0.45 || 1);

            // Step evaluation
            let stepSatisfied = false;
            if (scanStep === "front") {
              stepSatisfied = Math.abs(yaw) < 0.16 && Math.abs(pitch) < 0.18;
            } else if (scanStep === "left") {
              stepSatisfied = yaw < -0.22;
            } else if (scanStep === "right") {
              stepSatisfied = yaw > 0.22;
            } else if (scanStep === "up") {
              stepSatisfied = pitch < -0.16;
            } else if (scanStep === "down") {
              stepSatisfied = pitch > 0.16;
            }

            if (stepSatisfied) {
              holdCounter.current += 1;
              const progress = Math.min(100, Math.round((holdCounter.current / 12) * 100));
              setStepHoldProgress(progress);

              if (holdCounter.current >= 12) {
                // Step target reached!
                holdCounter.current = 0;
                setStepHoldProgress(0);

                if (scanStep === "front") {
                  const snap = captureMirroredSnapshot();
                  if (snap) {
                    const angle = Math.atan2(rightEye.y - leftEye.y, rightEye.x - leftEye.x);
                    savedFrontData.current = {
                      dataUrl: snap.dataUrl,
                      calib: {
                        x: pupilMidX,
                        y: pupilMidY,
                        ipd,
                        angle,
                        yaw: 0,
                        pitch: 0,
                        imgWidth: w,
                        imgHeight: h,
                      },
                    };
                  }
                  playChime(660);
                  setCompletedSteps((prev) => ({ ...prev, front: true }));
                  setScanStep("left");
                } else if (scanStep === "left") {
                  playChime(740);
                  setCompletedSteps((prev) => ({ ...prev, left: true }));
                  setScanStep("right");
                } else if (scanStep === "right") {
                  playChime(820);
                  setCompletedSteps((prev) => ({ ...prev, right: true }));
                  setScanStep("up");
                } else if (scanStep === "up") {
                  playChime(900);
                  setCompletedSteps((prev) => ({ ...prev, up: true }));
                  setScanStep("down");
                } else if (scanStep === "down") {
                  playChime(1080);
                  setCompletedSteps((prev) => ({ ...prev, down: true }));
                  setScanStep("completed");

                  // Auto complete and activate across all catalogue cards!
                  setTimeout(() => {
                    if (savedFrontData.current) {
                      setTryOnData(savedFrontData.current.dataUrl, savedFrontData.current.calib);
                    }
                    stopCamera();
                    setSetupModalOpen(false);
                  }, 1200);
                }
              }
            } else {
              holdCounter.current = Math.max(0, holdCounter.current - 1);
              setStepHoldProgress(Math.min(100, Math.round((holdCounter.current / 12) * 100)));
            }
          }
        } catch (e) {
          // Frame skip
        }
      }

      animLoopRef.current = requestAnimationFrame(loop);
    };

    animLoopRef.current = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      if (animLoopRef.current) cancelAnimationFrame(animLoopRef.current);
    };
  }, [streamActive, activeTab, scanStep, playChime, setTryOnData, stopCamera, setSetupModalOpen]);

  if (!setupModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#14110F]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-[4px] shadow-2xl border border-[#14110F]/15 overflow-hidden flex flex-col">
        {/* Close Button */}
        <button
          onClick={() => setSetupModalOpen(false)}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-[#14110F] transition-colors"
          aria-label="Close 3D try on setup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Lenskart-Style Header */}
        <div className="pt-6 pb-3 px-6 text-center border-b border-[#14110F]/8">
          <h2 className="font-sans text-base sm:text-lg font-bold uppercase tracking-[0.18em] text-[#14110F]">
            SETUP 3D TRY ON
          </h2>
          <p className="text-[10px] sm:text-[11px] text-[#7A7168] uppercase tracking-[0.08em] font-medium mt-1 leading-relaxed max-w-sm mx-auto">
            FACE A LIGHT SOURCE, ALIGN YOUR FACE, TAKE OFF YOUR GLASSES, AND TUCK YOUR HAIR BEHIND YOUR EARS
          </p>

          {/* Mode Switch Tabs */}
          <div className="mt-3.5 inline-flex p-1 bg-[#F4EFE6] rounded-[2px] border border-[#14110F]/10">
            <button
              onClick={() => setActiveTab("scan3d")}
              className={`px-3 py-1.5 text-[9.5px] uppercase font-mono font-bold tracking-wider rounded-[2px] transition-all flex items-center gap-1.5 ${
                activeTab === "scan3d"
                  ? "bg-[#14110F] text-[#B89B6A] shadow-xs"
                  : "text-[#7A7168] hover:text-[#14110F]"
              }`}
            >
              <Compass className="w-3 h-3 text-[#B89B6A]" />
              <span>3D Multi-Angle Scan</span>
            </button>
            <button
              onClick={() => setActiveTab("instant")}
              className={`px-3 py-1.5 text-[9.5px] uppercase font-mono font-bold tracking-wider rounded-[2px] transition-all flex items-center gap-1.5 ${
                activeTab === "instant"
                  ? "bg-[#14110F] text-[#B89B6A] shadow-xs"
                  : "text-[#7A7168] hover:text-[#14110F]"
              }`}
            >
              <Camera className="w-3 h-3 text-[#B89B6A]" />
              <span>1-Click Instant Photo</span>
            </button>
          </div>
        </div>

        {/* Video / Camera Stage */}
        <div className="p-4 sm:p-5 flex flex-col items-center bg-[#FAF7F2]">
          <div className="relative w-64 sm:w-72 aspect-[3/4] rounded-[4px] overflow-hidden bg-[#14110F] border-2 border-white shadow-xl flex items-center justify-center">
            {/* Live Video */}
            <video
              ref={videoRef}
              playsInline
              muted
              className="w-full h-full object-cover scale-x-[-1]"
            />

            {/* Oval Face Guide Frame */}
            <div
              className={`absolute inset-4 border-2 rounded-[50%] pointer-events-none transition-colors duration-300 flex items-center justify-center ${
                stepHoldProgress > 50
                  ? "border-[#4ADE80] shadow-[0_0_15px_rgba(74,222,128,0.5)]"
                  : "border-dashed border-[#B89B6A]/80"
              }`}
            >
              {/* Center target dot */}
              <div
                className={`w-2 h-2 rounded-full transition-transform duration-200 ${
                  stepHoldProgress > 0 ? "bg-[#4ADE80] scale-125" : "bg-[#B89B6A] opacity-70"
                }`}
              />
            </div>

            {/* 3D Directional Overlay Prompts */}
            {activeTab === "scan3d" && streamActive && scanStep !== "completed" && (
              <div className="absolute top-3 inset-x-3 z-10 flex flex-col items-center pointer-events-none">
                <div className="px-3 py-1.5 bg-[#14110F]/90 backdrop-blur-md rounded-[2px] border border-[#B89B6A]/40 text-center shadow-lg animate-in fade-in">
                  <div className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#B89B6A] flex items-center justify-center gap-1.5">
                    {scanStep === "front" && <span>Look Straight (Center)</span>}
                    {scanStep === "left" && (
                      <>
                        <ArrowLeft className="w-3 h-3 animate-pulse text-[#B89B6A]" />
                        <span>Turn Face Left</span>
                      </>
                    )}
                    {scanStep === "right" && (
                      <>
                        <span>Turn Face Right</span>
                        <ArrowRight className="w-3 h-3 animate-pulse text-[#B89B6A]" />
                      </>
                    )}
                    {scanStep === "up" && (
                      <>
                        <ArrowUp className="w-3 h-3 animate-pulse text-[#B89B6A]" />
                        <span>Tilt Head Up</span>
                      </>
                    )}
                    {scanStep === "down" && (
                      <>
                        <ArrowDown className="w-3 h-3 animate-pulse text-[#B89B6A]" />
                        <span>Tilt Head Down</span>
                      </>
                    )}
                  </div>
                  {stepHoldProgress > 0 && (
                    <div className="w-full bg-white/20 h-1 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className="bg-[#4ADE80] h-full transition-all duration-100"
                        style={{ width: `${stepHoldProgress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Success Animation Overlay */}
            {scanStep === "completed" && (
              <div className="absolute inset-0 bg-[#14110F]/90 flex flex-col items-center justify-center text-white gap-2 animate-in zoom-in-95 duration-300">
                <CheckCircle2 className="w-12 h-12 text-[#4ADE80] animate-bounce" />
                <span className="text-xs uppercase font-mono font-bold tracking-[0.2em] text-[#D4BE96]">
                  3D Face Calibrated!
                </span>
                <span className="text-[10px] text-[#A69B8D] font-sans">
                  Updating catalogue with your face...
                </span>
              </div>
            )}

            {loadingModel && (
              <div className="absolute inset-0 bg-[#14110F]/85 flex flex-col items-center justify-center text-white gap-2">
                <RefreshCw className="w-6 h-6 animate-spin text-[#B89B6A]" />
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4BE96]">
                  Calibrating 3D Vision...
                </span>
              </div>
            )}
          </div>

          {/* 5-Direction Checklist Badges */}
          {activeTab === "scan3d" && (
            <div className="mt-3 flex items-center justify-center gap-2">
              <span
                className={`px-2 py-0.5 text-[8.5px] uppercase font-mono rounded-[2px] border flex items-center gap-0.5 ${
                  completedSteps.front
                    ? "bg-[#14110F] text-[#4ADE80] border-[#4ADE80]/40 font-bold"
                    : scanStep === "front"
                    ? "bg-[#B89B6A]/15 text-[#14110F] border-[#B89B6A] font-bold animate-pulse"
                    : "bg-white text-[#7A7168] border-[#14110F]/10"
                }`}
              >
                {completedSteps.front && <Check className="w-2.5 h-2.5" />}
                <span>Front</span>
              </span>
              <span
                className={`px-2 py-0.5 text-[8.5px] uppercase font-mono rounded-[2px] border flex items-center gap-0.5 ${
                  completedSteps.left
                    ? "bg-[#14110F] text-[#4ADE80] border-[#4ADE80]/40 font-bold"
                    : scanStep === "left"
                    ? "bg-[#B89B6A]/15 text-[#14110F] border-[#B89B6A] font-bold animate-pulse"
                    : "bg-white text-[#7A7168] border-[#14110F]/10"
                }`}
              >
                {completedSteps.left && <Check className="w-2.5 h-2.5" />}
                <span>Left</span>
              </span>
              <span
                className={`px-2 py-0.5 text-[8.5px] uppercase font-mono rounded-[2px] border flex items-center gap-0.5 ${
                  completedSteps.right
                    ? "bg-[#14110F] text-[#4ADE80] border-[#4ADE80]/40 font-bold"
                    : scanStep === "right"
                    ? "bg-[#B89B6A]/15 text-[#14110F] border-[#B89B6A] font-bold animate-pulse"
                    : "bg-white text-[#7A7168] border-[#14110F]/10"
                }`}
              >
                {completedSteps.right && <Check className="w-2.5 h-2.5" />}
                <span>Right</span>
              </span>
              <span
                className={`px-2 py-0.5 text-[8.5px] uppercase font-mono rounded-[2px] border flex items-center gap-0.5 ${
                  completedSteps.up
                    ? "bg-[#14110F] text-[#4ADE80] border-[#4ADE80]/40 font-bold"
                    : scanStep === "up"
                    ? "bg-[#B89B6A]/15 text-[#14110F] border-[#B89B6A] font-bold animate-pulse"
                    : "bg-white text-[#7A7168] border-[#14110F]/10"
                }`}
              >
                {completedSteps.up && <Check className="w-2.5 h-2.5" />}
                <span>Up</span>
              </span>
              <span
                className={`px-2 py-0.5 text-[8.5px] uppercase font-mono rounded-[2px] border flex items-center gap-0.5 ${
                  completedSteps.down
                    ? "bg-[#14110F] text-[#4ADE80] border-[#4ADE80]/40 font-bold"
                    : scanStep === "down"
                    ? "bg-[#B89B6A]/15 text-[#14110F] border-[#B89B6A] font-bold animate-pulse"
                    : "bg-white text-[#7A7168] border-[#14110F]/10"
                }`}
              >
                {completedSteps.down && <Check className="w-2.5 h-2.5" />}
                <span>Down</span>
              </span>
            </div>
          )}

          {errorMessage && (
            <div className="mt-3 p-2 bg-red-50 border border-red-200 text-red-700 rounded-[2px] text-xs flex items-center gap-2 max-w-sm">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Primary Action Button */}
          <div className="mt-4 w-full max-w-xs space-y-2.5">
            {activeTab === "instant" ? (
              <button
                onClick={handleTakePhoto}
                disabled={isCapturing || loadingModel}
                className="w-full py-3 bg-white border-2 border-[#14110F] hover:bg-[#14110F] text-[#14110F] hover:text-white rounded-[2px] text-xs uppercase font-sans tracking-[0.2em] font-bold shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isCapturing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#B89B6A]" />
                    <span>Calibrating...</span>
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4 text-[#B89B6A]" />
                    <span>TAKE PHOTO</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleTakePhoto}
                disabled={isCapturing || loadingModel}
                className="w-full py-2.5 bg-white border border-[#14110F]/20 hover:border-[#14110F] text-[#14110F] rounded-[2px] text-[10.5px] uppercase font-sans tracking-[0.16em] font-bold shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <Camera className="w-3.5 h-3.5 text-[#B89B6A]" />
                <span>Or Take Quick Photo Now</span>
              </button>
            )}

            {/* Upload Still Photo */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2 text-[10px] uppercase font-sans tracking-[0.16em] text-[#7A7168] hover:text-[#14110F] font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <Upload className="w-3 h-3 text-[#B89B6A]" />
              <span>Or Upload a Photo from Device</span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleUploadPhoto}
              className="hidden"
            />
          </div>
        </div>

        {/* Privacy line */}
        <div className="py-2.5 px-6 bg-white border-t border-[#14110F]/8 flex items-center justify-center gap-2 text-[10px] text-[#7A7168]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#B89B6A]" />
          <span>Biometric face data stays 100% on your device. Zero cloud uploads.</span>
        </div>
      </div>
    </div>
  );
}
