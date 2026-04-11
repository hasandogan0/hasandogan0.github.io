import { useState, useEffect } from 'react';
import ParallaxBackground from './components/ParallaxBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark';
  const saved = localStorage.getItem('theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <ParallaxBackground />
      <Navbar theme={theme} onThemeToggle={toggleTheme} />
      <main>
        <Hero />
        <div className="wrap"><div className="section-divider" /></div>
        <About />
        <div className="wrap"><div className="section-divider" /></div>
        <Projects />
        <div className="wrap"><div className="section-divider" /></div>
        <Skills />
        <div className="wrap"><div className="section-divider" /></div>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
