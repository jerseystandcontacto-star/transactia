import { google } from 'googleapis';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  // 1. Parse body
  let body: { name?: string; company?: string; email?: string; phone?: string; message?: string };
  try {
    body = await req.json();
  } catch (err) {
    console.error('[contact] Failed to parse request body:', err);
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { name, company, email, phone, message } = body;

  if (!name || !email || !message) {
    return Response.json({ error: 'Faltan campos requeridos.' }, { status: 400 });
  }

  // 2. Check env vars
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const serviceEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKeyRaw = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

  console.log('[contact] env check → spreadsheetId:', spreadsheetId ? 'ok' : 'MISSING');
  console.log('[contact] env check → serviceEmail:', serviceEmail ?? 'MISSING');
  console.log('[contact] env check → privateKey starts with:', privateKeyRaw?.slice(0, 40) ?? 'MISSING');

  if (!spreadsheetId || !serviceEmail || !privateKeyRaw) {
    return Response.json({ error: 'Configuración del servidor incompleta.' }, { status: 500 });
  }

  const privateKey = privateKeyRaw.replace(/\\n/g, '\n');

  // 3. Auth + append
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: serviceEmail,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const timestamp = new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' });

    const appendRes = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:F',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[timestamp, name, company ?? '', email, phone ?? '', message]],
      },
    });

    console.log('[contact] Sheets append status:', appendRes.status, appendRes.data.updates);
    return Response.json({ success: true });
  } catch (err: unknown) {
    const gErr = err as { code?: number; message?: string; errors?: unknown };
    console.error('[contact] Sheets API error — code:', gErr?.code, '| message:', gErr?.message, '| details:', JSON.stringify(gErr?.errors));
    return Response.json(
      { error: 'Error al guardar el mensaje.', detail: gErr?.message },
      { status: 500 },
    );
  }
}
