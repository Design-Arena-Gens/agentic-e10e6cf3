"use client";
import { useEffect, useRef } from 'react';

function drawEiffelSilhouette(ctx, w, h) {
  ctx.save();
  ctx.translate(w * 0.5, h * 0.92);
  ctx.scale(h / 1080, h / 1080);
  ctx.strokeStyle = 'rgba(40,80,96,0.8)';
  ctx.fillStyle = 'rgba(10,20,26,0.98)';
  ctx.lineWidth = 6;

  // Base arches
  ctx.beginPath();
  ctx.moveTo(-320, 0);
  ctx.lineTo(320, 0);
  ctx.lineTo(260, -40);
  ctx.lineTo(180, -60);
  ctx.lineTo(120, -70);
  ctx.lineTo(90, -120);
  ctx.lineTo(60, -160);
  ctx.lineTo(40, -220);
  ctx.lineTo(30, -280);
  ctx.lineTo(26, -340);
  ctx.lineTo(20, -420);
  ctx.lineTo(16, -500);
  ctx.lineTo(14, -560);
  ctx.lineTo(12, -640);
  ctx.lineTo(10, -700);
  ctx.lineTo(8, -760);
  ctx.lineTo(6, -820);
  ctx.lineTo(4, -880);
  ctx.lineTo(3, -920);
  ctx.lineTo(2, -950);
  ctx.lineTo(0, -980);
  ctx.lineTo(-2, -950);
  ctx.lineTo(-3, -920);
  ctx.lineTo(-4, -880);
  ctx.lineTo(-6, -820);
  ctx.lineTo(-8, -760);
  ctx.lineTo(-10, -700);
  ctx.lineTo(-12, -640);
  ctx.lineTo(-14, -560);
  ctx.lineTo(-16, -500);
  ctx.lineTo(-20, -420);
  ctx.lineTo(-26, -340);
  ctx.lineTo(-30, -280);
  ctx.lineTo(-40, -220);
  ctx.lineTo(-60, -160);
  ctx.lineTo(-90, -120);
  ctx.lineTo(-120, -70);
  ctx.lineTo(-180, -60);
  ctx.lineTo(-260, -40);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Lattice hints
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(40, 90, 110, 0.35)';
  for (let y = -920; y < -80; y += 60) {
    const widthAtY = Math.max(6, 200 + (y + 920) * 0.18);
    ctx.beginPath();
    ctx.moveTo(-widthAtY, y);
    ctx.lineTo(widthAtY, y);
    ctx.stroke();
  }

  // Antenna
  ctx.beginPath();
  ctx.moveTo(0, -980);
  ctx.lineTo(0, -1040);
  ctx.strokeStyle = 'rgba(60,120,150,0.5)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Warm lamps
  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 14; i++) {
    const t = i / 13;
    const y = -860 + t * 820;
    const x = (Math.sin(t * 6) * (180 - t * 160));
    const r = 6 + (1 - t) * 3;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r * 6);
    grad.addColorStop(0, 'rgba(255,170,100,0.35)');
    grad.addColorStop(1, 'rgba(255,170,100,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r * 6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over';

  ctx.restore();
}

function drawBackground(ctx, w, h, time) {
  // Desaturated cool background with subtle gradient and horizon glow
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, 'rgba(6,12,16,1)');
  g.addColorStop(0.55, 'rgba(10,18,24,1)');
  g.addColorStop(1, 'rgba(8,14,18,1)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // City lights bokeh (very faint)
  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 70; i++) {
    const x = Math.random() * w;
    const y = h * 0.62 + Math.random() * h * 0.28;
    const r = Math.random() * 2 + 0.5;
    const c = Math.random() < 0.3 ? 'rgba(30,120,140,0.05)' : 'rgba(200,120,60,0.05)';
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r * 6);
    grad.addColorStop(0, c);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r * 6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over';

  // Horizon fog band
  const fog = ctx.createLinearGradient(0, h * 0.62, 0, h * 0.9);
  fog.addColorStop(0, 'rgba(180, 220, 255, 0.045)');
  fog.addColorStop(1, 'rgba(180, 220, 255, 0.0)');
  ctx.fillStyle = fog;
  ctx.fillRect(0, h * 0.58, w, h * 0.4);

  // Searchlight sweep (very subtle)
  const sweepX = (Math.sin(time * 0.0002) * 0.25 + 0.5) * w;
  const sweepGrad = ctx.createRadialGradient(sweepX, h * 0.3, 0, sweepX, h * 0.3, w * 0.7);
  sweepGrad.addColorStop(0, 'rgba(60,120,150,0.06)');
  sweepGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = sweepGrad;
  ctx.fillRect(0, 0, w, h);
}

function drawFog(ctx, w, h, time, intensity = 1) {
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  const layers = 4;
  for (let i = 0; i < layers; i++) {
    const y = h * (0.4 + i * 0.15);
    const shift = ((time * 0.00005 * (i + 1)) % 1) * w;
    const grad = ctx.createLinearGradient(shift - w, y, shift + w, y);
    grad.addColorStop(0, `rgba(120,160,190,${0.012 * intensity})`);
    grad.addColorStop(0.5, `rgba(120,160,190,${0.035 * intensity})`);
    grad.addColorStop(1, `rgba(120,160,190,${0.012 * intensity})`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, y - h * 0.25, w, h * 0.5);
  }
  ctx.restore();
}

function drawRain(ctx, w, h, drops) {
  ctx.save();
  ctx.strokeStyle = 'rgba(170, 200, 220, 0.25)';
  ctx.lineWidth = 1.1;
  ctx.setLineDash([]);
  ctx.globalCompositeOperation = 'screen';
  for (const d of drops) {
    ctx.beginPath();
    ctx.moveTo(d.x, d.y);
    ctx.lineTo(d.x - d.len * 0.32, d.y + d.len);
    ctx.stroke();
  }
  ctx.restore();
}

function updateRain(w, h, drops) {
  for (const d of drops) {
    d.x += -d.speed * 0.32;
    d.y += d.speed;
    if (d.y > h + 20 || d.x < -20) {
      d.x = Math.random() * (w + 40) - 20;
      d.y = -Math.random() * 200;
      d.speed = 3 + Math.random() * 6;
      d.len = 8 + Math.random() * 16;
    }
  }
}

function drawGrain(ctx, w, h, frame) {
  const density = 0.08;
  const count = (w * h) * 0.00008;
  ctx.save();
  ctx.globalCompositeOperation = 'soft-light';
  for (let i = 0; i < count; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const a = 0.04 + Math.random() * 0.04;
    ctx.fillStyle = `rgba(255,255,255,${a})`;
    ctx.fillRect(x, y, 1, 1);
  }
  ctx.restore();
}

function applyGrade(ctx, w, h) {
  // Teal & orange split toning via overlays
  ctx.save();
  // Cool shadows
  let grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgba(20,60,80,0.14)');
  grad.addColorStop(1, 'rgba(10,30,40,0.18)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  // Warm highlights from below
  grad = ctx.createRadialGradient(w * 0.5, h * 0.9, 0, w * 0.5, h * 0.9, h * 0.9);
  grad.addColorStop(0, 'rgba(190,110,60,0.12)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.globalCompositeOperation = 'overlay';
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
}

export default function Page() {
  const canvasRef = useRef(null);
  const grainRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const grain = grainRef.current;
    const ctx = canvas.getContext('2d');
    const gctx = grain.getContext('2d');

    let animationFrame;
    let start = performance.now();

    const DPR = Math.min(2, window.devicePixelRatio || 1);

    const drops = Array.from({ length: 380 }, () => ({
      x: Math.random() * 2000 - 100,
      y: Math.random() * 1200 - 200,
      speed: 3 + Math.random() * 6,
      len: 8 + Math.random() * 16,
    }));

    function resize() {
      const wrap = canvas.parentElement;
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      gctx.canvas.width = canvas.width;
      gctx.canvas.height = canvas.height;
    }

    function render(now) {
      const t = now - start;
      const w = canvas.width;
      const h = canvas.height;

      // Clear
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // Background
      drawBackground(ctx, w, h, now);

      // Cinematic slow zoom (scale slightly over time)
      const zoom = 1.0 + Math.sin(t * 0.00006) * 0.02 + (t * 0.000004);
      const cx = w * 0.5;
      const cy = h * 0.72;
      ctx.translate(cx, cy);
      ctx.scale(zoom, zoom);
      ctx.translate(-cx, -cy);

      // Tower silhouette
      drawEiffelSilhouette(ctx, w, h);

      // Fog layers (behind rain)
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      drawFog(ctx, w, h, now, 1);

      // Rain in foreground
      updateRain(w, h, drops);
      drawRain(ctx, w, h, drops);

      // Color grade and soft bloom pass
      applyGrade(ctx, w, h);

      // Film grain on separate canvas then overlay
      gctx.clearRect(0, 0, w, h);
      drawGrain(gctx, w, h, t);

      animationFrame = requestAnimationFrame(render);
    }

    resize();
    window.addEventListener('resize', resize);
    animationFrame = requestAnimationFrame(render);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <main className="main">
      <div className="canvasWrap">
        <canvas ref={canvasRef} aria-label="Cinematic Eiffel Tower Night Scene" />
        <canvas ref={grainRef} className="filmGrain" />
        <div className="letterboxTop" />
        <div className="letterboxBottom" />
        <div className="badge">16:9 ? 1920?1080 ? Noir</div>
        <div className="title">Eiffel Noir ? Paris, Rain & Fog</div>
      </div>
    </main>
  );
}
