/**
 * Red and Blue – Contact Form API
 * Vercel Serverless Function
 *
 * Setup:
 *   1. Create a free account at https://resend.com
 *   2. Add RESEND_API_KEY to Vercel environment variables
 *   3. Replace FROM_EMAIL with a verified sender domain
 *   4. Replace TO_EMAIL with your receiving address
 */

const FROM_EMAIL = 'noreply@redandblue.com';
const TO_EMAIL   = 'hola@redandblue.com';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, message } = req.body ?? {};

  // Basic validation
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Todos los campos son requeridos.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ error: 'Email inválido.' });
  }

  // Sanitize inputs
  const safeName    = name.trim().slice(0, 100).replace(/[<>]/g, '');
  const safeEmail   = email.trim().slice(0, 200);
  const safeMessage = message.trim().slice(0, 2000).replace(/[<>]/g, '');

  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured');
    return res.status(500).json({ error: 'Servicio de email no configurado.' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to:   [TO_EMAIL],
        reply_to: safeEmail,
        subject: `Nueva consulta de ${safeName} – Red and Blue`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
            <h2 style="color: #1A3FAA; margin-bottom: 24px;">Nueva consulta desde redandblue.com</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #666; font-size: 14px; width: 100px;">Nombre</td>
                <td style="padding: 10px 0; font-weight: 500;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666; font-size: 14px;">Email</td>
                <td style="padding: 10px 0;"><a href="mailto:${safeEmail}" style="color: #E8192C;">${safeEmail}</a></td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <h3 style="font-size: 14px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Mensaje</h3>
            <p style="line-height: 1.7; color: #333; white-space: pre-line;">${safeMessage}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
            <p style="font-size: 12px; color: #999;">Red and Blue · redandblue.com</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error('Resend error:', err);
      return res.status(500).json({ error: 'Error al enviar el mensaje. Intentá de nuevo.' });
    }

    return res.status(200).json({ ok: true });

  } catch (err) {
    console.error('Contact handler error:', err);
    return res.status(500).json({ error: 'Error interno. Intentá de nuevo.' });
  }
}
