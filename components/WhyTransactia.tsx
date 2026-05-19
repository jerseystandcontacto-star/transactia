'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function WhyTransactia() {
  const { t } = useLanguage();

  return (
    <section id="por-que" className="py-28 bg-silk scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16 max-w-xl">
          <h2 className="font-serif text-4xl md:text-5xl text-ink leading-[1.1] mb-5">
            {t.why.title}
          </h2>
          <p className="font-sans text-dusk text-lg leading-relaxed">
            {t.why.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-ash/20">
          {t.why.items.map((item, i) => (
            <div key={i} className="bg-silk p-10">
              <p className="font-serif text-6xl text-ash/40 leading-none mb-8 select-none">
                {item.number}
              </p>
              <h3 className="font-serif text-2xl text-ink mb-4">{item.title}</h3>
              <p className="font-sans text-dusk text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
