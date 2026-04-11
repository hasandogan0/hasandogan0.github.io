import { useState, useEffect, useRef } from 'react';

const PHRASES = [
  'Junior Yazılım Mühendisiyim.',
  '.NET Core ile backend geliştiriyorum.',
  'REST API tasarlıyorum.',
  'Sistem mimarisi üzerine çalışıyorum.',
  'Öğrenmeye ve üretmeye devam ediyorum.',
];

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const state = useRef({ pi: 0, ci: 0, forward: true });

  useEffect(() => {
    let timer;
    function tick() {
      const { pi, ci, forward } = state.current;
      const str = PHRASES[pi];

      if (forward) {
        const newCi = ci + 1;
        setDisplayText(str.slice(0, newCi));
        if (newCi === str.length) {
          state.current = { pi, ci: newCi, forward: false };
          timer = setTimeout(tick, 1400);
        } else {
          state.current = { pi, ci: newCi, forward: true };
          timer = setTimeout(tick, 75);
        }
      } else {
        const newCi = ci - 1;
        setDisplayText(str.slice(0, newCi));
        if (newCi === 0) {
          state.current = { pi: (pi + 1) % PHRASES.length, ci: 0, forward: true };
          timer = setTimeout(tick, 300);
        } else {
          state.current = { pi, ci: newCi, forward: false };
          timer = setTimeout(tick, 38);
        }
      }
    }
    timer = setTimeout(tick, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="wrap hero-inner centered-hero">
        <div className="hero-content">
          <div className="hero-img-wrap">
            <img src="https://placehold.co/200x200/222/FFF?text=HD" alt="Hasan Doğan" className="profile-img" />
          </div>
          
          <div className="hero-greeting">👋 Merhaba, ben</div>
          <h1 className="hero-title">
            <span className="name">Hasan</span> Doğan
          </h1>
          <p className="hero-lead">
            Yazılım Mühendisliği öğrencisi · Backend geliştirici · .NET Core &amp; API odaklı
          </p>
          <div className="hero-typing" aria-live="polite" aria-label="Dinamik metin">
            <span>{displayText}</span>
            <span className="cursor-blink" aria-hidden="true" />
          </div>
          <div className="hero-cta centered-cta">
            <a id="heroCta1" className="btn btn-primary" href="#projects">
              🚀 Projelerime Göz At
            </a>
            <a id="heroCta2" className="btn btn-outline" href="#contact">
              ✉️ İletişime Geç
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
