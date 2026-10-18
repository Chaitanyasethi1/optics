"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { X, Camera, Upload, AlertCircle, RefreshCw, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";
import { useTryOn } from "@/context/TryOnContext";

export default function Setup3DTryOnModal() {
  const { setupModalOpen, setSetupModalOpen, setTryOnData, userPhoto } = useTryOn();

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const faceLandmarkerRef = useRef<any>(null);

  const [streamActive, setStreamActive] = useState(false);
  const [loadingModel, setLoadingModel] = useState(false);
  const [faceAligned, setFaceAligned] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

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
        runningMode: "IMAGE",
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
          runningMode: "IMAGE",
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
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [setupModalOpen]);

  // Compute precise landmark calibration from a canvas / image
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

          // Optical center: frame lenses must sit directly aligned with eye pupils
          const targetY = pupilMidY;

          return {
            x: pupilMidX,
            y: targetY,
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

  // Capture Photo from Live Webcam
  const handleTakePhoto = async () => {
    const video = videoRef.current;
    if (!video || video.readyState < 2) return;

    setIsCapturing(true);

    const offCanvas = document.createElement("canvas");
    offCanvas.width = video.videoWidth;
    offCanvas.height = video.videoHeight;
    const ctx = offCanvas.getContext("2d");
    if (!ctx) return;

    // Mirror horizontally for selfie view
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(video, -offCanvas.width, 0, offCanvas.width, offCanvas.height);
    ctx.restore();

    const calib = await extractCalibration(offCanvas, offCanvas.width, offCanvas.height);
    const dataUrl = offCanvas.toDataURL("image/jpeg", 0.92);

    setTryOnData(dataUrl, calib);
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
        setTryOnData(img.src, calib);
        setIsCapturing(false);
        stopCamera();
        setSetupModalOpen(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  if (!setupModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#14110F]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
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
        <div className="pt-8 pb-4 px-6 text-center border-b border-[#14110F]/8">
          <h2 className="font-sans text-lg sm:text-xl font-bold uppercase tracking-[0.18em] text-[#14110F]">
            SETUP 3D TRY ON
          </h2>
          <p className="text-[11px] sm:text-xs text-[#7A7168] uppercase tracking-[0.08em] font-medium mt-2 leading-relaxed max-w-sm mx-auto">
            FACE A LIGHT SOURCE, ALIGN YOUR FACE, TAKE OFF YOUR GLASSES, AND TUCK YOUR HAIR BEHIND YOUR EARS
          </p>
        </div>

        {/* Video / Camera Stage */}
        <div className="p-6 flex flex-col items-center bg-[#FAF7F2]">
          <div className="relative w-64 sm:w-72 aspect-[3/4] rounded-[4px] overflow-hidden bg-[#14110F] border-2 border-white shadow-xl flex items-center justify-center">
            {/* Live Video */}
            <video
              ref={videoRef}
              playsInline
              muted
              className="w-full h-full object-cover scale-x-[-1]"
            />

            {/* Oval Face Guide Frame (Matches Lenskart) */}
            <div className="absolute inset-4 border-2 border-dashed border-[#B89B6A]/80 rounded-[50%] pointer-events-none flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#B89B6A] opacity-60" />
            </div>

            {loadingModel && (
              <div className="absolute inset-0 bg-[#14110F]/85 flex flex-col items-center justify-center text-white gap-2">
                <RefreshCw className="w-6 h-6 animate-spin text-[#B89B6A]" />
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4BE96]">
                  Calibrating Vision...
                </span>
              </div>
            )}
          </div>

          {errorMessage && (
            <div className="mt-3 p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-[2px] text-xs flex items-center gap-2 max-w-sm">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Primary Action: TAKE PHOTO (Matches Lenskart Image 2) */}
          <div className="mt-6 w-full max-w-xs space-y-3">
            <button
              onClick={handleTakePhoto}
              disabled={isCapturing || loadingModel}
              className="w-full py-3.5 bg-white border-2 border-[#14110F] hover:bg-[#14110F] text-[#14110F] hover:text-white rounded-[2px] text-xs uppercase font-sans tracking-[0.2em] font-bold shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isCapturing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#B89B6A]" />
                  <span>Calibrating...</span>
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4" />
                  <span>TAKE PHOTO</span>
                </>
              )}
            </button>

            {/* Secondary Option: Upload Photo */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2.5 text-[10.5px] uppercase font-sans tracking-[0.16em] text-[#7A7168] hover:text-[#14110F] font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5 text-[#B89B6A]" />
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
        <div className="py-3 px-6 bg-white border-t border-[#14110F]/8 flex items-center justify-center gap-2 text-[10.5px] text-[#7A7168]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#B89B6A]" />
          <span>Biometric face data stays 100% on your device. Nothing is stored on a server.</span>
        </div>
      </div>
    </div>
  );
}
