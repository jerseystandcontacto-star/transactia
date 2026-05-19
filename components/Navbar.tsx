'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const { t, lang, toggle } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: t.nav.services, href: '#servicios' },
    { label: t.nav.why, href: '#por-que' },
    { label: t.nav.contact, href: '#contacto' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-20 bg-cream transition-all duration-200 ${
        scrolled ? 'border-b border-silk' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-full flex items-center justify-between">
        <a href="/" aria-label="Transactia inicio">
          <Logo />
        </a>

        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-sm text-dusk hover:text-ink transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <button
            onClick={toggle}
            className="font-sans text-sm text-ash hover:text-ink transition-colors tracking-widest"
            aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <a
            href="#contacto"
            className="bg-ink text-cream font-sans text-sm px-5 py-2.5 hover:bg-dusk transition-colors"
          >
            {t.nav.demo}
          </a>
        </div>

        <button
          className="md:hidden text-ink"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-cream border-b border-silk px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-sans text-sm text-dusk hover:text-ink transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-5 pt-4 border-t border-silk">
            <button
              onClick={() => { toggle(); setMobileOpen(false); }}
              className="font-sans text-sm text-ash hover:text-ink transition-colors"
            >
              {lang === 'es' ? 'English' : 'Español'}
            </button>
            <a
              href="#contacto"
              onClick={() => setMobileOpen(false)}
              className="bg-ink text-cream font-sans text-sm px-5 py-2.5 hover:bg-dusk transition-colors"
            >
              {t.nav.demo}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
