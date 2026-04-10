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
      <div className="wrap hero-inner">
        {/* Left: Text */}
        <div className="hero-text">
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
          <div className="hero-cta">
            <a id="heroCta1" className="btn btn-primary" href="#projects">
              🚀 Projelerime Göz At
            </a>
            <a id="heroCta2" className="btn btn-outline" href="#contact">
              ✉️ İletişime Geç
            </a>
          </div>
        </div>

        {/* Right: Info Card */}
        <aside className="hero-card" aria-label="Hızlı bilgiler">
          <p className="hero-card-title">Hızlı Bilgiler</p>

          <div className="hero-card-row">
            <span className="icon">📍</span>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '2px' }}>Konum</div>
              Aksaray, Türkiye
            </div>
          </div>

          <div className="hero-card-row">
            <span className="icon">🎓</span>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '2px' }}>Eğitim</div>
              Aksaray Üniversitesi<br />
              <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>Yazılım Mühendisliği</span>
            </div>
          </div>

          <div className="hero-card-row">
            <span className="icon">📧</span>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '2px' }}>E-posta</div>
              <a href="mailto:hasandqn106@gmail.com">hasandqn106@gmail.com</a>
            </div>
          </div>

          <div className="hero-card-row">
            <span className="icon">🐙</span>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '2px' }}>GitHub</div>
              <a href="https://github.com/hdqn" target="_blank" rel="noopener noreferrer">github.com/hdqn</a>
            </div>
          </div>

          <div className="status-badge">Aktif olarak gelişim arayışındayım</div>
        </aside>
      </div>
    </section>
  );
}
