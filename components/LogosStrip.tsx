'use client';

import { useLanguage } from '@/context/LanguageContext';

const placeholderLogos = [
  { width: 'w-24', label: 'Cliente A' },
  { width: 'w-20', label: 'Cliente B' },
  { width: 'w-28', label: 'Cliente C' },
  { width: 'w-20', label: 'Cliente D' },
  { width: 'w-24', label: 'Cliente E' },
  { width: 'w-32', label: 'Cliente F' },
];

export default function LogosStrip() {
  const { t } = useLanguage();

  return (
    <section className="border-y border-silk py-12 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-ash text-center mb-10">
          {t.logos.title}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {placeholderLogos.map((logo, i) => (
            <div
              key={i}
              className={`${logo.width} h-6 bg-silk rounded-sm opacity-60`}
              aria-label={logo.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
