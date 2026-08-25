import React, { useEffect, useRef, useState, useCallback } from 'react';
import { TimeOfDay, FloatingDiya } from '../types';
import { playWaterRipple } from '../utils/audioSynth';

interface GhatCanvasProps {
  timeOfDay: TimeOfDay;
  onDiyaAdded?: () => void;
  triggerDiyaRef?: React.MutableRefObject<((x?: number, y?: number) => void) | null>;
}

interface Petal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  scale: number;
  color: string;
  opacity: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  life: number;
}

export const GhatCanvas: React.FC<GhatCanvasProps> = ({
  timeOfDay,
  onDiyaAdded,
  triggerDiyaRef
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const diyasRef = useRef<FloatingDiya[]>([]);
  const petalsRef = useRef<Petal[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const smokeRef = useRef<SmokeParticle[]>([]);
  const [diyaCount, setDiyaCount] = useState(0);

  // Initialize initial floating diyas along the river
  const spawnDiya = useCallback((x?: number, y?: number) => {
    const canvas = canvasRef.current;
    const width = canvas ? canvas.width / (window.devicePixelRatio || 1) : window.innerWidth;
    const height = canvas ? canvas.height / (window.devicePixelRatio || 1) : window.innerHeight;

    const posX = x ?? (Math.random() * (width - 100) + 50);
    // Float on the lower river half (from 55% to 92% of screen height)
    const posY = y ?? (height * 0.6 + Math.random() * (height * 0.32));

    const newDiya: FloatingDiya = {
      id: Date.now() + Math.random(),
      x: posX,
      y: posY,
      vx: (Math.random() - 0.5) * 0.25 - 0.15, // gentle drift leftwards
      vy: (Math.random() - 0.5) * 0.12,
      scale: 0.85 + Math.random() * 0.35,
      opacity: 0.95,
      lifespan: 0,
      maxLife: 3000 + Math.random() * 2000,
      flameFlicker: Math.random() * Math.PI * 2,
      glowColor: Math.random() > 0.3 ? 'rgba(251, 191, 36, 0.85)' : 'rgba(249, 115, 22, 0.85)'
    };

    diyasRef.current.push(newDiya);

    // Spawn associated water ripple
    ripplesRef.current.push({
      x: posX,
      y: posY + 10,
      radius: 5,
      maxRadius: 45 + Math.random() * 25,
      opacity: 0.8
    });

    setDiyaCount(prev => prev + 1);
    playWaterRipple(0.35);

    if (onDiyaAdded) {
      onDiyaAdded();
    }
  }, [onDiyaAdded]);

  // Expose spawn trigger to parent via ref
  useEffect(() => {
    if (triggerDiyaRef) {
      triggerDiyaRef.current = spawnDiya;
    }
  }, [triggerDiyaRef, spawnDiya]);

  // Handle canvas click to float a diya
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spawnDiya(x, y);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = window.devicePixelRatio || 1;

    const handleResize = () => {
      if (!canvas) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Seed initial diyas
    const initWidth = canvas.clientWidth || window.innerWidth;
    const initHeight = canvas.clientHeight || window.innerHeight;
    diyasRef.current = [
      { id: 1, x: initWidth * 0.15, y: initHeight * 0.72, vx: -0.1, vy: 0.02, scale: 0.9, opacity: 0.9, lifespan: 0, maxLife: 5000, flameFlicker: 0.2, glowColor: 'rgba(251, 191, 36, 0.85)' },
      { id: 2, x: initWidth * 0.35, y: initHeight * 0.80, vx: -0.08, vy: -0.02, scale: 1.1, opacity: 0.95, lifespan: 0, maxLife: 5000, flameFlicker: 1.4, glowColor: 'rgba(249, 115, 22, 0.85)' },
      { id: 3, x: initWidth * 0.65, y: initHeight * 0.76, vx: -0.12, vy: 0.01, scale: 1.0, opacity: 0.92, lifespan: 0, maxLife: 5000, flameFlicker: 2.8, glowColor: 'rgba(251, 191, 36, 0.9)' },
      { id: 4, x: initWidth * 0.85, y: initHeight * 0.84, vx: -0.15, vy: -0.03, scale: 0.85, opacity: 0.88, lifespan: 0, maxLife: 5000, flameFlicker: 4.2, glowColor: 'rgba(245, 158, 11, 0.85)' },
    ];
    setDiyaCount(diyasRef.current.length);

    // Seed petals (marigold flower petals)
    petalsRef.current = Array.from({ length: 28 }, () => ({
      x: Math.random() * initWidth,
      y: Math.random() * initHeight,
      vx: -0.35 - Math.random() * 0.4,
      vy: 0.2 + Math.random() * 0.3,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.03,
      scale: 0.6 + Math.random() * 0.6,
      color: Math.random() > 0.45 ? '#f59e0b' : '#ea580c', // marigold yellow / orange
      opacity: 0.35 + Math.random() * 0.45
    }));

    let time = 0;

    const render = () => {
      time += 0.02;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, width, height);

      // Water boundary horizon
      const riverTop = height * 0.52;

      // 1. Draw River Water Shimmering Base
      const riverGrad = ctx.createLinearGradient(0, riverTop, 0, height);
      if (timeOfDay === 'dawn') {
        riverGrad.addColorStop(0, 'rgba(24, 18, 38, 0.4)');
        riverGrad.addColorStop(0.3, 'rgba(38, 22, 48, 0.65)');
        riverGrad.addColorStop(0.7, 'rgba(46, 26, 32, 0.85)');
        riverGrad.addColorStop(1, 'rgba(18, 12, 24, 0.95)');
      } else if (timeOfDay === 'dusk') {
        riverGrad.addColorStop(0, 'rgba(40, 16, 20, 0.45)');
        riverGrad.addColorStop(0.3, 'rgba(60, 20, 24, 0.7)');
        riverGrad.addColorStop(0.7, 'rgba(42, 14, 18, 0.88)');
        riverGrad.addColorStop(1, 'rgba(15, 8, 12, 0.95)');
      } else {
        // midnight
        riverGrad.addColorStop(0, 'rgba(10, 14, 28, 0.5)');
        riverGrad.addColorStop(0.5, 'rgba(8, 10, 20, 0.8)');
        riverGrad.addColorStop(1, 'rgba(4, 5, 12, 0.96)');
      }

      ctx.fillStyle = riverGrad;
      ctx.fillRect(0, riverTop, width, height - riverTop);

      // 2. Draw Gentle Water Surface Wave Highlights
      ctx.strokeStyle = timeOfDay === 'dusk' 
        ? 'rgba(251, 146, 60, 0.15)' 
        : timeOfDay === 'dawn' 
          ? 'rgba(253, 224, 71, 0.14)' 
          : 'rgba(147, 197, 253, 0.12)';
      ctx.lineWidth = 1.2;

      for (let y = riverTop + 20; y < height; y += 32) {
        ctx.beginPath();
        const waveSpeed = time * 1.2 + y * 0.05;
        const waveAmp = 3.5 + (y - riverTop) * 0.015;
        for (let x = 0; x <= width; x += 25) {
          const waveY = y + Math.sin(x * 0.012 + waveSpeed) * waveAmp;
          if (x === 0) ctx.moveTo(x, waveY);
          else ctx.lineTo(x, waveY);
        }
        ctx.stroke();
      }

      // 3. Draw Ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const rip = ripplesRef.current[i];
        rip.radius += 0.45;
        rip.opacity *= 0.975;

        if (rip.opacity <= 0.02 || rip.radius >= rip.maxRadius) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.ellipse(rip.x, rip.y, rip.radius * 1.8, rip.radius * 0.6, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(251, 191, 36, ${rip.opacity * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      // 4. Update and Draw Floating Diyas (Terracotta Deepam with Golden Flame)
      for (let i = diyasRef.current.length - 1; i >= 0; i--) {
        const diya = diyasRef.current[i];
        diya.x += diya.vx;
        diya.y += diya.vy + Math.sin(time * 2 + diya.id) * 0.15; // gentle bobbing
        diya.flameFlicker += 0.08;

        // Wrap around left to right if drifts offscreen
        if (diya.x < -60) {
          diya.x = width + 40;
        }

        ctx.save();
        ctx.translate(diya.x, diya.y);
        ctx.scale(diya.scale, diya.scale);

        // Water Reflection underneath diya
        const reflGrad = ctx.createRadialGradient(0, 18, 2, 0, 22, 45);
        reflGrad.addColorStop(0, 'rgba(251, 191, 36, 0.45)');
        reflGrad.addColorStop(0.5, 'rgba(249, 115, 22, 0.2)');
        reflGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = reflGrad;
        ctx.beginPath();
        ctx.ellipse(0, 20, 36, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Terracotta Diya Clay Base (मिट्टी का दिया)
        ctx.beginPath();
        ctx.moveTo(-22, 0);
        ctx.bezierCurveTo(-20, 14, 20, 14, 22, 0);
        ctx.bezierCurveTo(14, -4, -14, -4, -22, 0);
        ctx.fillStyle = '#833917'; // Rich terracotta brown
        ctx.fill();
        ctx.strokeStyle = '#52200a';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Diya Oil / Ghee level
        ctx.beginPath();
        ctx.ellipse(0, -1, 16, 5, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#b45309';
        ctx.fill();

        // Cotton Wick (बाती)
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(4, -8);
        ctx.strokeStyle = '#292524';
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Flame Glow Aura
        const flicker = Math.sin(diya.flameFlicker) * 3;
        const flameRadius = 26 + flicker;
        const auraGrad = ctx.createRadialGradient(4, -14, 2, 4, -14, flameRadius);
        auraGrad.addColorStop(0, 'rgba(254, 240, 138, 0.95)');
        auraGrad.addColorStop(0.3, 'rgba(245, 158, 11, 0.65)');
        auraGrad.addColorStop(0.7, 'rgba(239, 68, 68, 0.25)');
        auraGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(4, -14, flameRadius, 0, Math.PI * 2);
        ctx.fill();

        // Vibrant Teardrop Flame Body
        ctx.beginPath();
        ctx.moveTo(0, -6);
        ctx.quadraticCurveTo(8 + Math.sin(diya.flameFlicker * 1.5) * 2, -18, 4, -26);
        ctx.quadraticCurveTo(0, -18, 0, -6);
        ctx.fillStyle = '#fffbeb'; // Inner white hot core
        ctx.fill();

        ctx.restore();

        // Periodically spawn tiny smoke particle
        if (Math.random() < 0.08) {
          smokeRef.current.push({
            x: diya.x + 4 * diya.scale,
            y: diya.y - 24 * diya.scale,
            vx: (Math.random() - 0.5) * 0.3 - 0.2,
            vy: -0.6 - Math.random() * 0.4,
            radius: 2 + Math.random() * 2,
            opacity: 0.45,
            life: 0
          });
        }
      }

      // 5. Incense Smoke Particles (अगरबत्ती / धूप की सुगंध)
      for (let i = smokeRef.current.length - 1; i >= 0; i--) {
        const s = smokeRef.current[i];
        s.x += s.vx + Math.sin(time + s.y * 0.05) * 0.2;
        s.y += s.vy;
        s.radius += 0.12;
        s.opacity *= 0.965;
        s.life++;

        if (s.opacity <= 0.01 || s.life > 120) {
          smokeRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 215, 205, ${s.opacity * 0.35})`;
        ctx.fill();
      }

      // 6. Drifting Marigold Flower Petals (गेंदा के फूल)
      for (let i = 0; i < petalsRef.current.length; i++) {
        const p = petalsRef.current[i];
        p.x += p.vx + Math.sin(time + p.y * 0.01) * 0.3;
        p.y += p.vy;
        p.rotation += p.vRot;

        if (p.x < -30) p.x = width + 20;
        if (p.y > height + 20) {
          p.y = -10;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.scale(p.scale, p.scale);

        // Petal shape
        ctx.beginPath();
        ctx.ellipse(0, 0, 8, 4, 0, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.restore();
      }

      // 7. Ambient Ghat Fog / Morning Mist across horizon
      const mistGrad = ctx.createLinearGradient(0, riverTop - 40, 0, riverTop + 60);
      mistGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      mistGrad.addColorStop(0.5, timeOfDay === 'dawn' ? 'rgba(254, 243, 199, 0.12)' : 'rgba(255, 255, 255, 0.06)');
      mistGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = mistGrad;
      ctx.fillRect(0, riverTop - 40, width, 100);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [timeOfDay, spawnDiya]);

  return (
    <div className="absolute inset-0 pointer-events-auto z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="w-full h-full cursor-pointer"
        title="Click anywhere on the river to float a sacred Diya (दीप दान)"
      />
      {/* Floating Diya Count Indicator */}
      <div className="absolute top-24 left-6 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/80 backdrop-blur-md border border-amber-500/20 text-xs text-amber-200/90 pointer-events-none shadow-lg">
        <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        <span>नदी में प्रज्वलित दीप: <strong>{diyaCount}</strong> (Click to float more)</span>
      </div>
    </div>
  );
};
