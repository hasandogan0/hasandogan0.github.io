const PROJECTS = [
  {
    id: 'ad-management',
    title: 'Reklam Yönetim Sistemi (API)',
    description:
      'Dinamik kampanya yönetimi, kullanıcı segmentasyonu ve reklam dağıtımı için ölçeklenebilir backend. ASP.NET Web API ile inşa edildi.',
    tags: ['.NET Core', 'Web API', 'SQL Server'],
    emoji: '📊',
    gradient: 'linear-gradient(135deg, #1a0533 0%, #2d1054 50%, #180d40 100%)',
    github: 'https://github.com/hdqn',
  },
  {
    id: 'educore',
    title: 'EduCore — Eğitim Yönetim Sistemi',
    description:
      'Modüler LMS çekirdeği: öğrenci, ders ve içerik yönetimi için Web API. Entity Framework Core ile veritabanı katmanı.',
    tags: ['ASP.NET', 'EF Core', 'REST API'],
    emoji: '🎓',
    gradient: 'linear-gradient(135deg, #0a1a2e 0%, #0f3460 50%, #1a1040 100%)',
    github: 'https://github.com/hdqn',
  },
  {
    id: 'winhydra',
    title: 'winHydra',
    description:
      'Windows için birleştirilmiş sistem araçları sağlayan masaüstü uygulama. Sistem yönetimini kolaylaştıran çok amaçlı araç seti.',
    tags: ['C#', 'WinForms', 'Windows'],
    emoji: '🛠️',
    gradient: 'linear-gradient(135deg, #0d1f0d 0%, #1a3a1a 50%, #102010 100%)',
    github: 'https://github.com/hdqn',
  },
  {
    id: 'photo-cryptology',
    title: 'Photo_Cryptology',
    description:
      'Görüntü şifreleme ve steganografi çözümleri. Fotoğraflara gizli mesaj gömme ve çıkarma algoritmaları.',
    tags: ['C#', 'Kriptografi', 'Steganografi'],
    emoji: '🔐',
    gradient: 'linear-gradient(135deg, #1a0d00 0%, #3d1a00 50%, #281000 100%)',
    github: 'https://github.com/hdqn',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="wrap">
        <div className="section-header">
          <div className="section-tag">Çalışmalarım</div>
          <h2 className="section-title">Projeler</h2>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((p) => (
            <article key={p.id} id={`project-${p.id}`} className="project-card">
              {/* Gradient Banner */}
              <div className="project-img-wrap">
                <div
                  className="proj-gradient"
                  style={{ background: p.gradient }}
                  aria-hidden="true"
                >
                  {p.emoji}
                </div>
              </div>

              <div className="project-body">
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.description}</p>

                <div className="project-footer">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    aria-label={`${p.title} GitHub deposu`}
                  >
                    🐙 GitHub
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
