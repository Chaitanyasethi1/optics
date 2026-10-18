"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface FaceCalibration {
  x: number; // Midpoint X between pupils in image coordinates
  y: number; // Pupil line / bridge Y in image coordinates
  ipd: number; // Interpupillary distance in pixels
  angle: number; // Roll angle in radians
  yaw: number; // Head turn (-1 to 1)
  pitch: number; // Head tilt (-1 to 1)
  imgWidth: number;
  imgHeight: number;
}

interface TryOnContextType {
  isTryOnActive: boolean;
  setIsTryOnActive: (active: boolean) => void;
  userPhoto: string | null;
  calibration: FaceCalibration | null;
  setTryOnData: (photoDataUrl: string, calibration: FaceCalibration) => void;
  clearTryOnData: () => void;
  setupModalOpen: boolean;
  setSetupModalOpen: (open: boolean) => void;
}

const TryOnContext = createContext<TryOnContextType | undefined>(undefined);

export function TryOnProvider({ children }: { children: ReactNode }) {
  const [isTryOnActive, setIsTryOnActive] = useState<boolean>(false);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [calibration, setCalibration] = useState<FaceCalibration | null>(null);
  const [setupModalOpen, setSetupModalOpen] = useState<boolean>(false);

  // Restore from sessionStorage on client load
  useEffect(() => {
    try {
      const savedPhoto = sessionStorage.getItem("demooptics_tryon_photo");
      const savedCalib = sessionStorage.getItem("demooptics_tryon_calib");
      const savedActive = sessionStorage.getItem("demooptics_tryon_active");

      if (savedPhoto && savedCalib) {
        setUserPhoto(savedPhoto);
        setCalibration(JSON.parse(savedCalib));
        if (savedActive === "true") {
          setIsTryOnActive(true);
        }
      }
    } catch (e) {
      // Storage access blocked or quota exceeded
    }
  }, []);

  const setTryOnData = (photoDataUrl: string, calib: FaceCalibration) => {
    setUserPhoto(photoDataUrl);
    setCalibration(calib);
    setIsTryOnActive(true);

    try {
      sessionStorage.setItem("demooptics_tryon_photo", photoDataUrl);
      sessionStorage.setItem("demooptics_tryon_calib", JSON.stringify(calib));
      sessionStorage.setItem("demooptics_tryon_active", "true");
    } catch (e) {
      // ignore
    }
  };

  const clearTryOnData = () => {
    setUserPhoto(null);
    setCalibration(null);
    setIsTryOnActive(false);

    try {
      sessionStorage.removeItem("demooptics_tryon_photo");
      sessionStorage.removeItem("demooptics_tryon_calib");
      sessionStorage.removeItem("demooptics_tryon_active");
    } catch (e) {
      // ignore
    }
  };

  const handleSetIsTryOnActive = (active: boolean) => {
    setIsTryOnActive(active);
    try {
      sessionStorage.setItem("demooptics_tryon_active", active ? "true" : "false");
    } catch (e) {
      // ignore
    }
  };

  return (
    <TryOnContext.Provider
      value={{
        isTryOnActive,
        setIsTryOnActive: handleSetIsTryOnActive,
        userPhoto,
        calibration,
        setTryOnData,
        clearTryOnData,
        setupModalOpen,
        setSetupModalOpen,
      }}
    >
      {children}
    </TryOnContext.Provider>
  );
}

export function useTryOn() {
  const context = useContext(TryOnContext);
  if (!context) {
    throw new Error("useTryOn must be used within a TryOnProvider");
  }
  return context;
}
