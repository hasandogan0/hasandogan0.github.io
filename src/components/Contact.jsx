import { useState } from 'react';

const CONTACT_INFO = [
  {
    id: 'contact-location',
    icon: '📍',
    label: 'Konum',
    value: 'Aksaray, Türkiye',
  },
  {
    id: 'contact-email',
    icon: '📧',
    label: 'E-posta',
    value: <a href="mailto:hasandqn106@gmail.com">hasandqn106@gmail.com</a>,
  },
  {
    id: 'contact-github',
    icon: '🐙',
    label: 'GitHub',
    value: (
      <a href="https://github.com/hdqn" target="_blank" rel="noopener noreferrer">
        github.com/hdqn
      </a>
    ),
  },
  {
    id: 'contact-status',
    icon: '💼',
    label: 'Durum',
    value: 'Staj / Junior pozisyonlara açığım',
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // mailto fallback — gerçek backend entegre edilebilir
    const subject = encodeURIComponent(`Portföy İletişim: ${form.name}`);
    const body = encodeURIComponent(`İsim: ${form.name}\nE-posta: ${form.email}\n\n${form.message}`);
    window.open(`mailto:hasandqn106@gmail.com?subject=${subject}&body=${body}`);
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="section">
      <div className="wrap">
        <div className="section-header">
          <div className="section-tag">Bana Ulaş</div>
          <h2 className="section-title">İletişim</h2>
        </div>

        <div className="contact-grid">
          {/* Form */}
          <div className="contact-form-wrap">
            {sent ? (
              <div className="form-success">
                ✅ Mesajın e-posta istemcisinde açıldı! Teşekkürler.
              </div>
            ) : (
              <form id="contactForm" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label className="form-label" htmlFor="contactName">İsim</label>
                  <input
                    id="contactName"
                    className="form-input"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Adınız Soyadınız"
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contactEmail">E-posta</label>
                  <input
                    id="contactEmail"
                    className="form-input"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="ornek@mail.com"
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contactMessage">Mesaj</label>
                  <textarea
                    id="contactMessage"
                    className="form-textarea"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Merhaba Hasan, seninle..."
                    rows={5}
                    required
                  />
                </div>
                <button id="contactSubmit" type="submit" className="form-btn">
                  ✉️ Mesaj Gönder
                </button>
              </form>
            )}
          </div>

          {/* Info Cards */}
          <div className="contact-info-wrap">
            {CONTACT_INFO.map(({ id, icon, label, value }) => (
              <div key={id} id={id} className="contact-info-card">
                <div className="contact-icon" aria-hidden="true">{icon}</div>
                <div>
                  <p className="contact-info-label">{label}</p>
                  <div className="contact-info-value">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
