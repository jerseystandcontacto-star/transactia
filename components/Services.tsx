'use client';

import { Smartphone, Globe, ArrowLeftRight, Code2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const icons = [Smartphone, Globe, ArrowLeftRight, Code2];

export default function Services() {
  const { t } = useLanguage();

  return (
    <section id="servicios" className="py-28 bg-cream scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16 max-w-xl">
          <h2 className="font-serif text-4xl md:text-5xl text-ink leading-[1.1] mb-5">
            {t.services.title}
          </h2>
          <p className="font-sans text-dusk text-lg leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-silk">
          {t.services.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="bg-cream p-10 group hover:bg-ink transition-colors duration-300"
              >
                <div className="mb-8">
                  <Icon
                    size={22}
                    className="text-ink group-hover:text-cream transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-serif text-2xl text-ink group-hover:text-cream mb-4 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="font-sans text-dusk group-hover:text-ash text-base leading-relaxed transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
