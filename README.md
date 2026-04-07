# hasandogan0.github.io

Basit ve etkili statik portföy sitesi — doğrudan GitHub Pages ile yayınlanabilir.

## İçerik
- `index.html`, `styles.css`, `script.js` — site kaynakları.

## Hızlı yayın (SSH)
Repo adınızı `hasandogan0.github.io` olarak oluşturun ve aşağıyı çalıştırın:

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin git@github.com:hasandogan0/hasandogan0.github.io.git
git push -u origin main
```

## Hızlı yayın (HTTPS)
```bash
git remote add origin https://github.com/hasandogan0/hasandogan0.github.io.git
git push -u origin main
```

> Not: `username.github.io` isimli repo (ör. `hasandogan0.github.io`) kullanıyorsanız, GitHub Pages otomatik olarak `main` branch'inden sitenizi yayınlar. Yayınlandıktan sonra erişim: `https://hasandogan0.github.io`.

## Yerel önizleme
Basit bir yerel sunucu ile test edin:

```bash
python -m http.server 8000
# veya
npx http-server -p 8000
```

Ardından tarayıcıda: `http://localhost:8000`

## Değişiklikler
- Mobil menü (hamburger) eklendi.
- Basit tema toggle ve canvas arka plan dynamiği korunuyor.

İsterseniz repo ayarları için `CNAME` veya SEO meta eklemeleri yapabilirim.