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
            <h1 className="font-serif text-5xl md:text-6xl lg:text-[4.25rem] text-ink leading-[1.05] mb-8">
              {t.hero.headline}
            </h1>
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
            <div className="relative" style={{ width: 320, height: 280 }}>
              <PaymentCard lang={lang} t={t} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PaymentCard({
  lang,
  t,
}: {
  lang: string;
  t: ReturnType<typeof useLanguage>['t'];
}) {
  return (
    <>
      <div
        className="absolute inset-x-0 top-8 bottom-8 bg-ink overflow-hidden"
        style={{ borderRadius: 2 }}
      >
        <div className="absolute inset-0 p-7 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-sans text-xs tracking-[0.18em] text-ash">
              TRANSACTIA
            </span>
            <div className="flex">
              <div className="w-7 h-7 rounded-full bg-ash opacity-50" />
              <div className="w-7 h-7 rounded-full bg-dusk opacity-40 -ml-3" />
            </div>
          </div>

          <div>
            <p className="font-sans text-[10px] tracking-widest uppercase text-ash mb-1.5">
              {t.hero.card_label}
            </p>
            <p className="font-serif text-cream" style={{ fontSize: '2.2rem', lineHeight: 1 }}>
              $24,950
              <span className="text-2xl">.00</span>
            </p>
            <p className="font-sans text-[10px] tracking-wider text-ash mt-1">MXN</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="font-sans text-[10px] text-ash tracking-wide">
              {t.hero.card_status}
            </span>
          </div>

          <div className="flex items-end justify-between">
            <span className="font-sans text-[10px] text-ash tracking-[0.12em]">
              •••• •••• •••• 4521
            </span>
            <span className="font-sans text-[10px] text-ash tracking-wider">05/28</span>
          </div>
        </div>

        <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full border border-dusk opacity-20" />
        <div className="absolute -right-8 -bottom-16 w-40 h-40 rounded-full border border-dusk opacity-15" />
      </div>

      <div className="absolute -left-16 top-4 bg-cream border border-silk px-4 py-3 w-36 shadow-sm">
        <p className="font-serif text-2xl text-ink leading-none">99.9%</p>
        <p className="font-sans text-[10px] text-ash mt-1.5 leading-snug">{t.hero.stat_uptime}</p>
      </div>

      <div className="absolute -right-16 bottom-4 bg-cream border border-silk px-4 py-3 w-36 shadow-sm">
        <p className="font-serif text-2xl text-ink leading-none">&lt;1 min</p>
        <p className="font-sans text-[10px] text-ash mt-1.5 leading-snug">{t.hero.stat_response}</p>
      </div>
    </>
  );
}
