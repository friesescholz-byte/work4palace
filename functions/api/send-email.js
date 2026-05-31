export async function onRequestPost(context) {
  const { request, env } = context;
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const data = await request.json();
    const { name, email, phone, projectType, message, formType, scopeSize, location, timeframe } = data;

    // Retrieve Resend API Key from Cloudflare environment, fallback to the pre-configured key
    const apiKey = env.RESEND_API_KEY || "re_23WnEvZS_MiA7sHvE1HVkZC5TDV7TeqXi";

    if (!name || !email) {
      return new Response(JSON.stringify({ success: false, message: "Name und E-Mail sind Pflichtfelder." }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Dynamic email subject based on the sender form
    const isPlanner = formType === "planner";
    const subject = isPlanner 
      ? `🏛️ Neue Projektkonfiguration von ${name}`
      : `✉️ Neue Kontaktanfrage von ${name}`;

    // Exquisite Scholz & Friese quiet luxury HTML email template matching work4palace aesthetics
    const emailHtml = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Neue Anfrage</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #12110f;
      color: #faf6ee;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      background-color: #12110f;
      padding: 40px 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #1c1a17;
      border: 1px solid rgba(184, 105, 69, 0.18);
      border-radius: 0;
      overflow: hidden;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
    }
    .header {
      background-color: #b86945;
      padding: 35px 30px;
      text-align: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      position: relative;
    }
    .header-logo {
      font-family: Georgia, serif;
      font-size: 26px;
      letter-spacing: 0.12em;
      color: #faf6ee;
      margin: 0;
      text-transform: uppercase;
      font-weight: 400;
    }
    .header-sub {
      font-size: 10px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: rgba(250, 246, 238, 0.75);
      margin-top: 6px;
      font-weight: 500;
    }
    .content {
      padding: 45px 35px;
    }
    .greeting {
      font-family: Georgia, serif;
      font-size: 21px;
      color: #faf6ee;
      margin-bottom: 15px;
      font-style: italic;
    }
    .intro-text {
      color: #9f9b93;
      font-size: 14.5px;
      line-height: 1.65;
      margin-bottom: 30px;
      font-weight: 300;
    }
    .details-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 35px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .details-table td {
      padding: 14px 18px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      font-size: 13.5px;
      vertical-align: top;
    }
    .details-table tr:last-child td {
      border-bottom: none;
    }
    .details-label {
      font-weight: 600;
      color: #b86945;
      width: 38%;
      text-transform: uppercase;
      font-size: 10.5px;
      letter-spacing: 0.08em;
      padding-top: 15px;
    }
    .details-value {
      color: #faf6ee;
      font-weight: 300;
    }
    .message-box {
      background-color: rgba(184, 105, 69, 0.02);
      border-left: 2px solid #b86945;
      padding: 22px 25px;
      margin-top: 25px;
    }
    .message-title {
      font-size: 10.5px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #b86945;
      margin-bottom: 12px;
      font-weight: 600;
    }
    .message-text {
      font-style: italic;
      color: #faf6ee;
      font-size: 14px;
      line-height: 1.7;
      margin: 0;
      font-weight: 300;
    }
    .footer {
      background-color: #12110f;
      padding: 30px;
      text-align: center;
      border-top: 1px solid rgba(255, 255, 255, 0.04);
      font-size: 11px;
      color: #5a5750;
      line-height: 1.6;
    }
    .footer a {
      color: #b86945;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1 class="header-logo">work4palace</h1>
        <div class="header-sub">Manufaktur für exklusive Sanierungen</div>
      </div>
      <div class="content">
        <div class="greeting">Hallo Tina,</div>
        <p class="intro-text">
          über Ihre Website wurde eine neue Projektanfrage übermittelt. Hier sind die erfassten Details für Ihr Erstgespräch:
        </p>
        
        <table class="details-table">
          <tr>
            <td class="details-label">Quelle</td>
            <td class="details-value"><strong>${isPlanner ? "Digitaler Projekt-Konfigurator" : "Kontaktformular"}</strong></td>
          </tr>
          <tr>
            <td class="details-label">Kunde / Name</td>
            <td class="details-value">${name}</td>
          </tr>
          <tr>
            <td class="details-label">E-Mail</td>
            <td class="details-value"><a href="mailto:${email}" style="color: #b86945; text-decoration: none;">${email}</a></td>
          </tr>
          ${phone ? `
          <tr>
            <td class="details-label">Telefon</td>
            <td class="details-value"><a href="tel:${phone}" style="color: #faf6ee; text-decoration: none; font-weight: 400;">${phone}</a></td>
          </tr>
          ` : ''}
          <tr>
            <td class="details-label">Gewerk / Leistung</td>
            <td class="details-value">${projectType}</td>
          </tr>
          ${isPlanner ? `
          <tr>
            <td class="details-label">Projektgröße</td>
            <td class="details-value">${scopeSize || '-'}</td>
          </tr>
          <tr>
            <td class="details-label">Ort des Objekts</td>
            <td class="details-value">${location || '-'}</td>
          </tr>
          <tr>
            <td class="details-label">Wunschzeitraum</td>
            <td class="details-value">${timeframe || '-'}</td>
          </tr>
          ` : ''}
        </table>

        ${message ? `
        <div class="message-box">
          <div class="message-title">Bauvorhaben Beschreibung</div>
          <p class="message-text">"${message.replace(/\n/g, '<br>')}"</p>
        </div>
        ` : ''}
      </div>
      <div class="footer">
        Diese Anfrage wurde automatisch über das Webportal <a href="https://work4palace.de">work4palace.de</a> generiert.<br>
        Technischer Partner: <strong>Scholz & Friese Webdesign Agentur</strong>
      </div>
    </div>
  </div>
</body>
</html>
    `;

    // Send the email via Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'work4palace Manufaktur <anfragen@scholz-friese-webdesign.de>',
        to: 'info@scholz-friese-webdesign.de', // Destination email
        subject: subject,
        html: emailHtml,
        reply_to: email, // Allows direct replies to the customer email
      }),
    });

    if (!resendResponse.ok) {
      const errText = await resendResponse.text();
      return new Response(JSON.stringify({ success: false, message: "E-Mail-Versand fehlgeschlagen.", error: errText }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true, message: "E-Mail erfolgreich übermittelt." }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "Server-Fehler.", error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
