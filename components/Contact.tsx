'use client';

import { useState, FormEvent } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Contact() {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Error de servidor');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full bg-transparent border border-silk font-sans text-sm text-ink placeholder:text-ash px-4 py-3 outline-none focus:border-dusk transition-colors';

  return (
    <section id="contacto" className="py-28 bg-cream scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl text-ink leading-[1.1] mb-5">
              {t.contact.title}
            </h2>
            <p className="font-sans text-dusk text-lg leading-relaxed mb-12">
              {t.contact.subtitle}
            </p>

            {status === 'sent' ? (
              <div className="border border-silk p-8">
                <p className="font-serif text-xl text-ink mb-2">
                  {lang === 'es' ? '¡Mensaje enviado!' : 'Message sent!'}
                </p>
                <p className="font-sans text-dusk text-sm">
                  {lang === 'es'
                    ? 'Nos pondremos en contacto contigo pronto.'
                    : "We'll be in touch with you soon."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    className={inputClass}
                    type="text"
                    placeholder={t.contact.name_placeholder}
                    aria-label={t.contact.name}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                  <input
                    className={inputClass}
                    type="text"
                    placeholder={t.contact.company_placeholder}
                    aria-label={t.contact.company}
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    className={inputClass}
                    type="email"
                    placeholder={t.contact.email_placeholder}
                    aria-label={t.contact.email}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                  <input
                    className={inputClass}
                    type="tel"
                    placeholder={lang === 'es' ? 'Teléfono' : 'Phone number'}
                    aria-label="Teléfono"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <textarea
                  className={`${inputClass} resize-none`}
                  rows={5}
                  placeholder={t.contact.message_placeholder}
                  aria-label={t.contact.message}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                />
                {status === 'error' && (
                  <p className="font-sans text-sm text-red-600">
                    {lang === 'es'
                      ? 'Hubo un error al enviar. Intenta de nuevo.'
                      : 'Something went wrong. Please try again.'}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-ink text-cream font-sans text-sm px-8 py-4 hover:bg-dusk transition-colors flex items-center gap-3 self-start disabled:opacity-50"
                >
                  <Send size={15} strokeWidth={1.5} />
                  {status === 'loading'
                    ? lang === 'es' ? 'Enviando…' : 'Sending…'
                    : t.contact.send}
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col justify-start lg:pt-28">
            <div className="border border-silk p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-ink flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={18} className="text-cream" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-serif text-xl text-ink">WhatsApp</p>
                  <p className="font-sans text-xs text-ash">{t.contact.whatsapp_sub}</p>
                </div>
              </div>
              <p className="font-sans text-dusk text-sm leading-relaxed mb-6">
                {t.contact.subtitle}
              </p>
              <a
                href="https://wa.me/521XXXXXXXXXX?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20Transactia"
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-ink text-ink font-sans text-sm px-6 py-3.5 hover:bg-ink hover:text-cream transition-colors text-center"
              >
                {t.contact.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
