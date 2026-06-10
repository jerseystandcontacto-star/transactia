import { Resend } from 'resend';
import { NextRequest } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/admin';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  let body: { name?: string; company?: string; email?: string; phone?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { name, company, email, phone, message } = body;

  if (!name || !email || !message) {
    return Response.json({ error: 'Faltan campos requeridos.' }, { status: 400 });
  }

  // 1. Save lead to Supabase
  const { error: dbError } = await getSupabaseAdmin().from('leads').insert({
    name,
    company: company ?? null,
    email,
    phone: phone ?? null,
    message,
    status: 'Nuevo',
  });

  if (dbError) {
    console.error('[contact] Supabase insert error:', dbError.message);
    return Response.json({ error: 'Error al guardar el mensaje.' }, { status: 500 });
  }

  // 2. Send email notification (non-blocking — Supabase is the source of truth)
  if (process.env.RESEND_API_KEY) {
    try {
      await resend.emails.send({
        from: 'Transactia Web <onboarding@resend.dev>',
        to: 'contacto@transactia.net',
        subject: `Nuevo lead: ${name}${company ? ` — ${company}` : ''}`,
        text: [
          `Nombre:   ${name}`,
          `Empresa:  ${company || '—'}`,
          `Email:    ${email}`,
          `Teléfono: ${phone || '—'}`,
          ``,
          `Mensaje:`,
          message,
        ].join('\n'),
      });
    } catch (emailErr) {
      // Log but don't fail — lead is already saved
      console.error('[contact] Resend error:', emailErr);
    }
  }

  return Response.json({ success: true });
}
