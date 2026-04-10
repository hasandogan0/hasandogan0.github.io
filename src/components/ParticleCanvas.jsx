import { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let last = 0;
    const DPR = Math.min(2, window.devicePixelRatio || 1);
    let w = 0, h = 0;
    let particles = [];
    const mouse = { x: -9999, y: -9999, active: false };

    function resize() {
      w = canvas.width = Math.floor(window.innerWidth * DPR);
      h = canvas.height = Math.floor(window.innerHeight * DPR);
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    function initParticles() {
      const count = Math.max(40, Math.min(130, Math.floor((window.innerWidth * window.innerHeight) / 90000)));
      const colors = ['245,158,11', '251,146,60', '217,119,6'];
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: 10 + Math.random() * 40,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        c: colors[Math.floor(Math.random() * colors.length)],
        a: 0.055 + Math.random() * 0.16,
      }));
    }

    function step(t) {
      raf = requestAnimationFrame(step);
      const dt = Math.min(40, t - last); last = t;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const p of particles) {
        if (mouse.active) {
          const dx = mouse.x - p.x, dy = mouse.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 130000) {
            const f = (130000 - d2) / 130000;
            p.vx += (dx / 2200) * f;
            p.vy += (dy / 2200) * f;
          }
        }
        p.vx *= 0.999; p.vy *= 0.999;
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);
        if (p.x < -120) p.x = window.innerWidth + 120;
        if (p.x > window.innerWidth + 120) p.x = -120;
        if (p.y < -120) p.y = window.innerHeight + 120;
        if (p.y > window.innerHeight + 120) p.y = -120;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        grad.addColorStop(0, `rgba(${p.c},${p.a})`);
        grad.addColorStop(0.4, `rgba(${p.c},${p.a * 0.4})`);
        grad.addColorStop(1, `rgba(${p.c},0)`);
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
      }
    }

    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; };
    const onMouseOut  = ()    => { mouse.x = -9999; mouse.y = -9999; mouse.active = false; };
    const onVisChange = ()    => {
      if (document.hidden) cancelAnimationFrame(raf);
      else { last = performance.now(); raf = requestAnimationFrame(step); }
    };

    resize();
    initParticles();
    window.addEventListener('resize', () => { resize(); initParticles(); });
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseout', onMouseOut);
    document.addEventListener('visibilitychange', onVisChange);
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('visibilitychange', onVisChange);
    };
  }, []);

  return <canvas id="bgCanvas" ref={canvasRef} aria-hidden="true" />;
}
