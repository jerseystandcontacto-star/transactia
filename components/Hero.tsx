'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t, lang } = useLanguage();

  return (
    <section className="min-h-screen bg-cream flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full py-24 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          <div>
            <span className="block font-sans text-xs tracking-[0.2em] uppercase text-ash mb-8">
              {t.hero.eyebrow}
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-[4.25rem] text-ink leading-[1.05] mb-6">
              {t.hero.headline.split(t.hero.headline_em).map((part, i, arr) =>
                i < arr.length - 1 ? (
                  <span key={i}>
                    {part}
                    <span style={{ color: '#2a2928', fontWeight: 700 }}>{t.hero.headline_em}</span>
                  </span>
                ) : part
              )}
            </h1>
            <p className="font-sans text-sm tracking-wide text-ash mb-8 max-w-lg border-l-2 border-silk pl-4">
              {t.hero.value_prop}
            </p>
            <p className="font-sans text-dusk text-lg leading-relaxed mb-10 max-w-lg">
              {t.hero.subheadline}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contacto"
                className="inline-block bg-ink text-cream font-sans text-sm px-8 py-4 hover:bg-dusk transition-colors"
              >
                {t.hero.cta_demo}
              </a>
              <a
                href="#contacto"
                className="inline-block border border-ink text-ink font-sans text-sm px-8 py-4 hover:bg-silk transition-colors"
              >
                {t.hero.cta_contact}
              </a>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <EcosystemDiagram lang={lang} />
          </div>
        </div>
      </div>
    </section>
  );
}

function EcosystemDiagram({ lang }: { lang: string }) {
  const labels =
    lang === 'es'
      ? { pos: 'Terminal POS', online: 'Pago en Línea', spei: 'SPEI', api: 'API' }
      : { pos: 'POS Terminal', online: 'Online Payment', spei: 'SPEI', api: 'API' };

  const font = 'Satoshi, system-ui, sans-serif';

  return (
    <svg
      width="480"
      height="435"
      viewBox="0 0 320 290"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Transactia integrated payment ecosystem"
    >
      {/* ── Connecting lines ── */}
      <line x1="160" y1="140" x2="76"  y2="68"  stroke="#9a9990" strokeWidth="1"   strokeDasharray="4 3" />
      <line x1="160" y1="140" x2="244" y2="68"  stroke="#9a9990" strokeWidth="1"   strokeDasharray="4 3" />
      <line x1="160" y1="140" x2="76"  y2="212" stroke="#9a9990" strokeWidth="1"   strokeDasharray="4 3" />
      <line x1="160" y1="140" x2="244" y2="212" stroke="#9a9990" strokeWidth="1"   strokeDasharray="4 3" />

      {/* ── Center hub — outer decorative ring ── */}
      <circle cx="160" cy="140" r="54" stroke="#e8e7e3" strokeWidth="0.75" />

      {/* ── Center hub ── */}
      <circle cx="160" cy="140" r="42" fill="#0a0a0a" />
      <text x="160" y="136" textAnchor="middle" fontFamily={font} fontSize="9.5" fontWeight="700" fill="#f5f4f0" letterSpacing="0.1em">
        TRANSACTIA
      </text>
      <line x1="134" y1="142" x2="186" y2="142" stroke="#2a2928" strokeWidth="0.5" />
      <text x="160" y="153" textAnchor="middle" fontFamily={font} fontSize="7" fill="#9a9990" letterSpacing="0.12em">
        INTEGRADO
      </text>

      {/* ══════════════════════════════════
          TOP-LEFT — Terminal POS
      ══════════════════════════════════ */}
      <circle cx="76" cy="68" r="27" fill="#f5f4f0" stroke="#e8e7e3" strokeWidth="1.5" />
      {/* Credit card icon */}
      <g transform="translate(76, 67)" stroke="#0a0a0a" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="-11" y="-7.5" width="22" height="15" rx="2" />
        <line x1="-11" y1="-2" x2="11" y2="-2" />
        <rect x="-8" y="1.5" width="7" height="3" rx="0.75" fill="#0a0a0a" stroke="none" />
      </g>
      <text x="76" y="108" textAnchor="middle" fontFamily={font} fontSize="8.5" fontWeight="500" fill="#2a2928">
        {labels.pos}
      </text>

      {/* ══════════════════════════════════
          TOP-RIGHT — Pago en Línea
      ══════════════════════════════════ */}
      <circle cx="244" cy="68" r="27" fill="#f5f4f0" stroke="#e8e7e3" strokeWidth="1.5" />
      {/* Monitor icon */}
      <g transform="translate(244, 65)" stroke="#0a0a0a" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="-12" y="-11" width="24" height="17" rx="2" />
        <line x1="-4" y1="6" x2="4" y2="6" />
        <line x1="0" y1="6" x2="0" y2="9.5" />
        <line x1="-5" y1="9.5" x2="5" y2="9.5" />
      </g>
      <text x="244" y="108" textAnchor="middle" fontFamily={font} fontSize="8.5" fontWeight="500" fill="#2a2928">
        {labels.online}
      </text>

      {/* ══════════════════════════════════
          BOTTOM-LEFT — SPEI
      ══════════════════════════════════ */}
      <circle cx="76" cy="212" r="27" fill="#f5f4f0" stroke="#e8e7e3" strokeWidth="1.5" />
      {/* Bidirectional transfer arrows */}
      <g transform="translate(76, 212)" stroke="#0a0a0a" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <line x1="-10" y1="-5" x2="10" y2="-5" />
        <polyline points="6,-9 10,-5 6,-1" />
        <line x1="-10" y1="5" x2="10" y2="5" />
        <polyline points="-6,1 -10,5 -6,9" />
      </g>
      <text x="76" y="252" textAnchor="middle" fontFamily={font} fontSize="8.5" fontWeight="500" fill="#2a2928">
        {labels.spei}
      </text>

      {/* ══════════════════════════════════
          BOTTOM-RIGHT — API
      ══════════════════════════════════ */}
      <circle cx="244" cy="212" r="27" fill="#f5f4f0" stroke="#e8e7e3" strokeWidth="1.5" />
      {/* Code brackets </> */}
      <g transform="translate(244, 212)" stroke="#0a0a0a" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="-7,-8 -12,0 -7,8" />
        <polyline points="7,-8 12,0 7,8" />
        <line x1="-2.5" y1="-7" x2="2.5" y2="7" strokeWidth="1.3" />
      </g>
      <text x="244" y="252" textAnchor="middle" fontFamily={font} fontSize="8.5" fontWeight="500" fill="#2a2928">
        {labels.api}
      </text>

      {/* ── Small connection dots where lines meet the node circles ── */}
      <circle cx="76"  cy="68"  r="2.5" fill="#9a9990" />
      <circle cx="244" cy="68"  r="2.5" fill="#9a9990" />
      <circle cx="76"  cy="212" r="2.5" fill="#9a9990" />
      <circle cx="244" cy="212" r="2.5" fill="#9a9990" />
    </svg>
  );
}
