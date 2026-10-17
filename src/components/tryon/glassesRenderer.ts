import { TryOnFrame, LensTint, LENS_TINTS } from "@/data/tryon";

interface DrawGlassesOptions {
  ctx: CanvasRenderingContext2D;
  frame: TryOnFrame;
  tintId?: string;
  x: number; // Nose bridge center X
  y: number; // Nose bridge center Y
  scale: number; // Overall frame scale
  angle: number; // Head roll in radians
  yaw: number; // Head yaw (-1 to 1)
  sizeAdjustment?: number; // User slider (-20 to +20 percent)
  verticalAdjustment?: number; // User slider (-30 to +30 px)
}

export function drawGlassesOnCanvas({
  ctx,
  frame,
  tintId,
  x,
  y,
  scale,
  angle,
  yaw,
  sizeAdjustment = 0,
  verticalAdjustment = 0,
}: DrawGlassesOptions) {
  const activeTint = LENS_TINTS.find((t) => t.id === tintId) || LENS_TINTS.find((t) => t.id === frame.defaultTint) || LENS_TINTS[0];

  ctx.save();

  // Apply user manual adjustments
  const finalScale = scale * (1 + sizeAdjustment / 100);
  const finalY = y + verticalAdjustment;

  // Move to frame center and rotate by head roll angle
  ctx.translate(x, finalY);
  ctx.rotate(angle);

  // Soft natural drop shadow on face
  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
  ctx.shadowBlur = 12 * finalScale;
  ctx.shadowOffsetY = 6 * finalScale;
  ctx.shadowOffsetX = -yaw * 8 * finalScale;
  ctx.restore();

  // Width and height relative to scale
  const w = 180 * finalScale;
  const h = 75 * finalScale;
  const halfW = w / 2;
  const bridgeWidth = 24 * finalScale;
  const lensW = (w - bridgeWidth) / 2;
  const lensH = h * 0.88;

  // Render by silhouette template
  switch (frame.svgTemplate) {
    case "aviator":
      drawAviator(ctx, halfW, bridgeWidth, lensW, lensH, finalScale, frame, activeTint, yaw);
      break;
    case "wayfarer":
      drawWayfarer(ctx, halfW, bridgeWidth, lensW, lensH, finalScale, frame, activeTint, yaw);
      break;
    case "round":
      drawRound(ctx, halfW, bridgeWidth, lensW, lensH, finalScale, frame, activeTint, yaw);
      break;
    case "cateye":
      drawCatEye(ctx, halfW, bridgeWidth, lensW, lensH, finalScale, frame, activeTint, yaw);
      break;
    case "geometric":
      drawGeometric(ctx, halfW, bridgeWidth, lensW, lensH, finalScale, frame, activeTint, yaw);
      break;
    case "rimless":
      drawRimless(ctx, halfW, bridgeWidth, lensW, lensH, finalScale, frame, activeTint, yaw);
      break;
    case "rectangle":
    default:
      drawRectangle(ctx, halfW, bridgeWidth, lensW, lensH, finalScale, frame, activeTint, yaw);
      break;
  }

  ctx.restore();
}

/** Helper: Lens tint and realistic diagonal glass glare */
function fillLensWithGlint(
  ctx: CanvasRenderingContext2D,
  lensPath: Path2D,
  tint: LensTint,
  centerX: number,
  centerY: number,
  width: number,
  height: number
) {
  ctx.save();
  ctx.clip(lensPath);

  // Base Tint Fill
  if (tint.gradient) {
    const grad = ctx.createLinearGradient(centerX, centerY - height / 2, centerX, centerY + height / 2);
    grad.addColorStop(0, "rgba(40, 20, 10, 0.9)");
    grad.addColorStop(1, "rgba(184, 155, 106, 0.35)");
    ctx.fillStyle = grad;
  } else {
    ctx.fillStyle = tint.hex;
    ctx.globalAlpha = tint.opacity;
  }
  ctx.fill(lensPath);

  // Subtle realistic glass glint / reflection
  ctx.globalAlpha = 0.22;
  const glareGrad = ctx.createLinearGradient(
    centerX - width * 0.4,
    centerY - height * 0.5,
    centerX + width * 0.4,
    centerY + height * 0.5
  );
  glareGrad.addColorStop(0, "rgba(255, 255, 255, 0.8)");
  glareGrad.addColorStop(0.3, "rgba(255, 255, 255, 0.15)");
  glareGrad.addColorStop(0.5, "transparent");
  ctx.fillStyle = glareGrad;
  ctx.fill(lensPath);

  ctx.restore();
}

// 1. Aviator (Classic teardrop + double brow bar + nose pads)
function drawAviator(
  ctx: CanvasRenderingContext2D,
  halfW: number,
  bridgeWidth: number,
  lensW: number,
  lensH: number,
  scale: number,
  frame: TryOnFrame,
  tint: LensTint,
  yaw: number
) {
  const leftX = -halfW + lensW / 2;
  const rightX = halfW - lensW / 2;
  const centerY = lensH * 0.15;

  // Lenses paths (teardrop)
  const leftLens = new Path2D();
  leftLens.ellipse(leftX, centerY, lensW * 0.48, lensH * 0.52, 0.08, 0, Math.PI * 2);

  const rightLens = new Path2D();
  rightLens.ellipse(rightX, centerY, lensW * 0.48, lensH * 0.52, -0.08, 0, Math.PI * 2);

  // Fill tinted glass
  fillLensWithGlint(ctx, leftLens, tint, leftX, centerY, lensW, lensH);
  fillLensWithGlint(ctx, rightLens, tint, rightX, centerY, lensW, lensH);

  // Wire rims
  ctx.lineWidth = 2.5 * scale;
  ctx.strokeStyle = frame.frameColor;
  ctx.stroke(leftLens);
  ctx.stroke(rightLens);

  // Double Bridge Bars
  ctx.beginPath();
  // Top brow bar
  ctx.moveTo(leftX + lensW * 0.35, centerY - lensH * 0.42);
  ctx.lineTo(rightX - lensW * 0.35, centerY - lensH * 0.42);
  // Lower curved bridge
  ctx.moveTo(leftX + lensW * 0.4, centerY - lensH * 0.08);
  ctx.quadraticCurveTo(0, centerY - lensH * 0.22, rightX - lensW * 0.4, centerY - lensH * 0.08);
  ctx.stroke();

  // Temples fading with yaw
  ctx.lineWidth = 2 * scale;
  ctx.beginPath();
  ctx.moveTo(leftX - lensW * 0.48, centerY - lensH * 0.2);
  ctx.lineTo(leftX - lensW * 0.75 - yaw * 10 * scale, centerY - lensH * 0.3);
  ctx.moveTo(rightX + lensW * 0.48, centerY - lensH * 0.2);
  ctx.lineTo(rightX + lensW * 0.75 - yaw * 10 * scale, centerY - lensH * 0.3);
  ctx.stroke();
}

// 2. Wayfarer (Bold sculpted acetate trapezoid)
function drawWayfarer(
  ctx: CanvasRenderingContext2D,
  halfW: number,
  bridgeWidth: number,
  lensW: number,
  lensH: number,
  scale: number,
  frame: TryOnFrame,
  tint: LensTint,
  yaw: number
) {
  const leftX = -halfW + lensW / 2;
  const rightX = halfW - lensW / 2;
  const centerY = lensH * 0.12;

  // Helper for trapezoid rounded path
  function createWayfarerLens(cx: number, cy: number, flip: boolean) {
    const p = new Path2D();
    const s = flip ? -1 : 1;
    const w2 = (lensW * 0.46);
    const h2 = (lensH * 0.48);
    p.moveTo(cx - w2 * s, cy - h2 * 0.9);
    p.lineTo(cx + w2 * s * 1.05, cy - h2 * 0.85);
    p.lineTo(cx + w2 * s * 0.85, cy + h2 * 0.95);
    p.lineTo(cx - w2 * s * 0.8, cy + h2 * 0.95);
    p.closePath();
    return p;
  }

  const leftLens = createWayfarerLens(leftX, centerY, false);
  const rightLens = createWayfarerLens(rightX, centerY, true);

  fillLensWithGlint(ctx, leftLens, tint, leftX, centerY, lensW, lensH);
  fillLensWithGlint(ctx, rightLens, tint, rightX, centerY, lensW, lensH);

  // Bold acetate rim
  ctx.lineWidth = 5 * scale;
  ctx.strokeStyle = frame.frameColor;
  ctx.lineJoin = "round";
  ctx.stroke(leftLens);
  ctx.stroke(rightLens);

  // Bridge
  ctx.beginPath();
  ctx.lineWidth = 5.5 * scale;
  ctx.moveTo(leftX + lensW * 0.42, centerY - lensH * 0.25);
  ctx.quadraticCurveTo(0, centerY - lensH * 0.35, rightX - lensW * 0.42, centerY - lensH * 0.25);
  ctx.stroke();

  // Silver / gold corner rivets
  ctx.fillStyle = frame.accentColor || "#B89B6A";
  ctx.beginPath();
  ctx.ellipse(leftX - lensW * 0.45, centerY - lensH * 0.35, 2.5 * scale, 1.5 * scale, -0.2, 0, Math.PI * 2);
  ctx.ellipse(rightX + lensW * 0.45, centerY - lensH * 0.35, 2.5 * scale, 1.5 * scale, 0.2, 0, Math.PI * 2);
  ctx.fill();
}

// 3. Round (Intellectual circular rims)
function drawRound(
  ctx: CanvasRenderingContext2D,
  halfW: number,
  bridgeWidth: number,
  lensW: number,
  lensH: number,
  scale: number,
  frame: TryOnFrame,
  tint: LensTint,
  yaw: number
) {
  const leftX = -halfW + lensW / 2;
  const rightX = halfW - lensW / 2;
  const centerY = lensH * 0.15;
  const radius = lensW * 0.46;

  const leftLens = new Path2D();
  leftLens.arc(leftX, centerY, radius, 0, Math.PI * 2);

  const rightLens = new Path2D();
  rightLens.arc(rightX, centerY, radius, 0, Math.PI * 2);

  fillLensWithGlint(ctx, leftLens, tint, leftX, centerY, lensW, lensH);
  fillLensWithGlint(ctx, rightLens, tint, rightX, centerY, lensW, lensH);

  ctx.lineWidth = 2.8 * scale;
  ctx.strokeStyle = frame.frameColor;
  ctx.stroke(leftLens);
  ctx.stroke(rightLens);

  // Arched saddle bridge
  ctx.beginPath();
  ctx.moveTo(leftX + radius * 0.95, centerY - radius * 0.3);
  ctx.quadraticCurveTo(0, centerY - radius * 0.7, rightX - radius * 0.95, centerY - radius * 0.3);
  ctx.stroke();
}

// 4. Cat-Eye (Sculpted upswept outer corners)
function drawCatEye(
  ctx: CanvasRenderingContext2D,
  halfW: number,
  bridgeWidth: number,
  lensW: number,
  lensH: number,
  scale: number,
  frame: TryOnFrame,
  tint: LensTint,
  yaw: number
) {
  const leftX = -halfW + lensW / 2;
  const rightX = halfW - lensW / 2;
  const centerY = lensH * 0.15;

  function createCatEye(cx: number, cy: number, flip: boolean) {
    const p = new Path2D();
    const s = flip ? -1 : 1;
    const w2 = lensW * 0.48;
    const h2 = lensH * 0.46;
    p.moveTo(cx - w2 * s * 0.7, cy - h2 * 0.6);
    p.quadraticCurveTo(cx, cy - h2 * 0.7, cx + w2 * s * 1.15, cy - h2 * 1.1); // Upsweep
    p.quadraticCurveTo(cx + w2 * s * 1.1, cy + h2 * 0.2, cx + w2 * s * 0.6, cy + h2 * 0.95);
    p.quadraticCurveTo(cx, cy + h2 * 1.05, cx - w2 * s * 0.8, cy + h2 * 0.4);
    p.closePath();
    return p;
  }

  const leftLens = createCatEye(leftX, centerY, false);
  const rightLens = createCatEye(rightX, centerY, true);

  fillLensWithGlint(ctx, leftLens, tint, leftX, centerY, lensW, lensH);
  fillLensWithGlint(ctx, rightLens, tint, rightX, centerY, lensW, lensH);

  ctx.lineWidth = 4 * scale;
  ctx.strokeStyle = frame.frameColor;
  ctx.lineJoin = "round";
  ctx.stroke(leftLens);
  ctx.stroke(rightLens);

  // Elegant curved bridge
  ctx.beginPath();
  ctx.lineWidth = 3.5 * scale;
  ctx.moveTo(leftX + lensW * 0.35, centerY - lensH * 0.2);
  ctx.quadraticCurveTo(0, centerY - lensH * 0.35, rightX - lensW * 0.35, centerY - lensH * 0.2);
  ctx.stroke();
}

// 5. Geometric / Hexagonal
function drawGeometric(
  ctx: CanvasRenderingContext2D,
  halfW: number,
  bridgeWidth: number,
  lensW: number,
  lensH: number,
  scale: number,
  frame: TryOnFrame,
  tint: LensTint,
  yaw: number
) {
  const leftX = -halfW + lensW / 2;
  const rightX = halfW - lensW / 2;
  const centerY = lensH * 0.15;

  function createHex(cx: number, cy: number) {
    const p = new Path2D();
    const rx = lensW * 0.46;
    const ry = lensH * 0.46;
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3;
      const px = cx + rx * Math.cos(a);
      const py = cy + ry * Math.sin(a);
      if (i === 0) p.moveTo(px, py);
      else p.lineTo(px, py);
    }
    p.closePath();
    return p;
  }

  const leftLens = createHex(leftX, centerY);
  const rightLens = createHex(rightX, centerY);

  fillLensWithGlint(ctx, leftLens, tint, leftX, centerY, lensW, lensH);
  fillLensWithGlint(ctx, rightLens, tint, rightX, centerY, lensW, lensH);

  ctx.lineWidth = 2.5 * scale;
  ctx.strokeStyle = frame.frameColor;
  ctx.stroke(leftLens);
  ctx.stroke(rightLens);

  // Bridge
  ctx.beginPath();
  ctx.moveTo(leftX + lensW * 0.44, centerY - lensH * 0.15);
  ctx.lineTo(rightX - lensW * 0.44, centerY - lensH * 0.15);
  ctx.stroke();
}

// 6. Rimless (Silhouette Austrian style)
function drawRimless(
  ctx: CanvasRenderingContext2D,
  halfW: number,
  bridgeWidth: number,
  lensW: number,
  lensH: number,
  scale: number,
  frame: TryOnFrame,
  tint: LensTint,
  yaw: number
) {
  const leftX = -halfW + lensW / 2;
  const rightX = halfW - lensW / 2;
  const centerY = lensH * 0.15;

  const leftLens = new Path2D();
  leftLens.ellipse(leftX, centerY, lensW * 0.46, lensH * 0.44, 0, 0, Math.PI * 2);

  const rightLens = new Path2D();
  rightLens.ellipse(rightX, centerY, lensW * 0.46, lensH * 0.44, 0, 0, Math.PI * 2);

  // Very soft tint / clear reflection
  fillLensWithGlint(ctx, leftLens, tint, leftX, centerY, lensW, lensH);
  fillLensWithGlint(ctx, rightLens, tint, rightX, centerY, lensW, lensH);

  // Ultra-fine beveled edge highlight
  ctx.lineWidth = 1 * scale;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
  ctx.stroke(leftLens);
  ctx.stroke(rightLens);

  // Titanium bridge arch
  ctx.lineWidth = 2 * scale;
  ctx.strokeStyle = frame.frameColor;
  ctx.beginPath();
  ctx.moveTo(leftX + lensW * 0.42, centerY - lensH * 0.05);
  ctx.quadraticCurveTo(0, centerY - lensH * 0.25, rightX - lensW * 0.42, centerY - lensH * 0.05);
  ctx.stroke();

  // Screwless temple hinges
  ctx.fillStyle = frame.frameColor;
  ctx.beginPath();
  ctx.arc(leftX - lensW * 0.44, centerY - lensH * 0.05, 2 * scale, 0, Math.PI * 2);
  ctx.arc(rightX + lensW * 0.44, centerY - lensH * 0.05, 2 * scale, 0, Math.PI * 2);
  ctx.fill();
}

// 7. Rectangle / Executive
function drawRectangle(
  ctx: CanvasRenderingContext2D,
  halfW: number,
  bridgeWidth: number,
  lensW: number,
  lensH: number,
  scale: number,
  frame: TryOnFrame,
  tint: LensTint,
  yaw: number
) {
  const leftX = -halfW + lensW / 2;
  const rightX = halfW - lensW / 2;
  const centerY = lensH * 0.15;

  function createRect(cx: number, cy: number) {
    const p = new Path2D();
    const w2 = lensW * 0.46;
    const h2 = lensH * 0.42;
    const r = 4 * scale;
    p.roundRect(cx - w2, cy - h2, w2 * 2, h2 * 2, [r, r, r, r]);
    return p;
  }

  const leftLens = createRect(leftX, centerY);
  const rightLens = createRect(rightX, centerY);

  fillLensWithGlint(ctx, leftLens, tint, leftX, centerY, lensW, lensH);
  fillLensWithGlint(ctx, rightLens, tint, rightX, centerY, lensW, lensH);

  ctx.lineWidth = 3 * scale;
  ctx.strokeStyle = frame.frameColor;
  ctx.stroke(leftLens);
  ctx.stroke(rightLens);

  ctx.beginPath();
  ctx.moveTo(leftX + lensW * 0.46, centerY - lensH * 0.1);
  ctx.lineTo(rightX - lensW * 0.46, centerY - lensH * 0.1);
  ctx.stroke();
}
