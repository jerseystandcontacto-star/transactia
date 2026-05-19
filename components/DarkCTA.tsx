'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function DarkCTA() {
  const { t } = useLanguage();

  return (
    <section className="bg-ink py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-ash mb-6">
          Transactia
        </p>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream leading-[1.1] max-w-3xl mx-auto mb-8">
          {t.cta.title}
        </h2>
        <p className="font-sans text-ash text-lg max-w-xl mx-auto mb-12 leading-relaxed">
          {t.cta.subtitle}
        </p>
        <a
          href="#contacto"
          className="inline-block bg-cream text-ink font-sans text-sm px-10 py-4 hover:bg-silk transition-colors"
        >
          {t.cta.button}
        </a>
      </div>
    </section>
  );
}
