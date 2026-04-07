// Basit typing efekti ve tema toggle
(function(){
  const phrases = [
    'Junior yazılım mühendisiyim.',
    '.NET Core ile backend geliştiriyorum.',
    'REST API yazıyorum.',
    'Backend odaklı, öğrenmeye açığım.'
  ];

  const el = document.getElementById('typing');
  const cursor = document.querySelector('.cursor');
  let pi = 0, ci = 0, forward = true;

  function tick(){
    const str = phrases[pi];
    if(forward){
      ci++;
      el.textContent = str.slice(0,ci);
      if(ci === str.length){
        forward = false;
        setTimeout(tick,1200);
        return;
      }
    } else {
      ci--;
      el.textContent = str.slice(0,ci);
      if(ci === 0){
        forward = true;
        pi = (pi+1) % phrases.length;
      }
    }
    setTimeout(tick, forward ? 80 : 40);
  }
  // başlat
  if(el) tick();

  // Tema toggle
  const themeToggle = document.getElementById('themeToggle');
  function applyTheme(t){
    if(t === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }
  // localStorage'dan oku
  const saved = localStorage.getItem('theme');
  if(saved) applyTheme(saved);
  themeToggle && themeToggle.addEventListener('click', ()=>{
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Mobil menü toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if(navToggle){
    navToggle.addEventListener('click', ()=>{
      const opened = document.documentElement.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
    });
    // Kapatmak için linklere tıklandığında menüyü kapat
    if(navLinks){
      navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{
        document.documentElement.classList.remove('nav-open');
      }));
    }
  }

  // Basit scroll reveal
  const cards = document.querySelectorAll('.card');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('reveal');
    });
  },{threshold:0.15});
  cards.forEach(c=>obs.observe(c));

})();

/* Dynamic canvas background: soft glowing particles */
(function(){
  const canvas = document.getElementById('bgCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w=0,h=0,particles=[];
  const DPR = Math.min(2, window.devicePixelRatio || 1);

  function resize(){
    w = canvas.width = Math.floor(window.innerWidth * DPR);
    h = canvas.height = Math.floor(window.innerHeight * DPR);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(DPR,0,0,DPR,0,0);
  }

  window.addEventListener('resize', resize);
  resize();

  const count = Math.max(40, Math.min(140, Math.floor((window.innerWidth*window.innerHeight)/90000)));
  const colors = [ '245, 158, 11', '194, 65, 12', '217, 119, 6' ];

  for(let i=0;i<count;i++){
    particles.push({
      x: Math.random()*window.innerWidth,
      y: Math.random()*window.innerHeight,
      r: 8 + Math.random()*36,
      vx: (Math.random()-0.5)*0.25,
      vy: (Math.random()-0.5)*0.25,
      c: colors[Math.floor(Math.random()*colors.length)],
      a: 0.06 + Math.random()*0.18
    });
  }

  const mouse = {x:-9999,y:-9999,active:false};
  window.addEventListener('mousemove', (e)=>{mouse.x=e.clientX;mouse.y=e.clientY;mouse.active=true});
  window.addEventListener('mouseout', ()=>{mouse.x=-9999;mouse.y=-9999;mouse.active=false});

  let raf; let last=0;
  function step(t){
    raf = requestAnimationFrame(step);
    const dt = Math.min(40, t - last); last = t;
    ctx.clearRect(0,0,window.innerWidth, window.innerHeight);

    // subtle background gradient overlay
    const g = ctx.createLinearGradient(0,0,window.innerWidth,window.innerHeight);
    g.addColorStop(0, 'rgba(20,15,10,0.02)');
    g.addColorStop(1, 'rgba(40,25,10,0.02)');
    ctx.fillStyle = g; ctx.fillRect(0,0,window.innerWidth,window.innerHeight);

    for(const p of particles){
      // interaction with mouse
      if(mouse.active){
        const dx = mouse.x - p.x; const dy = mouse.y - p.y;
        const d2 = dx*dx+dy*dy;
        if(d2 < 120000){
          const f = (120000 - d2) / 120000;
          p.vx += (dx / 2000) * f;
          p.vy += (dy / 2000) * f;
        }
      }

      p.x += p.vx * (dt/16);
      p.y += p.vy * (dt/16);

      // wrap
      if(p.x < -100) p.x = window.innerWidth + 100;
      if(p.x > window.innerWidth + 100) p.x = -100;
      if(p.y < -100) p.y = window.innerHeight + 100;
      if(p.y > window.innerHeight + 100) p.y = -100;

      // draw glow circle
      ctx.beginPath();
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      grad.addColorStop(0, `rgba(${p.c}, ${p.a})`);
      grad.addColorStop(0.35, `rgba(${p.c}, ${p.a*0.45})`);
      grad.addColorStop(1, `rgba(${p.c}, 0)`);
      ctx.fillStyle = grad;
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillRect(p.x-p.r, p.y-p.r, p.r*2, p.r*2);
      ctx.globalCompositeOperation = 'source-over';
    }
  }

  // pause when not visible
  document.addEventListener('visibilitychange', ()=>{
    if(document.hidden) cancelAnimationFrame(raf);
    else { last = performance.now(); raf = requestAnimationFrame(step); }
  });

  raf = requestAnimationFrame(step);

})();
