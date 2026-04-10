import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { label: 'Anasayfa', href: '#home' },
  { label: 'Projeler', href: '#projects' },
  { label: 'Hakkımda', href: '#about' },
  { label: 'İletişim', href: '#contact' },
];

export default function Navbar({ theme, onThemeToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="wrap">
        <nav className="navbar-inner" aria-label="Ana navigasyon">
          <a className="nav-brand" href="#home">
            HASAN<span>.</span>
          </a>

          <ul className="nav-links" role="list">
            {NAV_ITEMS.map(({ label, href }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button
              id="themeToggle"
              className="theme-btn"
              onClick={onThemeToggle}
              aria-label="Temayı değiştir"
              title={theme === 'dark' ? 'Açık tema' : 'Koyu tema'}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button
              id="menuToggle"
              className="menu-btn"
              onClick={() => setMenuOpen(o => !o)}
              aria-expanded={menuOpen}
              aria-label="Menüyü aç/kapat"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Nav */}
      <div className={`mobile-nav${menuOpen ? ' open' : ''}`} role="navigation" aria-label="Mobil menü">
        {NAV_ITEMS.map(({ label, href }) => (
          <a key={href} href={href} onClick={closeMenu}>{label}</a>
        ))}
      </div>
    </header>
  );
}
