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
  Maximize2
} from "lucide-react";
import { TryOnFrame, TRYON_FRAMES } from "@/data/tryon";
import { drawGlassesOnCanvas, preloadAllFrames } from "./glassesRenderer";
import { STORE_NAME, getWhatsAppLink } from "@/data/config";

interface TryOnStageProps {
  selectedFrame: TryOnFrame;
  selectedTintId: string;
  sizeAdjustment: number;
  verticalAdjustment: number;
  compareMode: boolean;
  compareFrame?: TryOnFrame;
  onFaceShapeDetected?: (shape: "Oval" | "Round" | "Square" | "Heart") => void;
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

  const [streamActive, setStreamActive] = useState(false);
  const [loadingModel, setLoadingModel] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(null);
  const [snapshotUrl, setSnapshotUrl] = useState<string | null>(null);

  // Smoothing state refs (prevents re-render overhead in 30fps animation loop)
  const smoothedPose = useRef<{
    x: number;
    y: number;
    scale: number;
    angle: number;
    yaw: number;
  } | null>(null);

  const faceLandmarkerRef = useRef<any>(null);
  const animFrameId = useRef<number | null>(null);

  // 1. Initialize MediaPipe Face Landmarker on demand
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
      setModelReady(true);
      setLoadingModel(false);
      return landmarker;
    } catch (err: any) {
      console.warn("MediaPipe GPU initialization fallback:", err);
      // Fallback with CPU delegate if GPU delegate fails
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
        setModelReady(true);
        setLoadingModel(false);
        return landmarker;
      } catch (cpuErr) {
        setErrorMessage("Facial tracking engine could not be initialized in this browser. You can still upload a photo.");
        setLoadingModel(false);
        return null;
      }
    }
  }, []);

  // 2. Start Camera
  const startCamera = async () => {
    setErrorMessage(null);
    setUploadedImage(null);

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
        setErrorMessage("Camera permission was declined. Please allow camera access in your browser or upload a portrait photo.");
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

  // Clean up stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

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
        initFaceLandmarker().then(() => {
          processStillImage(img);
        });
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Preload all photorealistic frames on mount
  useEffect(() => {
    preloadAllFrames(TRYON_FRAMES);
  }, []);

  // Process a static photo with FaceLandmarker
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
          // Fallback approximate position in the middle
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

      if (ratio > 1.45) {
        onFaceShapeDetected("Oval");
      } else if (ratio < 1.15 && jawToWidthRatio < 0.8) {
        onFaceShapeDetected("Round");
      } else if (jawToWidthRatio > 0.85) {
        onFaceShapeDetected("Square");
      } else {
        onFaceShapeDetected("Heart");
      }
    } catch (e) {
      // ignore
    }
  };

  // 6. Draw Photorealistic Frame Overlay onto Canvas from Landmarks
  const renderFrameOverlay = (
    ctx: CanvasRenderingContext2D,
    landmarks: any[],
    width: number,
    height: number,
    isMirrored: boolean
  ) => {
    // MediaPipe key landmark indices:
    // Left eye outer: 33, inner: 133
    // Right eye outer: 263, inner: 362
    // Nose bridge root (Sellion): 6
    const eye1 = {
      x: ((landmarks[33].x + landmarks[133].x) / 2) * width,
      y: ((landmarks[33].y + landmarks[133].y) / 2) * height,
    };
    const eye2 = {
      x: ((landmarks[263].x + landmarks[362].x) / 2) * width,
      y: ((landmarks[263].y + landmarks[362].y) / 2) * height,
    };

    // Guarantee leftEye is horizontally to the left of rightEye on the rendered canvas
    const leftEye = eye1.x < eye2.x ? eye1 : eye2;
    const rightEye = eye1.x < eye2.x ? eye2 : eye1;

    // True interpupillary distance in pixels
    const ipd = Math.hypot(rightEye.x - leftEye.x, rightEye.y - leftEye.y);

    // Roll angle in radians
    const rawAngle = Math.atan2(rightEye.y - leftEye.y, rightEye.x - leftEye.x);

    // Pupil center line
    const pupilMidX = (leftEye.x + rightEye.x) / 2;
    const pupilMidY = (leftEye.y + rightEye.y) / 2;

    // Sellion (root of nose bridge between eyes) or pupil line
    const noseRoot = landmarks[6] ? { x: landmarks[6].x * width, y: landmarks[6].y * height } : null;
    const targetY = noseRoot ? noseRoot.y * 0.7 + pupilMidY * 0.3 : pupilMidY;
    const targetX = pupilMidX;

    // Estimate yaw (horizontal turning)
    const noseTip = landmarks[4] ? landmarks[4].x * width : pupilMidX;
    const rawYaw = (noseTip - pupilMidX) / (ipd * 0.4 || 1);

    // Smoothing with Lerp (Low-pass filter to eliminate jitter)
    if (!smoothedPose.current) {
      smoothedPose.current = {
        x: targetX,
        y: targetY,
        scale: ipd,
        angle: rawAngle,
        yaw: rawYaw,
      };
    } else {
      const lerpFactor = 0.32;
      smoothedPose.current.x += (targetX - smoothedPose.current.x) * lerpFactor;
      smoothedPose.current.y += (targetY - smoothedPose.current.y) * lerpFactor;
      smoothedPose.current.scale += (ipd - smoothedPose.current.scale) * lerpFactor;
      smoothedPose.current.angle += (rawAngle - smoothedPose.current.angle) * lerpFactor;
      smoothedPose.current.yaw += (rawYaw - smoothedPose.current.yaw) * lerpFactor;
    }

    const { x, y, scale: smoothedIpd, angle, yaw } = smoothedPose.current;

    // Render photorealistic selected frame overlay
    drawGlassesOnCanvas({
      ctx,
      frame: selectedFrame,
      tintId: selectedTintId,
      x,
      y,
      ipd: smoothedIpd,
      angle,
      yaw,
      sizeAdjustment,
      verticalAdjustment,
    });
  };

  // 7. Video Frame Loop
  useEffect(() => {
    if (!streamActive) return;

    let isRunning = true;
    let lastVideoTime = -1;

    const renderLoop = () => {
      if (!isRunning) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video && canvas && video.readyState >= 2) {
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }

        const ctx = canvas.getContext("2d");
        if (ctx) {
          // Mirror video horizontally for selfie vanity experience
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

                // Mirror landmark X coordinates to match selfie video canvas
                const mirroredLandmarks = rawLandmarks.map((lm: any) => ({
                  ...lm,
                  x: 1 - lm.x,
                }));

                renderFrameOverlay(ctx, mirroredLandmarks, canvas.width, canvas.height, true);
                estimateFaceShape(rawLandmarks);
              } else {
                setFaceDetected(false);
              }
            } catch (err) {
              // Frame dropped or busy
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
  }, [streamActive, selectedFrame, selectedTintId, sizeAdjustment, verticalAdjustment]);

  // 8. Capture Snapshot with Watermark
  const takeSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create offscreen high-res copy with DemoOptics watermark
    const snapCanvas = document.createElement("canvas");
    snapCanvas.width = canvas.width;
    snapCanvas.height = canvas.height;
    const snapCtx = snapCanvas.getContext("2d");
    if (!snapCtx) return;

    snapCtx.drawImage(canvas, 0, 0);

    // Subtle luxury watermark
    snapCtx.save();
    snapCtx.fillStyle = "rgba(20, 17, 15, 0.75)";
    snapCtx.fillRect(16, snapCanvas.height - 48, 300, 32);

    snapCtx.font = "500 13px serif";
    snapCtx.fillStyle = "#B89B6A";
    snapCtx.fillText(`DEMOOPTICS • ${selectedFrame.name.toUpperCase()}`, 28, snapCanvas.height - 28);
    snapCtx.restore();

    const dataUrl = snapCanvas.toDataURL("image/png");
    setSnapshotUrl(dataUrl);
  };

  const downloadSnapshot = () => {
    if (!snapshotUrl) return;
    const link = document.createElement("a");
    link.download = `DemoOptics-${selectedFrame.slug}-tryon.png`;
    link.href = snapshotUrl;
    link.click();
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Hidden Video Feed for MediaPipe */}
      <video
        ref={videoRef}
        playsInline
        muted
        className="hidden"
      />

      {/* Main Luxury Mirror Stage Container (4:3 or 16:10 aspect ratio) */}
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

        {/* Soft Vanity Vignette Overlay */}
        <div className="absolute inset-0 pointer-events-none mirror-vignette opacity-70" />

        {/* Minimalist Top HUD Bar */}
        <div className="absolute top-4 inset-x-6 flex items-center justify-between text-white pointer-events-none z-20">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#14110F]/80 backdrop-blur-xs border border-white/10 rounded-[2px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89B6A] animate-pulse" />
            <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#D4BE96]">
              {streamActive ? "Live Vanity Mirror" : uploadedImage ? "Still Portrait Try-On" : "Studio Mirror Ready"}
            </span>
          </div>

          {streamActive && (
            <div className="px-2.5 py-1 bg-[#14110F]/80 backdrop-blur-xs border border-white/10 text-[9px] font-mono tracking-wider text-[#A89F95] rounded-[2px]">
              {faceDetected ? "FACE CALIBRATED • 30 FPS" : "LOOK AT CAMERA"}
            </div>
          )}
        </div>

        {/* IDLE / START CAMERA OVERLAY */}
        {!streamActive && !uploadedImage && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 text-center bg-[#14110F]/90 backdrop-blur-xs text-[#F7F3EC]">
            <div className="w-16 h-16 rounded-full border border-[#B89B6A]/50 bg-[#B89B6A]/10 flex items-center justify-center text-[#B89B6A] mb-6">
              <Camera className="w-7 h-7" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-2">
              Virtual Fitting Salon
            </h3>
            <p className="text-xs text-[#A89F95] max-w-sm mb-8 font-light leading-relaxed">
              Step in front of your screen. Our optical vision algorithm maps your interpupillary distance and temple fit in real time.
            </p>

            {loadingModel ? (
              <div className="flex items-center gap-3 px-6 py-3 bg-[#2A2623] border border-[#B89B6A]/40 rounded-[2px] text-xs font-sans uppercase tracking-[0.18em] text-[#D4BE96]">
                <RefreshCw className="w-4 h-4 animate-spin text-[#B89B6A]" />
                <span>Calibrating your fit...</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={startCamera}
                  className="px-7 py-3.5 bg-[#B89B6A] text-[#14110F] hover:bg-[#D4BE96] rounded-[2px] text-xs font-sans uppercase tracking-[0.18em] font-medium transition-all shadow-md flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>Start Camera</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3.5 border border-white/20 text-white hover:bg-white/10 rounded-[2px] text-xs font-sans uppercase tracking-[0.18em] font-medium transition-all flex items-center gap-2"
                >
                  <Upload className="w-4 h-4 text-[#B89B6A]" />
                  <span>Upload Photo</span>
                </button>
              </div>
            )}

            {/* Error Message if Denied / Unavailable */}
            {errorMessage && (
              <div className="mt-6 p-3 bg-red-950/60 border border-red-500/30 rounded-[2px] text-xs text-red-200 max-w-md flex items-start gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Hidden Photo Upload Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>
        )}

        {/* Center Guidance Hint when Camera is Running but Face not centered */}
        {streamActive && !faceDetected && (
          <div className="absolute inset-x-8 bottom-16 z-20 pointer-events-none flex justify-center">
            <div className="px-4 py-2 bg-[#14110F]/90 backdrop-blur-md border border-[#B89B6A]/40 text-[#D4BE96] text-xs font-sans uppercase tracking-[0.16em] rounded-[2px] animate-pulse">
              Center your face and look at the camera
            </div>
          </div>
        )}

        {/* Bottom Stage Controls (Snapshot, Stop, Re-upload) */}
        {(streamActive || uploadedImage) && (
          <div className="absolute bottom-4 inset-x-6 z-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={takeSnapshot}
                className="px-4 py-2 bg-[#14110F]/85 hover:bg-[#B89B6A] text-[#F7F3EC] hover:text-[#14110F] border border-white/20 hover:border-[#B89B6A] rounded-[2px] text-[10px] uppercase font-sans tracking-[0.18em] font-medium transition-all backdrop-blur-xs flex items-center gap-1.5"
                title="Capture portrait photo with try-on frame"
              >
                <Camera className="w-3.5 h-3.5 text-[#B89B6A]" />
                <span>Snapshot</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-2 bg-[#14110F]/85 hover:bg-white/10 text-[#A89F95] hover:text-white border border-white/10 rounded-[2px] text-[10px] uppercase font-sans tracking-[0.18em] transition-all backdrop-blur-xs flex items-center gap-1"
                title="Switch to portrait photo"
              >
                <Upload className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Photo</span>
              </button>
            </div>

            {streamActive ? (
              <button
                onClick={stopCamera}
                className="px-3.5 py-2 bg-[#14110F]/85 hover:bg-red-950/80 text-[#A89F95] hover:text-red-200 border border-white/10 hover:border-red-500/30 rounded-[2px] text-[10px] uppercase font-sans tracking-[0.18em] transition-all backdrop-blur-xs flex items-center gap-1.5"
              >
                <CameraOff className="w-3.5 h-3.5" />
                <span>Turn Off</span>
              </button>
            ) : (
              <button
                onClick={startCamera}
                className="px-3.5 py-2 bg-[#B89B6A] text-[#14110F] hover:bg-[#D4BE96] rounded-[2px] text-[10px] uppercase font-sans tracking-[0.18em] font-medium transition-all flex items-center gap-1.5"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Open Live Camera</span>
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
              <span className="font-serif text-lg font-normal text-[#14110F]">
                Your DemoOptics Fitting Portrait
              </span>
              <button
                onClick={() => setSnapshotUrl(null)}
                className="text-xs uppercase tracking-widest text-[#7A7168] hover:text-[#14110F]"
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
                className="flex-1 py-3 bg-[#14110F] text-[#F7F3EC] hover:bg-[#B89B6A] hover:text-[#14110F] rounded-[2px] text-xs font-sans uppercase tracking-[0.18em] font-medium transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download PNG</span>
              </button>

              <a
                href={getWhatsAppLink(
                  `Hello DemoOptics! I just tried on the ${selectedFrame.brand} ${selectedFrame.name} (₹${selectedFrame.price.toLocaleString("en-IN")}) in your Virtual Try-On studio and would love to reserve it for an in-store trial.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-[#B89B6A] text-[#14110F] hover:bg-[#2A2623] hover:text-[#F7F3EC] rounded-[2px] text-xs font-sans uppercase tracking-[0.18em] font-medium transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Share WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Friendly Privacy Reassurance Banner */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#7A7168]">
        <ShieldCheck className="w-4 h-4 text-[#B89B6A]" />
        <span>Your camera feed stays strictly on your device. Nothing is uploaded or stored.</span>
      </div>
    </div>
  );
}
