import { useEffect, useRef } from 'react';

export default function ParallaxBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    let raf;
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1

      // Use requestAnimationFrame for smooth performance
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const layers = containerRef.current.querySelectorAll('.parallax-layer');
        layers.forEach((layer) => {
          const speed = parseFloat(layer.getAttribute('data-speed'));
          const xOffset = x * speed;
          const yOffset = y * speed;
          layer.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="parallax-bg" ref={containerRef} aria-hidden="true">
      <div className="parallax-layer" data-speed="15">
        <div className="px-shape border-circle s1"></div>
      </div>
      <div className="parallax-layer" data-speed="35">
        <div className="px-shape dot-grid s2"></div>
      </div>
      <div className="parallax-layer" data-speed="50">
        <div className="px-shape outline-box s3"></div>
      </div>
      <div className="parallax-layer" data-speed="80">
        <div className="px-shape solid-rect s4"></div>
      </div>
      <div className="parallax-layer" data-speed="25">
         <div className="px-shape outline-circle s5"></div>
      </div>
    </div>
  );
}
