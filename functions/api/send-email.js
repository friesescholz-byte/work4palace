export async function onRequestPost(context) {
  const { request, env } = context;

  // CORS Headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const { name, email, phone, projectType, message, formType, scopeSize, location, timeframe } = await request.json();

    // 1. Validierung der Pflichtfelder
    if (!name || !email) {
      return new Response(JSON.stringify({ success: false, message: 'Bitte Name und E-Mail ausfüllen.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 2. E-Mail über Resend senden
    const resendApiKey = env.RESEND_API_KEY || 're_23WnEvZS_MiA7sHvE1HVkZC5TDV7TeqXi';
    const isPlanner = formType === "planner";
    const subject = isPlanner
      ? `🏛️ Neue Projektkonfiguration von ${name}`
      : `✉️ Neue Kontaktanfrage von ${name}`;

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'work4palace Manufaktur <noreply@scholz-friese-webdesign.de>',
        to: 'info@scholz-friese-webdesign.de',
        reply_to: email,
        subject: subject,
        html: `
          <!DOCTYPE html>
          <html lang="de">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Neue Anfrage</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #12110f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; -webkit-font-smoothing: antialiased;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #12110f; padding: 40px 10px;">
              <tr>
                <td align="center">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #1c1a17; border: 1px solid rgba(184, 105, 69, 0.18); overflow: hidden; box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);">

                    <!-- HEADER -->
                    <tr>
                      <td style="background-color: #b86945; padding: 35px 30px; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                        <h1 style="margin: 0; font-family: Georgia, serif; font-size: 26px; letter-spacing: 0.12em; color: #faf6ee; text-transform: uppercase; font-weight: 400;">work4palace</h1>
                        <p style="margin: 6px 0 0 0; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(250, 246, 238, 0.75); font-weight: 500;">Manufaktur für exklusive Sanierungen</p>
                      </td>
                    </tr>

                    <!-- CONTENT -->
                    <tr>
                      <td style="padding: 45px 35px;">
                        <p style="font-family: Georgia, serif; font-size: 21px; color: #faf6ee; margin: 0 0 15px 0; font-style: italic;">Hallo Tina,</p>
                        <p style="color: #9f9b93; font-size: 14.5px; line-height: 1.65; margin: 0 0 30px 0; font-weight: 300;">
                          über die Website wurde eine neue ${isPlanner ? 'Projektkonfiguration' : 'Kontaktanfrage'} übermittelt. Hier sind die erfassten Details:
                        </p>

                        <!-- DETAILS TABLE -->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 35px; border-collapse: collapse; border: 1px solid rgba(255, 255, 255, 0.05);">
                          <tr>
                            <td style="padding: 14px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-weight: 600; color: #b86945; width: 38%; text-transform: uppercase; font-size: 10.5px; letter-spacing: 0.08em; padding-top: 15px;">Quelle</td>
                            <td style="padding: 14px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); color: #faf6ee; font-weight: 300;"><strong>${isPlanner ? 'Digitaler Projekt-Konfigurator' : 'Kontaktformular'}</strong></td>
                          </tr>
                          <tr>
                            <td style="padding: 14px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-weight: 600; color: #b86945; width: 38%; text-transform: uppercase; font-size: 10.5px; letter-spacing: 0.08em; padding-top: 15px;">Kunde / Name</td>
                            <td style="padding: 14px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); color: #faf6ee; font-weight: 300;">${name}</td>
                          </tr>
                          <tr>
                            <td style="padding: 14px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-weight: 600; color: #b86945; width: 38%; text-transform: uppercase; font-size: 10.5px; letter-spacing: 0.08em; padding-top: 15px;">E-Mail</td>
                            <td style="padding: 14px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); color: #faf6ee; font-weight: 300;"><a href="mailto:${email}" style="color: #b86945; text-decoration: none;">${email}</a></td>
                          </tr>
                          ${phone ? `
                          <tr>
                            <td style="padding: 14px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-weight: 600; color: #b86945; width: 38%; text-transform: uppercase; font-size: 10.5px; letter-spacing: 0.08em; padding-top: 15px;">Telefon</td>
                            <td style="padding: 14px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); color: #faf6ee; font-weight: 300;"><a href="tel:${phone}" style="color: #faf6ee; text-decoration: none; font-weight: 400;">${phone}</a></td>
                          </tr>
                          ` : ''}
                          <tr>
                            <td style="padding: 14px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-weight: 600; color: #b86945; width: 38%; text-transform: uppercase; font-size: 10.5px; letter-spacing: 0.08em; padding-top: 15px;">Gewerk / Leistung</td>
                            <td style="padding: 14px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); color: #faf6ee; font-weight: 300;">${projectType}</td>
                          </tr>
                          ${isPlanner ? `
                          <tr>
                            <td style="padding: 14px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-weight: 600; color: #b86945; width: 38%; text-transform: uppercase; font-size: 10.5px; letter-spacing: 0.08em; padding-top: 15px;">Projektgröße</td>
                            <td style="padding: 14px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); color: #faf6ee; font-weight: 300;">${scopeSize || '-'}</td>
                          </tr>
                          <tr>
                            <td style="padding: 14px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-weight: 600; color: #b86945; width: 38%; text-transform: uppercase; font-size: 10.5px; letter-spacing: 0.08em; padding-top: 15px;">Ort des Objekts</td>
                            <td style="padding: 14px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); color: #faf6ee; font-weight: 300;">${location || '-'}</td>
                          </tr>
                          <tr>
                            <td style="padding: 14px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-weight: 600; color: #b86945; width: 38%; text-transform: uppercase; font-size: 10.5px; letter-spacing: 0.08em; padding-top: 15px;">Wunschzeitraum</td>
                            <td style="padding: 14px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); color: #faf6ee; font-weight: 300;">${timeframe || '-'}</td>
                          </tr>
                          ` : ''}
                        </table>

                        ${message ? `
                        <!-- MESSAGE BOX -->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: rgba(184, 105, 69, 0.02); border-left: 2px solid #b86945;">
                          <tr>
                            <td style="padding: 22px 25px;">
                              <p style="font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.12em; color: #b86945; margin: 0 0 12px 0; font-weight: 600;">Bauvorhaben Beschreibung</p>
                              <p style="font-style: italic; color: #faf6ee; font-size: 14px; line-height: 1.7; margin: 0; font-weight: 300;">"${message.replace(/\n/g, '<br>')}"</p>
                            </td>
                          </tr>
                        </table>
                        ` : ''}
                      </td>
                    </tr>

                    <!-- FOOTER -->
                    <tr>
                      <td style="background-color: #12110f; padding: 30px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.04); font-size: 11px; color: #5a5750; line-height: 1.6;">
                        Diese Anfrage wurde automatisch über das Webportal <a href="https://work4palace.de" style="color: #b86945; text-decoration: none;">work4palace.de</a> generiert.<br>
                        Technischer Partner: <strong>Scholz & Friese Webdesign Agentur</strong>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      }),
    });

    if (!resendResponse.ok) {
      const errData = await resendResponse.json();
      return new Response(JSON.stringify({ success: false, message: 'Fehler beim E-Mail-Versand.', error: errData }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, message: 'Anfrage erfolgreich übermittelt!' }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: 'Serverfehler.', error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
