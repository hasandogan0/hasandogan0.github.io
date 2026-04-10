export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-inner">
          <p className="footer-copy">
            © {year} <strong>Hasan Doğan</strong> — Tüm hakları saklıdır.
          </p>
          <div className="footer-links">
            <a
              href="https://github.com/hdqn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profilim"
            >
              GitHub
            </a>
            <a href="mailto:hasandqn106@gmail.com" aria-label="E-posta gönder">
              E-posta
            </a>
            <a href="#home" aria-label="Sayfanın başına dön">Yukarı ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
