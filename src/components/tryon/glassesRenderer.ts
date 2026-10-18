import { TryOnFrame, LensTint, LENS_TINTS } from "@/data/tryon";

interface DrawGlassesOptions {
  ctx: CanvasRenderingContext2D;
  frame: TryOnFrame;
  tintId?: string;
  x: number; // Midpoint between eye centers on canvas (pixels)
  y: number; // Vertical pupil line on canvas (pixels)
  ipd: number; // Interpupillary distance (pixels between eye pupils)
  angle: number; // Head roll in radians
  yaw: number; // Head yaw (-1 to 1)
  sizeAdjustment?: number; // User slider (-20 to +20 percent)
  verticalAdjustment?: number; // User slider (-25 to +25 px)
}

// Global cache for loaded SVG / PNG frame images
const imageCache = new Map<string, HTMLImageElement>();

export function getOrLoadFrameImage(url: string): HTMLImageElement | null {
  if (imageCache.has(url)) {
    const cached = imageCache.get(url)!;
    return cached.complete && cached.naturalWidth > 0 ? cached : null;
  }

  if (typeof window !== "undefined") {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    imageCache.set(url, img);
    return null;
  }

  return null;
}

// Preload all available frames so there is zero latency on swap
export function preloadAllFrames(frames: TryOnFrame[]) {
  if (typeof window === "undefined") return;
  frames.forEach((f) => {
    if (f.overlayUrl && !imageCache.has(f.overlayUrl)) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = f.overlayUrl;
      imageCache.set(f.overlayUrl, img);
    }
  });
}

/**
 * Draws the photorealistic optical frame onto the mirrored selfie canvas.
 * Mathematically calibrated to the user's interpupillary distance (IPD).
 */
export function drawGlassesOnCanvas({
  ctx,
  frame,
  tintId,
  x,
  y,
  ipd,
  angle,
  yaw,
  sizeAdjustment = 0,
  verticalAdjustment = 0,
}: DrawGlassesOptions) {
  const img = getOrLoadFrameImage(frame.overlayUrl);
  if (!img) return;

  ctx.save();

  // 1. Move to the exact bridge midpoint between the user's eyes
  ctx.translate(x, y + verticalAdjustment);
  ctx.rotate(angle);

  // 2. Optical-grade scaling
  // In our SVG master artboards (1000px × 450px):
  // Left lens optical center is at x=272, right lens optical center is at x=728.
  // Distance between lens centers = 728 - 272 = 456px (45.6% of total frame width).
  // To ensure the frame's lens centers match the user's exact pupil distance (IPD):
  // targetWidth = (ipd / 0.456) * userScaling
  const targetW = (ipd / 0.456) * (1 + sizeAdjustment / 100);
  const targetH = targetW * (450 / 1000);

  // The optical centers of the lenses are at y = 220px (out of 450px) = 0.48888 of height.
  // Placing the top-left at (-targetW / 2, -targetH * 0.48888) guarantees the lenses
  // are 100% aligned with the user's eye pupils!
  const drawX = -targetW / 2;
  const drawY = -targetH * 0.48888;

  // 3. Realistic Soft Ambient Drop Shadow on Face
  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.42)";
  ctx.shadowBlur = targetH * 0.14;
  ctx.shadowOffsetY = targetH * 0.08;
  ctx.shadowOffsetX = -yaw * targetW * 0.04;

  // Draw the photorealistic master artwork
  ctx.drawImage(img, drawX, drawY, targetW, targetH);
  ctx.restore();

  // 4. Dynamic Tint Recoloring (when user customizes lens tint in studio)
  if (tintId && tintId !== frame.defaultTint) {
    const activeTint = LENS_TINTS.find((t) => t.id === tintId);
    if (activeTint && activeTint.id !== "clear") {
      ctx.save();
      // Apply color blend mode over the lens areas
      ctx.globalCompositeOperation = "color";
      ctx.globalAlpha = 0.45;
      ctx.fillStyle = activeTint.hex;

      // Tint left lens area
      ctx.beginPath();
      ctx.ellipse(-targetW * 0.228, 0, targetW * 0.16, targetH * 0.38, 0, 0, Math.PI * 2);
      // Tint right lens area
      ctx.ellipse(targetW * 0.228, 0, targetW * 0.16, targetH * 0.38, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  ctx.restore();
}
