const SKILLS = [
  '.NET Core', 'C#', 'ASP.NET Web API', 'Entity Framework Core',
  'SQL Server', 'Docker', 'JavaScript', 'Git', 'REST API', 'LINQ',
];

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="wrap">
        <div className="section-header">
          <div className="section-tag">Yetenenek Havuzum</div>
          <h2 className="section-title">Bildiğim Diller &amp; Teknolojiler</h2>
        </div>
        
        <div className="skills-container" style={{ maxWidth: '800px' }}>
          <p className="skills-desc" style={{ color: 'var(--muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            Aşağıda ağırlıklı olarak kullandığım ve kendimi geliştirmekte olduğum programlama dilleri,
            framework'ler ve araçlar yer almaktadır. Modern backend geliştirme pratiklerine uygun 
            olarak güncel teknolojileri takip ediyorum.
          </p>
          <ul className="badges skills-badges" role="list" aria-label="Teknoloji listesi" style={{ gap: '0.75rem' }}>
            {SKILLS.map((s) => (
              <li key={s} style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
