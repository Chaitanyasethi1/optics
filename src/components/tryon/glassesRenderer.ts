import { TryOnFrame, LensTint, LENS_TINTS } from "@/data/tryon";

export interface DrawGlassesOptions {
  ctx: CanvasRenderingContext2D;
  frame: TryOnFrame;
  tintId?: string;
  x: number; // Midpoint between eye centers on canvas (pixels)
  y: number; // Vertical pupil line on canvas (pixels)
  ipd: number; // Interpupillary distance (pixels between eye pupils)
  angle: number; // Head roll in radians
  yaw: number; // Head yaw (-1 to 1, horizontal head rotation)
  pitch?: number; // Head pitch (-1 to 1, vertical head tilt up/down)
  earTragusLeft?: { x: number; y: number };
  earTragusRight?: { x: number; y: number };
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
 * Renders the photorealistic eyewear with genuine 3D biometric perspective:
 * - 3D Yaw foreshortening (Math.cos scaling)
 * - 3D Pitch tilt along the nasal bridge
 * - Visible temple arms (dandi) connecting hinges back to ears upon head turns
 * - Specular AR coating reflection that shifts with head rotation
 * - Ambient drop shadow on face
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
  pitch = 0,
  earTragusLeft,
  earTragusRight,
  sizeAdjustment = 0,
  verticalAdjustment = 0,
}: DrawGlassesOptions) {
  const img = getOrLoadFrameImage(frame.overlayUrl);
  if (!img) return;

  const clampedYaw = Math.max(-1.1, Math.min(1.1, yaw));
  const clampedPitch = Math.max(-0.8, Math.min(0.8, pitch));

  ctx.save();

  // 1. Move to the bridge center between the user's eyes
  // Locked onto the biological optical center
  ctx.translate(x, y + verticalAdjustment);
  ctx.rotate(angle);

  // 2. Optical-grade scaling (adult frame width = ~2.25x IPD, temple-to-temple cheekbone span)
  const baseW = (ipd / 0.38) * (1 + sizeAdjustment / 100);
  const baseH = baseW * (450 / 1000);

  // 3. 3D Perspective Foreshortening
  // As head turns, the frontal width naturally foreshortens by cos(yaw)
  const cosYaw = Math.cos(clampedYaw * 0.95);
  const projectedW = baseW * Math.abs(cosYaw);
  const projectedH = baseH * (1 + Math.abs(clampedPitch) * 0.05);

  // Optical center Y is centered at 50% of the SVG artboard height
  const drawX = -projectedW / 2;
  const drawY = -projectedH * 0.50;

  // 4. Draw 3D Temple Arms (Dandi) when head turns!
  // In real glasses, turning head reveals the side temple arm going back to the ear.
  const armColor = frame.frameColor || "#B89B6A";
  const armAccent = frame.accentColor || "#14110F";

  ctx.save();
  // Near Left Temple Arm (when user turns to their left / viewer left)
  if (clampedYaw < -0.06) {
    const hingeX = -projectedW * 0.46;
    const hingeY = drawY + projectedH * 0.42;
    // Temple arm extends back with depth
    const armLen = baseW * 0.42 * Math.abs(clampedYaw);
    const armEndX = hingeX - armLen;
    const armEndY = hingeY + clampedPitch * 15 - Math.abs(clampedYaw) * 12;

    // Temple shadow on skin
    ctx.beginPath();
    ctx.moveTo(hingeX, hingeY + 3);
    ctx.lineTo(armEndX, armEndY + 6);
    ctx.strokeStyle = "rgba(0, 0, 0, 0.35)";
    ctx.lineWidth = 5;
    ctx.stroke();

    // Main Temple Arm with gradient
    const armGrad = ctx.createLinearGradient(hingeX, hingeY, armEndX, armEndY);
    armGrad.addColorStop(0, armAccent);
    armGrad.addColorStop(0.3, armColor);
    armGrad.addColorStop(1, armAccent);

    ctx.beginPath();
    ctx.moveTo(hingeX, hingeY);
    ctx.quadraticCurveTo((hingeX + armEndX) / 2, hingeY - 4, armEndX, armEndY);
    ctx.strokeStyle = armGrad;
    ctx.lineWidth = Math.max(3, baseH * 0.05);
    ctx.lineCap = "round";
    ctx.stroke();

    // Hinge joint rivet
    ctx.beginPath();
    ctx.arc(hingeX, hingeY, 3, 0, Math.PI * 2);
    ctx.fillStyle = armColor;
    ctx.fill();
  }

  // Near Right Temple Arm (when user turns to their right / viewer right)
  if (clampedYaw > 0.06) {
    const hingeX = projectedW * 0.46;
    const hingeY = drawY + projectedH * 0.42;
    // Temple arm extends back with depth
    const armLen = baseW * 0.42 * Math.abs(clampedYaw);
    const armEndX = hingeX + armLen;
    const armEndY = hingeY + clampedPitch * 15 - Math.abs(clampedYaw) * 12;

    // Temple shadow on skin
    ctx.beginPath();
    ctx.moveTo(hingeX, hingeY + 3);
    ctx.lineTo(armEndX, armEndY + 6);
    ctx.strokeStyle = "rgba(0, 0, 0, 0.35)";
    ctx.lineWidth = 5;
    ctx.stroke();

    // Main Temple Arm with gradient
    const armGrad = ctx.createLinearGradient(hingeX, hingeY, armEndX, armEndY);
    armGrad.addColorStop(0, armAccent);
    armGrad.addColorStop(0.3, armColor);
    armGrad.addColorStop(1, armAccent);

    ctx.beginPath();
    ctx.moveTo(hingeX, hingeY);
    ctx.quadraticCurveTo((hingeX + armEndX) / 2, hingeY - 4, armEndX, armEndY);
    ctx.strokeStyle = armGrad;
    ctx.lineWidth = Math.max(3, baseH * 0.05);
    ctx.lineCap = "round";
    ctx.stroke();

    // Hinge joint rivet
    ctx.beginPath();
    ctx.arc(hingeX, hingeY, 3, 0, Math.PI * 2);
    ctx.fillStyle = armColor;
    ctx.fill();
  }
  ctx.restore();

  // 5. Realistic Ambient Soft Drop Shadow on Face
  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.38)";
  ctx.shadowBlur = projectedH * 0.16;
  ctx.shadowOffsetY = projectedH * 0.08 - clampedPitch * 8;
  ctx.shadowOffsetX = -clampedYaw * projectedW * 0.06;

  // 6. Draw the Frame Artwork with 3D Perspective Scaling
  ctx.drawImage(img, drawX, drawY, projectedW, projectedH);
  ctx.restore();

  // 7. Dynamic Specular AR Glare across Lenses that moves with head rotation
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.globalAlpha = 0.22;

  // Glare shifts horizontally as head turns
  const glareShift = clampedYaw * (projectedW * 0.25);
  const glareGrad = ctx.createLinearGradient(
    -projectedW * 0.4 + glareShift,
    drawY,
    projectedW * 0.4 + glareShift,
    drawY + projectedH
  );
  glareGrad.addColorStop(0, "rgba(255, 255, 255, 0.0)");
  glareGrad.addColorStop(0.4, "rgba(255, 250, 240, 0.45)");
  glareGrad.addColorStop(0.55, "rgba(200, 230, 255, 0.35)");
  glareGrad.addColorStop(0.7, "rgba(255, 255, 255, 0.0)");

  ctx.fillStyle = glareGrad;
  // Left lens reflection
  ctx.beginPath();
  ctx.ellipse(-projectedW * 0.228, 0, projectedW * 0.18, projectedH * 0.38, 0, 0, Math.PI * 2);
  ctx.fill();

  // Right lens reflection
  ctx.beginPath();
  ctx.ellipse(projectedW * 0.228, 0, projectedW * 0.18, projectedH * 0.38, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 8. Custom Lens Tint recoloring (when user customizes lens tint in studio)
  if (tintId && tintId !== frame.defaultTint) {
    const activeTint = LENS_TINTS.find((t) => t.id === tintId);
    if (activeTint && activeTint.id !== "clear") {
      ctx.save();
      ctx.globalCompositeOperation = "color";
      ctx.globalAlpha = 0.45;
      ctx.fillStyle = activeTint.hex;

      // Tint left lens area
      ctx.beginPath();
      ctx.ellipse(-projectedW * 0.228, 0, projectedW * 0.17, projectedH * 0.38, 0, 0, Math.PI * 2);
      // Tint right lens area
      ctx.ellipse(projectedW * 0.228, 0, projectedW * 0.17, projectedH * 0.38, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  ctx.restore();
}
