'use client';

import { useState, FormEvent } from 'react';
import { Send } from 'lucide-react';
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
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-full" style={{ backgroundColor: '#25D366' }}>
                  <svg viewBox="0 0 24 24" fill="white" width={18} height={18} aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
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
                href="https://wa.me/525543632929?text=Hola%2C%20me%20interesa%20conocer%20más%20sobre%20los%20servicios%20de%20Transactia."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 font-sans text-sm text-white px-6 py-3.5 transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#25D366' }}
              >
                <svg viewBox="0 0 24 24" fill="white" width={16} height={16} aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t.contact.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
