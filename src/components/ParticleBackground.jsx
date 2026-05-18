import { useEffect, useRef } from 'react';

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;
  return { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) };
}

function blendColor(baseRgb, tintRgb, amount = 0.35) {
  return `${Math.round(baseRgb.r + (tintRgb.r - baseRgb.r) * amount)}, ${Math.round(baseRgb.g + (tintRgb.g - baseRgb.g) * amount)}, ${Math.round(baseRgb.b + (tintRgb.b - baseRgb.b) * amount)}`;
}

export default function ParticleBackground({
  particleCount,
  opacity,
  speed,
  tint,
  particleSize,
  fixed = false,
  className = '',
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const tintRgb = tint ? hexToRgb(tint) : null;
    const cyanRgb = { r: 6, g: 182, b: 212 };
    const violetRgb = { r: 124, g: 58, b: 237 };

    const opacityMul = opacity ?? 1;
    const speedMul = speed ?? 1;
    const sizeMin = particleSize?.min ?? 0.5;
    const sizeMax = particleSize?.max ?? 1.5;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const count = particleCount ?? Math.floor((canvas.width * canvas.height) / 18000);
      for (let i = 0; i < count; i++) {
        const useCyan = Math.random() > 0.4;
        const baseRgb = useCyan ? cyanRgb : violetRgb;
        const colorStr = tintRgb
          ? blendColor(baseRgb, tintRgb)
          : `${baseRgb.r}, ${baseRgb.g}, ${baseRgb.b}`;

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25 * speedMul,
          vy: (Math.random() - 0.5) * 0.25 * speedMul,
          radius: Math.random() * (sizeMax - sizeMin) + sizeMin,
          opacity: (Math.random() * 0.4 + 0.1) * opacityMul,
          color: colorStr,
        });
      }
    };

    const lineColor = tintRgb
      ? blendColor(cyanRgb, tintRgb)
      : '6, 182, 212';

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.fill();
      });

      particles.forEach((a, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${lineColor}, ${0.05 * opacityMul * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    const onResize = () => {
      resize();
      createParticles();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
    };
  }, [particleCount, opacity, speed, tint, particleSize]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ position: fixed ? 'fixed' : 'absolute', inset: 0, zIndex: 0 }}
    />
  );
}
