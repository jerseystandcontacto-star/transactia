'use client';

import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const providers = [
  {
    name: 'NetPay',
    logo: '/netpay.png',
    imgStyle: { filter: 'invert(40%) sepia(80%) saturate(500%) hue-rotate(180deg) brightness(90%)' },
    padding: 24,
  },
  {
    name: 'BZ Pay',
    logo: '/bzpay.png',
    imgStyle: {},
    padding: 12,
  },
  {
    name: 'Ecart Pay',
    logo: '/ecartpay.webp',
    imgStyle: {},
    padding: 24,
  },
];

export default function Providers() {
  const { t } = useLanguage();

  return (
    <section className="bg-ink py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-cream leading-[1.1] max-w-2xl mx-auto mb-4">
          {t.providers.title}
        </h2>
        <p className="font-sans text-ash text-base max-w-lg mx-auto mb-14 leading-relaxed">
          {t.providers.subtitle}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {providers.map((provider) => (
            <div
              key={provider.name}
              className="flex items-center justify-center rounded-sm border border-silk"
              style={{ width: 176, height: 88, padding: provider.padding, backgroundColor: '#ffffff' }}
            >
              <Image
                src={provider.logo}
                alt={provider.name}
                width={128}
                height={40}
                className="object-contain w-full h-full"
                style={provider.imgStyle}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
