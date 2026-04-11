import { useEffect, useRef } from 'react';

export default function ParallaxBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let raf;
    let w = 0, h = 0;
    const DPR = Math.min(2, window.devicePixelRatio || 1);
    
    let particles = [];
    const mouse = { x: -9999, y: -9999, vx: 0, vy: 0, active: false };

    function resize() {
      w = canvas.width = Math.floor(window.innerWidth * DPR);
      h = canvas.height = Math.floor(window.innerHeight * DPR);
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    function initParticles() {
      const count = Math.max(60, Math.min(200, Math.floor((window.innerWidth * window.innerHeight) / 9000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        depth: Math.random() * 0.8 + 0.2, // affects parallax speed and opacity
      }));
    }

    let lastTime = performance.now();
    
    function step(t) {
      raf = requestAnimationFrame(step);
      const dt = Math.min(30, t - lastTime);
      lastTime = t;
      
      const isLightMode = document.documentElement.getAttribute('data-theme') === 'light';
      const colorStr = isLightMode ? '0, 0, 0' : '255, 255, 255';

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Avoid mouse aggressively
        let dx = 0;
        let dy = 0;
        
        if (mouse.active) {
           const mx = mouse.x - p.x;
           const my = mouse.y - p.y;
           const distSq = mx*mx + my*my;
           
           if (distSq < 22000) {
             const force = (22000 - distSq) / 22000;
             dx -= (mx / 800) * force * 15;
             dy -= (my / 800) * force * 15;
           }
           
           // Slight parallax drag towards mouse movement vector based on particle depth
           p.vx += (mouse.vx) * 0.003 * p.depth;
           p.vy += (mouse.vy) * 0.003 * p.depth;
        }

        // Friction to lose energy over time
        p.vx *= 0.96; 
        p.vy *= 0.96;
        
        // Restoring / drifting behavior
        const driftX = Math.sin(t * 0.0005 + p.y) * 0.15;
        const driftY = Math.cos(t * 0.0008 + p.x) * 0.15;

        p.x += (p.vx + driftX + dx) * (dt / 16);
        p.y += (p.vy + driftY + dy) * (dt / 16);

        // Screen wrapping
        if (p.x < -20) p.x = window.innerWidth + 20;
        if (p.x > window.innerWidth + 20) p.x = -20;
        if (p.y < -20) p.y = window.innerHeight + 20;
        if (p.y > window.innerHeight + 20) p.y = -20;

        // Draw node
        ctx.fillStyle = `rgba(${colorStr}, ${p.depth * 0.6})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        // Constellation lines to nearest neighbors
        for (let j = i + 1; j < particles.length; j++) {
           const p2 = particles[j];
           const pdx = p.x - p2.x;
           const pdy = p.y - p2.y;
           const pDistSq = pdx * pdx + pdy * pdy;
           
           if (pDistSq < 12000) {
              const opacity = (1 - pDistSq / 12000) * 0.25;
              ctx.strokeStyle = `rgba(${colorStr}, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
           }
        }
      }
      
      // Decay trailing mouse velocity
      mouse.vx *= 0.5;
      mouse.vy *= 0.5;
    }

    const onMouseMove = (e) => { 
      mouse.vx = e.clientX - mouse.x;
      mouse.vy = e.clientY - mouse.y;
      mouse.x = e.clientX; 
      mouse.y = e.clientY; 
      mouse.active = true; 
    };
    
    const onMouseOut  = () => { 
      mouse.active = false; 
    };

    resize();
    initParticles();
    window.addEventListener('resize', () => { resize(); initParticles(); });
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseout', onMouseOut);
    
    // Only run if tab is visible to save battery
    const onVisChange = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else { lastTime = performance.now(); raf = requestAnimationFrame(step); }
    };
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
