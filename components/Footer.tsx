'use client';

import { useLanguage } from '@/context/LanguageContext';
import Logo from './Logo';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-ink py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div>
            <Logo inverted />
            <p className="font-sans text-sm text-ash mt-5 leading-relaxed max-w-xs">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-dusk mb-5">
              {t.footer.nav_title}
            </p>
            <ul className="flex flex-col gap-3">
              {t.footer.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-ash hover:text-cream transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-dusk mb-5">
              {t.footer.legal_title}
            </p>
            <ul className="flex flex-col gap-3">
              {t.footer.legal_links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-ash hover:text-cream transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-dusk/30 pt-8">
          <p className="font-sans text-xs text-dusk">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
