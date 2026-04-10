const SKILLS = [
  '.NET Core', 'C#', 'ASP.NET Web API', 'Entity Framework Core',
  'SQL Server', 'Docker', 'JavaScript', 'Git', 'REST API', 'LINQ',
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <div className="section-header">
          <div className="section-tag">Ben kimim?</div>
          <h2 className="section-title">Hakkımda</h2>
        </div>

        <div className="about-grid">
          {/* Left: Text */}
          <div className="about-text">
            <p>
              <span className="highlight">Aksaray Üniversitesi Yazılım Mühendisliği</span> öğrencisiyim.
              Backend geliştirme, sistem mimarisi ve veri yönetimi konularında kendimi geliştirmeye
              odaklanıyorum.
            </p>
            <p>
              <span className="highlight">C#, .NET Core ve ASP.NET Web API</span> ile ölçeklenebilir
              backend sistemleri tasarlıyor; <span className="highlight">Entity Framework Core</span> ve{' '}
              <span className="highlight">SQL Server</span> ile veritabanı katmanı kuruyorum. Her projede
              temiz kod, solid prensipler ve maintainable mimari oluşturmaya özen gösteriyorum.
            </p>
            <p>
              Yeni teknolojileri öğrenmeye ve edindiğim bilgileri gerçek projelere yansıtmaya hakikaten
              tutkuyla bağlıyım. Şu an özellikle <span className="highlight">Docker</span> ve{' '}
              <span className="highlight">Clean Architecture</span> üzerine çalışıyorum.
            </p>

            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-num">4+</span>
                <span className="stat-label">Proje</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">2+</span>
                <span className="stat-label">Yıl deneyim</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">3+</span>
                <span className="stat-label">Teknoloji stack</span>
              </div>
            </div>

            <div className="hero-cta" style={{ marginTop: '1.5rem' }}>
              <a
                id="githubProfileLink"
                className="btn btn-primary"
                href="https://github.com/hdqn"
                target="_blank"
                rel="noopener noreferrer"
              >
                🐙 GitHub Profilim
              </a>
              <a
                id="emailLink"
                className="btn btn-outline"
                href="mailto:hasandqn106@gmail.com"
              >
                ✉️ Mail Gönder
              </a>
            </div>
          </div>

          {/* Right: Skills */}
          <div>
            <p className="skills-title">Teknolojiler &amp; Araçlar</p>
            <ul className="badges" role="list" aria-label="Teknoloji listesi">
              {SKILLS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
