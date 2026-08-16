/**
 * Animated "columns of water" background.
 *
 * Draws ~15 translucent vertical strips that drift downward with a soft sine
 * distortion along their edges, evoking calm falling water. The whole canvas is
 * kept at a very low opacity (see components/water-bg.css) so it never competes
 * with content.
 *
 * Honors `prefers-reduced-motion`: when reduced motion is requested, a single
 * static soft gradient is painted instead of running an animation loop.
 */

const COLUMN_COUNT = 15;
const COLORS = [
  [124, 200, 212], // --color-accent
  [107, 184, 196], // --color-primary-lighter
  [74, 155, 170], // --color-primary-light
  [184, 224, 232], // --color-accent-pale
];

function createColumns(count) {
  const columns = [];
  for (let i = 0; i < count; i += 1) {
    const color = COLORS[i % COLORS.length];
    columns.push({
      // Evenly spread with a deterministic-ish jitter so it never looks striped.
      xRatio: (i + 0.5) / count + (Math.sin(i * 12.9898) * 0.5) / count,
      widthRatio: 0.018 + Math.abs(Math.sin(i * 4.113)) * 0.042,
      speed: 18 + Math.abs(Math.sin(i * 7.77)) * 46, // px per second
      phase: (i / count) * Math.PI * 2,
      waveAmp: 3 + Math.abs(Math.cos(i * 3.31)) * 9,
      waveFreq: 0.004 + Math.abs(Math.sin(i * 5.17)) * 0.008,
      lengthRatio: 0.55 + Math.abs(Math.cos(i * 2.71)) * 0.75,
      offset: Math.abs(Math.sin(i * 9.53)),
      alpha: 0.35 + Math.abs(Math.cos(i * 1.61)) * 0.5,
      color,
    });
  }
  return columns;
}

function paintStaticGradient(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);

  const base = ctx.createLinearGradient(0, 0, 0, height);
  base.addColorStop(0, 'rgba(184, 224, 232, 0.55)');
  base.addColorStop(0.5, 'rgba(107, 184, 196, 0.35)');
  base.addColorStop(1, 'rgba(44, 122, 140, 0.15)');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, width, height);

  // A few motionless columns keep the visual language consistent.
  createColumns(COLUMN_COUNT).forEach((column) => {
    const x = column.xRatio * width;
    const w = Math.max(6, column.widthRatio * width);
    const strip = ctx.createLinearGradient(0, 0, 0, height);
    const [r, g, b] = column.color;
    strip.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
    strip.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${column.alpha * 0.5})`);
    strip.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
    ctx.fillStyle = strip;
    ctx.fillRect(x - w / 2, 0, w, height);
  });
}

function drawColumn(ctx, column, width, height, elapsed) {
  const x = column.xRatio * width;
  const w = Math.max(6, column.widthRatio * width);
  const segLength = column.lengthRatio * height;
  const travel = height + segLength;
  const start =
    ((elapsed * column.speed + column.offset * travel) % travel) - segLength;

  const [r, g, b] = column.color;
  const gradient = ctx.createLinearGradient(0, start, 0, start + segLength);
  gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
  gradient.addColorStop(0.35, `rgba(${r}, ${g}, ${b}, ${column.alpha})`);
  gradient.addColorStop(0.65, `rgba(${r}, ${g}, ${b}, ${column.alpha * 0.85})`);
  gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

  const step = Math.max(8, segLength / 26);

  ctx.beginPath();
  // Left edge, travelling down.
  for (let y = start; y <= start + segLength; y += step) {
    const wobble = Math.sin(y * column.waveFreq + column.phase + elapsed * 0.6);
    const edge = x - w / 2 + wobble * column.waveAmp;
    if (y === start) ctx.moveTo(edge, y);
    else ctx.lineTo(edge, y);
  }
  // Right edge, travelling back up.
  for (let y = start + segLength; y >= start; y -= step) {
    const wobble = Math.cos(y * column.waveFreq * 1.15 + column.phase + elapsed * 0.45);
    ctx.lineTo(x + w / 2 + wobble * column.waveAmp, y);
  }
  ctx.closePath();

  ctx.fillStyle = gradient;
  ctx.fill();

  // A brighter highlight line down the centre adds depth without extra weight.
  const highlight = ctx.createLinearGradient(0, start, 0, start + segLength);
  highlight.addColorStop(0, 'rgba(255, 255, 255, 0)');
  highlight.addColorStop(0.5, `rgba(255, 255, 255, ${column.alpha * 0.45})`);
  highlight.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.strokeStyle = highlight;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let y = start; y <= start + segLength; y += step) {
    const wobble = Math.sin(y * column.waveFreq + column.phase + elapsed * 0.6);
    const cx = x + wobble * column.waveAmp * 0.5;
    if (y === start) ctx.moveTo(cx, y);
    else ctx.lineTo(cx, y);
  }
  ctx.stroke();
}

export function initWaterBackground() {
  if (document.getElementById('water-canvas')) return null;

  const canvas = document.createElement('canvas');
  canvas.id = 'water-canvas';
  canvas.className = 'water-bg';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const columns = createColumns(COLUMN_COUNT);

  let width = 0;
  let height = 0;
  let frameId = null;
  let startTime = null;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (motionQuery.matches) paintStaticGradient(ctx, width, height);
  };

  const render = (timestamp) => {
    if (startTime === null) startTime = timestamp;
    const elapsed = (timestamp - startTime) / 1000;

    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';
    columns.forEach((column) => drawColumn(ctx, column, width, height, elapsed));

    frameId = window.requestAnimationFrame(render);
  };

  const stop = () => {
    if (frameId !== null) {
      window.cancelAnimationFrame(frameId);
      frameId = null;
    }
  };

  const start = () => {
    if (motionQuery.matches) {
      stop();
      canvas.classList.add('water-bg--static');
      paintStaticGradient(ctx, width, height);
      return;
    }
    canvas.classList.remove('water-bg--static');
    if (frameId === null) {
      startTime = null;
      frameId = window.requestAnimationFrame(render);
    }
  };

  let resizeTimer = null;
  const onResize = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      resize();
      if (!motionQuery.matches) start();
    }, 150);
  };

  // Pause when the tab is hidden — no point burning frames nobody can see.
  const onVisibility = () => {
    if (document.hidden) stop();
    else start();
  };

  resize();
  start();

  window.addEventListener('resize', onResize);
  document.addEventListener('visibilitychange', onVisibility);

  if (typeof motionQuery.addEventListener === 'function') {
    motionQuery.addEventListener('change', start);
  } else if (typeof motionQuery.addListener === 'function') {
    motionQuery.addListener(start);
  }

  return { canvas, stop, start };
}
