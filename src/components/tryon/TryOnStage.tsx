"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { 
  Camera, 
  CameraOff, 
  Upload, 
  RefreshCw, 
  Download, 
  Share2, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle,
  Eye,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Sliders,
  Scan,
  Maximize2
} from "lucide-react";
import { TryOnFrame, TRYON_FRAMES } from "@/data/tryon";
import { drawGlassesOnCanvas, preloadAllFrames } from "./glassesRenderer";
import { STORE_NAME, getWhatsAppLink } from "@/data/config";

interface CapturedAngle {
  dataUrl: string;
  img: HTMLImageElement;
  x: number;
  y: number;
  ipd: number;
  angle: number;
  yaw: number;
  pitch: number;
}

interface TryOnStageProps {
  selectedFrame: TryOnFrame;
  selectedTintId: string;
  sizeAdjustment: number;
  verticalAdjustment: number;
  compareMode: boolean;
  compareFrame?: TryOnFrame;
  onFaceShapeDetected?: (shape: "Oval" | "Round" | "Square" | "Heart") => void;
}

type ScanTarget = "front" | "left" | "right" | "up" | "down";

// Subtle audio feedback chime
function playChime(freq = 780) {
  try {
    if (typeof window === "undefined") return;
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {
    // Ignore audio policy errors
  }
}

export default function TryOnStage({
  selectedFrame,
  selectedTintId,
  sizeAdjustment,
  verticalAdjustment,
  compareMode,
  compareFrame,
  onFaceShapeDetected,
}: TryOnStageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Stage States:
  // "idle": Camera not started
  // "scanning": Lenskart-style 3D multi-directional head scan (front, left, right, up, down)
  // "calibrating": Processing 3D mesh (brief celebration animation)
  // "studio": Final try-on mode with 3D angle switcher (Live, Front, Left 45°, Right 45°, Up)
  const [stageMode, setStageMode] = useState<"idle" | "scanning" | "calibrating" | "studio">("idle");
  const [currentScanTarget, setCurrentScanTarget] = useState<ScanTarget>("front");
  const [completedTargets, setCompletedTargets] = useState<Record<ScanTarget, boolean>>({
    front: false,
    left: false,
    right: false,
    up: false,
    down: false,
  });

  // Captured 3D Multi-Angle Poses
  const capturedAngles = useRef<Partial<Record<ScanTarget, CapturedAngle>>>({});

  // Active view in studio mode: "live" | "front" | "left" | "right" | "up"
  const [activeAngleView, setActiveAngleView] = useState<"live" | "front" | "left" | "right" | "up">("live");
  const [rotationScrub, setRotationScrub] = useState<number>(0); // -45 to +45 deg

  const [streamActive, setStreamActive] = useState(false);
  const [loadingModel, setLoadingModel] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(null);
  const [snapshotUrl, setSnapshotUrl] = useState<string | null>(null);

  // Smoothing state refs for 30fps animation loop
  const smoothedPose = useRef<{
    x: number;
    y: number;
    scale: number;
    angle: number;
    yaw: number;
    pitch: number;
  } | null>(null);

  const faceLandmarkerRef = useRef<any>(null);
  const animFrameId = useRef<number | null>(null);
  const scanHoldTimer = useRef<number>(0);

  // Preload all photorealistic frames on mount
  useEffect(() => {
    preloadAllFrames(TRYON_FRAMES);
  }, []);

  // 1. Initialize MediaPipe Face Landmarker
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
        outputFacialTransformationMatrixes: true,
      });

      faceLandmarkerRef.current = landmarker;
      setLoadingModel(false);
      return landmarker;
    } catch (err: any) {
      console.warn("MediaPipe GPU initialization fallback:", err);
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
        setErrorMessage("Facial tracking engine could not be initialized in this browser. You can still upload a portrait photo.");
        setLoadingModel(false);
        return null;
      }
    }
  }, []);

  // 2. Start Camera and begin Lenskart 3D Face Scan
  const startCameraAndScan = async () => {
    setErrorMessage(null);
    setUploadedImage(null);
    capturedAngles.current = {};
    setCompletedTargets({
      front: false,
      left: false,
      right: false,
      up: false,
      down: false,
    });
    setCurrentScanTarget("front");

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
        setStageMode("scanning");
      }
    } catch (err: any) {
      console.error("Camera access error:", err);
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setErrorMessage("Camera permission was declined. Please enable camera access in your browser or upload a portrait photo.");
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        setErrorMessage("No camera detected on this device. You can upload a portrait photo to try on frames.");
      } else {
        setErrorMessage("Camera could not be accessed. HTTPS connection or local environment required.");
      }
    }
  };

  // 3. Stop Camera
  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setStreamActive(false);
    if (animFrameId.current) {
      cancelAnimationFrame(animFrameId.current);
    }
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  // Capture static snapshot for the current angle during calibration
  const captureAnglePose = (
    target: ScanTarget,
    video: HTMLVideoElement,
    pose: { x: number; y: number; ipd: number; angle: number; yaw: number; pitch: number }
  ) => {
    const offCanvas = document.createElement("canvas");
    offCanvas.width = video.videoWidth;
    offCanvas.height = video.videoHeight;
    const offCtx = offCanvas.getContext("2d");
    if (!offCtx) return;

    // Save mirrored snapshot
    offCtx.save();
    offCtx.scale(-1, 1);
    offCtx.drawImage(video, -offCanvas.width, 0, offCanvas.width, offCanvas.height);
    offCtx.restore();

    const dataUrl = offCanvas.toDataURL("image/jpeg", 0.92);
    const img = new window.Image();
    img.src = dataUrl;

    capturedAngles.current[target] = {
      dataUrl,
      img,
      ...pose,
    };

    playChime(target === "front" ? 660 : target === "left" ? 740 : target === "right" ? 820 : target === "up" ? 900 : 980);

    setCompletedTargets((prev) => {
      const updated = { ...prev, [target]: true };

      // Determine next scan target
      if (!updated.front) setCurrentScanTarget("front");
      else if (!updated.left) setCurrentScanTarget("left");
      else if (!updated.right) setCurrentScanTarget("right");
      else if (!updated.up) setCurrentScanTarget("up");
      else if (!updated.down) setCurrentScanTarget("down");
      else {
        // ALL 5 DIRECTIONS CAPTURED!
        finishCalibration();
      }

      return updated;
    });
  };

  const finishCalibration = () => {
    setStageMode("calibrating");
    playChime(1040);

    setTimeout(() => {
      setStageMode("studio");
      setActiveAngleView("live");
    }, 1400);
  };

  const skipCalibration = () => {
    setStageMode("studio");
    setActiveAngleView("live");
  };

  const restartScan = () => {
    capturedAngles.current = {};
    setCompletedTargets({
      front: false,
      left: false,
      right: false,
      up: false,
      down: false,
    });
    setCurrentScanTarget("front");
    setStageMode("scanning");
  };

  // 4. Handle Still Photo Upload Fallback
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    stopCamera();
    setErrorMessage(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        setUploadedImage(img);
        setStageMode("studio");
        setActiveAngleView("front");
        initFaceLandmarker().then(() => {
          processStillImage(img);
        });
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Process static photo upload
  const processStillImage = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    if (faceLandmarkerRef.current) {
      try {
        const results = faceLandmarkerRef.current.detect(img);
        if (results.faceLandmarks && results.faceLandmarks.length > 0) {
          const landmarks = results.faceLandmarks[0];
          setFaceDetected(true);
          renderFrameOverlay(ctx, landmarks, canvas.width, canvas.height, false);
          estimateFaceShape(landmarks);
        } else {
          setFaceDetected(true);
          drawGlassesOnCanvas({
            ctx,
            frame: selectedFrame,
            tintId: selectedTintId,
            x: canvas.width * 0.5,
            y: canvas.height * 0.42,
            ipd: canvas.width * 0.22,
            angle: 0,
            yaw: 0,
            pitch: 0,
            sizeAdjustment,
            verticalAdjustment,
          });
        }
      } catch (err) {
        console.error("Still image landmark error:", err);
      }
    }
  };

  // 5. Estimate Face Shape
  const estimateFaceShape = (landmarks: any[]) => {
    if (!onFaceShapeDetected) return;
    try {
      const topHead = landmarks[10];
      const chin = landmarks[152];
      const leftCheek = landmarks[234];
      const rightCheek = landmarks[454];
      const leftJaw = landmarks[58];
      const rightJaw = landmarks[288];

      const faceHeight = Math.hypot(chin.x - topHead.x, chin.y - topHead.y);
      const faceWidth = Math.hypot(rightCheek.x - leftCheek.x, rightCheek.y - leftCheek.y);
      const jawWidth = Math.hypot(rightJaw.x - leftJaw.x, rightJaw.y - leftJaw.y);

      const ratio = faceHeight / (faceWidth || 1);
      const jawToWidthRatio = jawWidth / (faceWidth || 1);

      if (ratio > 1.45) onFaceShapeDetected("Oval");
      else if (ratio < 1.15 && jawToWidthRatio < 0.8) onFaceShapeDetected("Round");
      else if (jawToWidthRatio > 0.85) onFaceShapeDetected("Square");
      else onFaceShapeDetected("Heart");
    } catch (e) {
      // ignore
    }
  };

  // 6. Draw 3D Glasses Overlay from Landmarks
  const renderFrameOverlay = (
    ctx: CanvasRenderingContext2D,
    landmarks: any[],
    width: number,
    height: number,
    isMirrored: boolean
  ) => {
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

    // True interpupillary distance
    const ipd = Math.hypot(rightEye.x - leftEye.x, rightEye.y - leftEye.y);

    // Roll angle
    const rawAngle = Math.atan2(rightEye.y - leftEye.y, rightEye.x - leftEye.x);

    // Pupil center line
    const pupilMidX = (leftEye.x + rightEye.x) / 2;
    const pupilMidY = (leftEye.y + rightEye.y) / 2;

    // Sellion (root of nose bridge between eyes)
    const noseRoot = landmarks[6] ? { x: landmarks[6].x * width, y: landmarks[6].y * height } : null;
    const targetY = noseRoot ? noseRoot.y * 0.72 + pupilMidY * 0.28 : pupilMidY;
    const targetX = pupilMidX;

    // 3D Yaw calculation (horizontal turn)
    const noseTipX = landmarks[4] ? landmarks[4].x * width : pupilMidX;
    const rawYaw = (noseTipX - pupilMidX) / (ipd * 0.38 || 1);

    // 3D Pitch calculation (vertical tilt up/down)
    const noseTipY = landmarks[4] ? landmarks[4].y * height : pupilMidY;
    const neutralNoseDist = ipd * 0.58;
    const rawPitch = (noseTipY - pupilMidY - neutralNoseDist) / (ipd * 0.45 || 1);

    // Low-pass Lerp filter for silky smooth tracking
    if (!smoothedPose.current) {
      smoothedPose.current = {
        x: targetX,
        y: targetY,
        scale: ipd,
        angle: rawAngle,
        yaw: rawYaw,
        pitch: rawPitch,
      };
    } else {
      const lerpFactor = 0.35;
      smoothedPose.current.x += (targetX - smoothedPose.current.x) * lerpFactor;
      smoothedPose.current.y += (targetY - smoothedPose.current.y) * lerpFactor;
      smoothedPose.current.scale += (ipd - smoothedPose.current.scale) * lerpFactor;
      smoothedPose.current.angle += (rawAngle - smoothedPose.current.angle) * lerpFactor;
      smoothedPose.current.yaw += (rawYaw - smoothedPose.current.yaw) * lerpFactor;
      smoothedPose.current.pitch += (rawPitch - smoothedPose.current.pitch) * lerpFactor;
    }

    const { x, y, scale: smoothedIpd, angle, yaw, pitch } = smoothedPose.current;

    // Render with 3D perspective foreshortening & temple arms
    drawGlassesOnCanvas({
      ctx,
      frame: selectedFrame,
      tintId: selectedTintId,
      x,
      y,
      ipd: smoothedIpd,
      angle,
      yaw,
      pitch,
      sizeAdjustment,
      verticalAdjustment,
    });

    return { x, y, ipd: smoothedIpd, angle, yaw, pitch };
  };

  // 7. Video Frame Animation Loop
  useEffect(() => {
    if (!streamActive) return;

    let isRunning = true;
    let lastVideoTime = -1;

    const renderLoop = () => {
      if (!isRunning) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;

      // In studio mode when user selected a static captured angle:
      if (stageMode === "studio" && activeAngleView !== "live") {
        const captured = capturedAngles.current[activeAngleView];
        if (captured && canvas) {
          if (canvas.width !== captured.img.naturalWidth || canvas.height !== captured.img.naturalHeight) {
            canvas.width = captured.img.naturalWidth || 1280;
            canvas.height = captured.img.naturalHeight || 960;
          }
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(captured.img, 0, 0, canvas.width, canvas.height);
            // Render glasses with the captured 3D angle pose!
            drawGlassesOnCanvas({
              ctx,
              frame: selectedFrame,
              tintId: selectedTintId,
              x: captured.x,
              y: captured.y,
              ipd: captured.ipd,
              angle: captured.angle,
              yaw: captured.yaw + (rotationScrub * Math.PI) / 180,
              pitch: captured.pitch,
              sizeAdjustment,
              verticalAdjustment,
            });
          }
        }
        animFrameId.current = requestAnimationFrame(renderLoop);
        return;
      }

      // Live Video Tracking Mode (both during scanning and in live studio mirror)
      if (video && canvas && video.readyState >= 2) {
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }

        const ctx = canvas.getContext("2d");
        if (ctx) {
          // Mirror video horizontally for natural selfie vanity experience
          ctx.save();
          ctx.scale(-1, 1);
          ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
          ctx.restore();

          // Face Landmarker detection
          if (faceLandmarkerRef.current && video.currentTime !== lastVideoTime) {
            lastVideoTime = video.currentTime;
            try {
              const startTimeMs = performance.now();
              const detections = faceLandmarkerRef.current.detectForVideo(video, startTimeMs);

              if (detections.faceLandmarks && detections.faceLandmarks.length > 0) {
                const rawLandmarks = detections.faceLandmarks[0];
                setFaceDetected(true);

                // Mirror landmark X coordinates
                const mirroredLandmarks = rawLandmarks.map((lm: any) => ({
                  ...lm,
                  x: 1 - lm.x,
                }));

                // In "scanning" mode: render calibration mesh and detect 5-directional head movements
                if (stageMode === "scanning") {
                  drawScanningHUD(ctx, mirroredLandmarks, canvas.width, canvas.height, video);
                } else if (stageMode === "studio" && activeAngleView === "live") {
                  // In "studio" live mode: render photorealistic 3D glasses!
                  renderFrameOverlay(ctx, mirroredLandmarks, canvas.width, canvas.height, true);
                  estimateFaceShape(rawLandmarks);
                }
              } else {
                setFaceDetected(false);
              }
            } catch (err) {
              // Frame dropped
            }
          }
        }
      }

      animFrameId.current = requestAnimationFrame(renderLoop);
    };

    animFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      isRunning = false;
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [streamActive, stageMode, activeAngleView, currentScanTarget, selectedFrame, selectedTintId, sizeAdjustment, verticalAdjustment, rotationScrub]);

  // 8. Lenskart-Style 3D Scanning HUD & Movement Detector
  const drawScanningHUD = (
    ctx: CanvasRenderingContext2D,
    landmarks: any[],
    width: number,
    height: number,
    video: HTMLVideoElement
  ) => {
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
    const pupilMidX = (leftEye.x + rightEye.x) / 2;
    const pupilMidY = (leftEye.y + rightEye.y) / 2;
    const rawAngle = Math.atan2(rightEye.y - leftEye.y, rightEye.x - leftEye.x);

    const noseTipX = landmarks[4] ? landmarks[4].x * width : pupilMidX;
    const noseTipY = landmarks[4] ? landmarks[4].y * height : pupilMidY;
    const rawYaw = (noseTipX - pupilMidX) / (ipd * 0.38 || 1);
    const neutralNoseDist = ipd * 0.58;
    const rawPitch = (noseTipY - pupilMidY - neutralNoseDist) / (ipd * 0.45 || 1);

    const noseRoot = landmarks[6] ? { x: landmarks[6].x * width, y: landmarks[6].y * height } : null;
    const targetY = noseRoot ? noseRoot.y * 0.72 + pupilMidY * 0.28 : pupilMidY;
    const targetX = pupilMidX;

    const pose = {
      x: targetX,
      y: targetY,
      ipd,
      angle: rawAngle,
      yaw: rawYaw,
      pitch: rawPitch,
    };

    // Draw Biometric Oval Face Scanner Target
    ctx.save();
    const ovalW = ipd * 1.65;
    const ovalH = ipd * 2.3;

    ctx.beginPath();
    ctx.ellipse(pupilMidX, pupilMidY + ipd * 0.2, ovalW, ovalH, 0, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(184, 155, 106, 0.4)";
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 8]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Check conditions for the current directional target
    let targetMet = false;
    if (currentScanTarget === "front" && Math.abs(rawYaw) < 0.14 && Math.abs(rawPitch) < 0.16) {
      targetMet = true;
    } else if (currentScanTarget === "left" && rawYaw < -0.22) {
      targetMet = true;
    } else if (currentScanTarget === "right" && rawYaw > 0.22) {
      targetMet = true;
    } else if (currentScanTarget === "up" && rawPitch < -0.18) {
      targetMet = true;
    } else if (currentScanTarget === "down" && rawPitch > 0.18) {
      targetMet = true;
    }

    if (targetMet) {
      scanHoldTimer.current += 1;
      // Active glow on target achieved
      ctx.beginPath();
      ctx.ellipse(pupilMidX, pupilMidY + ipd * 0.2, ovalW, ovalH, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "#B89B6A";
      ctx.lineWidth = 4;
      ctx.stroke();

      if (scanHoldTimer.current >= 15) { // Held for ~0.5s
        scanHoldTimer.current = 0;
        captureAnglePose(currentScanTarget, video, pose);
      }
    } else {
      scanHoldTimer.current = Math.max(0, scanHoldTimer.current - 1);
    }

    ctx.restore();
  };

  // 9. Capture Snapshot with Watermark
  const takeSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const snapCanvas = document.createElement("canvas");
    snapCanvas.width = canvas.width;
    snapCanvas.height = canvas.height;
    const snapCtx = snapCanvas.getContext("2d");
    if (!snapCtx) return;

    snapCtx.drawImage(canvas, 0, 0);

    // Subtle luxury watermark
    snapCtx.save();
    snapCtx.fillStyle = "rgba(20, 17, 15, 0.85)";
    snapCtx.fillRect(16, snapCanvas.height - 48, 320, 32);

    snapCtx.font = "bold 12px sans-serif";
    snapCtx.fillStyle = "#B89B6A";
    snapCtx.fillText(`DEMOOPTICS • 3D FITTING SALON`, 28, snapCanvas.height - 28);
    snapCtx.restore();

    const dataUrl = snapCanvas.toDataURL("image/png");
    setSnapshotUrl(dataUrl);
  };

  const downloadSnapshot = () => {
    if (!snapshotUrl) return;
    const link = document.createElement("a");
    link.download = `DemoOptics-${selectedFrame.slug}-3D-tryon.png`;
    link.href = snapshotUrl;
    link.click();
  };

  // Scan progress calculation (0% to 100%)
  const completedCount = Object.values(completedTargets).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / 5) * 100);

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Hidden Video Feed */}
      <video
        ref={videoRef}
        playsInline
        muted
        className="hidden"
      />

      {/* Main Luxury Mirror Stage Container */}
      <div className="relative w-full aspect-[4/3] max-w-[720px] bg-[#14110F] rounded-[2px] overflow-hidden border border-[#14110F]/15 shadow-2xl flex items-center justify-center">
        {/* Luxury Corner Brackets */}
        <div className="corner-bracket-tl" />
        <div className="corner-bracket-tr" />
        <div className="corner-bracket-bl" />
        <div className="corner-bracket-br" />

        {/* Live Canvas Feed */}
        <canvas
          ref={canvasRef}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            streamActive || uploadedImage ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 pointer-events-none mirror-vignette opacity-70" />

        {/* 1. LENSKART-STYLE 3D SCANNING HUD OVERLAY */}
        {stageMode === "scanning" && (
          <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-6">
            {/* Top Scan Status Bar */}
            <div className="flex items-center justify-between">
              <div className="px-3.5 py-1.5 bg-[#14110F]/90 backdrop-blur-md border border-[#B89B6A]/50 rounded-[2px] flex items-center gap-2">
                <Scan className="w-3.5 h-3.5 text-[#B89B6A] animate-pulse" />
                <span className="text-[10px] uppercase font-sans tracking-[0.2em] font-bold text-[#D4BE96]">
                  3D Biometric Head Scan ({progressPercent}%)
                </span>
              </div>

              <button
                onClick={skipCalibration}
                className="pointer-events-auto px-3 py-1 bg-[#14110F]/80 hover:bg-white/10 text-[10px] uppercase font-sans tracking-widest text-[#A89F95] hover:text-white rounded-[2px] border border-white/10 transition-colors"
              >
                Skip to Live →
              </button>
            </div>

            {/* Direction Indicators Crosshair HUD */}
            <div className="flex flex-col items-center justify-center my-auto">
              <div className="relative w-72 h-80 flex items-center justify-center">
                {/* UP Arrow Indicator */}
                <div className={`absolute top-0 flex flex-col items-center transition-all ${
                  currentScanTarget === "up" ? "scale-125 text-[#B89B6A] animate-bounce" : completedTargets.up ? "text-emerald-400" : "text-white/30"
                }`}>
                  <ArrowUp className="w-6 h-6" />
                  <span className="text-[9px] uppercase font-mono font-bold tracking-wider">Up</span>
                </div>

                {/* DOWN Arrow Indicator */}
                <div className={`absolute bottom-0 flex flex-col items-center transition-all ${
                  currentScanTarget === "down" ? "scale-125 text-[#B89B6A] animate-bounce" : completedTargets.down ? "text-emerald-400" : "text-white/30"
                }`}>
                  <span className="text-[9px] uppercase font-mono font-bold tracking-wider">Down</span>
                  <ArrowDown className="w-6 h-6" />
                </div>

                {/* LEFT Arrow Indicator */}
                <div className={`absolute left-0 flex items-center gap-1 transition-all ${
                  currentScanTarget === "left" ? "scale-125 text-[#B89B6A] animate-pulse" : completedTargets.left ? "text-emerald-400" : "text-white/30"
                }`}>
                  <ChevronLeft className="w-6 h-6" />
                  <span className="text-[9px] uppercase font-mono font-bold tracking-wider">Left</span>
                </div>

                {/* RIGHT Arrow Indicator */}
                <div className={`absolute right-0 flex items-center gap-1 transition-all ${
                  currentScanTarget === "right" ? "scale-125 text-[#B89B6A] animate-pulse" : completedTargets.right ? "text-emerald-400" : "text-white/30"
                }`}>
                  <span className="text-[9px] uppercase font-mono font-bold tracking-wider">Right</span>
                  <ChevronRight className="w-6 h-6" />
                </div>

                {/* Center Target Notification Pill */}
                <div className="px-4 py-2 bg-[#14110F]/90 backdrop-blur-md border border-[#B89B6A] rounded-[2px] shadow-2xl text-center">
                  <div className="text-[10px] uppercase font-sans tracking-[0.2em] font-bold text-[#B89B6A] mb-0.5">
                    {currentScanTarget === "front" && "Step 1: Look Straight"}
                    {currentScanTarget === "left" && "Step 2: Slowly Turn Head Left"}
                    {currentScanTarget === "right" && "Step 3: Slowly Turn Head Right"}
                    {currentScanTarget === "up" && "Step 4: Tilt Chin Up"}
                    {currentScanTarget === "down" && "Step 5: Tilt Chin Down"}
                  </div>
                  <div className="text-[11px] text-[#EDE5D8] font-medium">
                    {currentScanTarget === "front" && "Keep face centered in frame"}
                    {currentScanTarget === "left" && "Turn head ~30° to capture profile"}
                    {currentScanTarget === "right" && "Turn head ~30° to capture profile"}
                    {currentScanTarget === "up" && "Slight upward angle"}
                    {currentScanTarget === "down" && "Slight downward angle"}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 5 Dots Progress Step Strip */}
            <div className="flex items-center justify-center gap-3">
              {(["front", "left", "right", "up", "down"] as ScanTarget[]).map((tgt, i) => (
                <div key={tgt} className="flex items-center gap-1.5 px-3 py-1 bg-[#14110F]/85 border border-white/10 rounded-[2px]">
                  <span className={`w-2 h-2 rounded-full ${
                    completedTargets[tgt] ? "bg-emerald-400" : currentScanTarget === tgt ? "bg-[#B89B6A] animate-ping" : "bg-white/20"
                  }`} />
                  <span className={`text-[9px] uppercase font-mono tracking-wider ${
                    completedTargets[tgt] ? "text-emerald-300 font-bold" : currentScanTarget === tgt ? "text-[#D4BE96] font-bold" : "text-white/40"
                  }`}>
                    {tgt}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. CALIBRATION CELEBRATION MODAL OVERLAY */}
        {stageMode === "calibrating" && (
          <div className="absolute inset-0 z-30 bg-[#14110F]/90 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center text-[#F7F3EC]">
            <div className="w-16 h-16 rounded-full border-2 border-[#B89B6A] bg-[#B89B6A]/15 flex items-center justify-center text-[#B89B6A] mb-4 animate-spin">
              <RefreshCw className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-2xl text-white font-normal mb-1">
              3D Facial Geometry Calibrated
            </h4>
            <p className="text-xs text-[#B89B6A] uppercase tracking-[0.2em] font-mono font-bold mb-3">
              14-Point Biometric Fit Locked
            </p>
            <p className="text-xs text-[#A89F95] max-w-sm">
              Rendering precision frame fit with 3D temple arms, perspective foreshortening, and multi-angle views...
            </p>
          </div>
        )}

        {/* 3. MULTI-ANGLE STUDIO HUD (Lenskart Signature Experience) */}
        {stageMode === "studio" && (
          <div className="absolute top-4 inset-x-4 sm:inset-x-6 z-20 flex flex-col gap-2 pointer-events-none">
            {/* Top Bar: Angle Switcher Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
              {/* Angle Selector Pills */}
              <div className="flex items-center gap-1 p-1 bg-[#14110F]/90 backdrop-blur-md border border-white/15 rounded-[2px] shadow-lg">
                <button
                  onClick={() => setActiveAngleView("live")}
                  className={`px-3 py-1.5 rounded-[2px] text-[10px] uppercase font-sans tracking-[0.16em] font-bold transition-all ${
                    activeAngleView === "live"
                      ? "bg-[#B89B6A] text-[#14110F] shadow-xs"
                      : "text-[#A89F95] hover:text-white"
                  }`}
                >
                  Live 3D Mirror
                </button>

                {capturedAngles.current.front && (
                  <button
                    onClick={() => setActiveAngleView("front")}
                    className={`px-2.5 py-1.5 rounded-[2px] text-[10px] uppercase font-sans tracking-[0.16em] font-bold transition-all ${
                      activeAngleView === "front"
                        ? "bg-[#B89B6A] text-[#14110F] shadow-xs"
                        : "text-[#A89F95] hover:text-white"
                    }`}
                  >
                    Front (0°)
                  </button>
                )}

                {capturedAngles.current.left && (
                  <button
                    onClick={() => setActiveAngleView("left")}
                    className={`px-2.5 py-1.5 rounded-[2px] text-[10px] uppercase font-sans tracking-[0.16em] font-bold transition-all ${
                      activeAngleView === "left"
                        ? "bg-[#B89B6A] text-[#14110F] shadow-xs"
                        : "text-[#A89F95] hover:text-white"
                    }`}
                  >
                    Left Profile
                  </button>
                )}

                {capturedAngles.current.right && (
                  <button
                    onClick={() => setActiveAngleView("right")}
                    className={`px-2.5 py-1.5 rounded-[2px] text-[10px] uppercase font-sans tracking-[0.16em] font-bold transition-all ${
                      activeAngleView === "right"
                        ? "bg-[#B89B6A] text-[#14110F] shadow-xs"
                        : "text-[#A89F95] hover:text-white"
                    }`}
                  >
                    Right Profile
                  </button>
                )}
              </div>

              {/* Re-Scan 3D Face Button */}
              <button
                onClick={restartScan}
                className="px-3 py-1.5 bg-[#14110F]/90 hover:bg-[#2A2623] text-[#D4BE96] border border-[#B89B6A]/40 rounded-[2px] text-[10px] uppercase font-sans tracking-[0.16em] font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                title="Run the 3D head movement scan again"
              >
                <RotateCcw className="w-3 h-3 text-[#B89B6A]" />
                <span className="hidden sm:inline">Re-scan Face</span>
              </button>
            </div>
          </div>
        )}

        {/* 4. IDLE / LANDING SCREEN */}
        {stageMode === "idle" && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 text-center bg-[#14110F]/90 backdrop-blur-xs text-[#F7F3EC]">
            <div className="w-16 h-16 rounded-full border border-[#B89B6A]/50 bg-[#B89B6A]/10 flex items-center justify-center text-[#B89B6A] mb-5">
              <Scan className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-2">
              Lenskart-Grade 3D Face Scan
            </h3>
            <p className="text-xs text-[#A89F95] max-w-sm mb-6 font-light leading-relaxed">
              Step in front of your camera. You will be guided to look straight, turn left, turn right, and tilt up/down to calibrate your exact 3D facial mesh & temple fit.
            </p>

            {loadingModel ? (
              <div className="flex items-center gap-3 px-6 py-3 bg-[#2A2623] border border-[#B89B6A]/40 rounded-[2px] text-xs font-sans uppercase tracking-[0.18em] text-[#D4BE96]">
                <RefreshCw className="w-4 h-4 animate-spin text-[#B89B6A]" />
                <span>Initializing 3D Vision Engine...</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={startCameraAndScan}
                  className="px-7 py-3.5 bg-[#B89B6A] text-[#14110F] hover:bg-[#D4BE96] rounded-[2px] text-xs font-sans uppercase tracking-[0.2em] font-bold transition-all shadow-md flex items-center gap-2"
                >
                  <Scan className="w-4 h-4" />
                  <span>Start 3D Face Scan</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3.5 border border-white/20 text-white hover:bg-white/10 rounded-[2px] text-xs font-sans uppercase tracking-[0.18em] font-bold transition-all flex items-center gap-2"
                >
                  <Upload className="w-4 h-4 text-[#B89B6A]" />
                  <span>Upload Photo</span>
                </button>
              </div>
            )}

            {errorMessage && (
              <div className="mt-6 p-3 bg-red-950/60 border border-red-500/30 rounded-[2px] text-xs text-red-200 max-w-md flex items-start gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>
        )}

        {/* Bottom Stage Controls (Snapshot, Turn Off) */}
        {(stageMode === "studio" || uploadedImage) && (
          <div className="absolute bottom-4 inset-x-6 z-20 flex items-center justify-between">
            <button
              onClick={takeSnapshot}
              className="px-4 py-2 bg-[#14110F]/85 hover:bg-[#B89B6A] text-[#F7F3EC] hover:text-[#14110F] border border-white/20 hover:border-[#B89B6A] rounded-[2px] text-[10px] uppercase font-sans tracking-[0.18em] font-bold transition-all backdrop-blur-xs flex items-center gap-1.5 shadow-sm"
              title="Capture high-resolution portrait with glasses"
            >
              <Camera className="w-3.5 h-3.5 text-[#B89B6A]" />
              <span>Capture Snapshot</span>
            </button>

            {streamActive ? (
              <button
                onClick={stopCamera}
                className="px-3.5 py-2 bg-[#14110F]/85 hover:bg-red-950/80 text-[#A89F95] hover:text-red-200 border border-white/10 hover:border-red-500/30 rounded-[2px] text-[10px] uppercase font-sans tracking-[0.18em] font-bold transition-all backdrop-blur-xs flex items-center gap-1.5"
              >
                <CameraOff className="w-3.5 h-3.5" />
                <span>Turn Off</span>
              </button>
            ) : (
              <button
                onClick={startCameraAndScan}
                className="px-3.5 py-2 bg-[#B89B6A] text-[#14110F] hover:bg-[#D4BE96] rounded-[2px] text-[10px] uppercase font-sans tracking-[0.18em] font-bold transition-all flex items-center gap-1.5"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Open 3D Camera</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Snapshot Preview Modal Dialog */}
      {snapshotUrl && (
        <div className="fixed inset-0 z-50 bg-[#14110F]/85 backdrop-blur-md flex items-center justify-center p-6">
          <div className="relative max-w-lg w-full bg-[#F7F3EC] border border-[#B89B6A]/50 rounded-[2px] p-6 text-[#14110F] shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#14110F]/10 mb-4">
              <span className="font-serif text-lg font-bold text-[#14110F]">
                Your DemoOptics Fitting Portrait
              </span>
              <button
                onClick={() => setSnapshotUrl(null)}
                className="text-xs uppercase tracking-widest text-[#7A7168] hover:text-[#14110F] font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="relative aspect-[4/3] w-full rounded-[2px] overflow-hidden border border-[#14110F]/10 mb-5 bg-[#14110F]">
              <Image
                src={snapshotUrl}
                alt="DemoOptics Fitting Portrait"
                fill
                className="object-contain"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                onClick={downloadSnapshot}
                className="flex-1 py-3 bg-[#14110F] text-[#F7F3EC] hover:bg-[#B89B6A] hover:text-[#14110F] rounded-[2px] text-xs font-sans uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download PNG</span>
              </button>

              <a
                href={getWhatsAppLink(
                  `Hello DemoOptics! I just calibrated my 3D Face Scan and tried on the ${selectedFrame.brand} ${selectedFrame.name} (₹${selectedFrame.price.toLocaleString("en-IN")}) in your Virtual Try-On studio. I'd love to reserve it for an in-store trial.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-[#B89B6A] text-[#14110F] hover:bg-[#2A2623] hover:text-[#F7F3EC] rounded-[2px] text-xs font-sans uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Share WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Guarantee Banner */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#7A7168] font-medium">
        <ShieldCheck className="w-4 h-4 text-[#B89B6A]" />
        <span>Your biometric scan runs 100% on-device. Nothing is uploaded or stored.</span>
      </div>
    </div>
  );
}
