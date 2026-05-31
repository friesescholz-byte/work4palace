import React from "react";

const DatenschutzPage: React.FC = () => {
  return (
    <div className="page-container" style={{ backgroundColor: "var(--bg-light)" }}>
      {/* Header padding offset */}
      <div style={{ height: "80px" }}></div>

      <section className="section section-light" style={{ padding: "8rem 0" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <span className="section-eyebrow">Rechtliches</span>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "3.5rem", color: "var(--text-dark)", marginBottom: "3rem" }}>
            Datenschutzerklärung
          </h1>

          <div style={contentBlockStyle}>
            <h2 style={sectionTitleStyle}>1. Datenschutz auf einen Blick</h2>
            <h3 style={subTitleStyle}>Allgemeine Hinweise</h3>
            <p style={paragraphStyle}>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen sich unserer unter diesem Text aufgeführten Datenschutzerklärung.
            </p>

            <h3 style={subTitleStyle}>Datenerfassung auf dieser Website</h3>
            <p style={paragraphStyle}>
              <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
            </p>
            <p style={paragraphStyle}>
              <strong>Wie erfassen wir Ihre Daten?</strong><br />
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in unser Kontaktformular oder den Projekt-Konfigurator eingeben (inklusive hochgeladener Bilder).
            </p>
            <p style={paragraphStyle}>
              Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
            </p>

            <h2 style={sectionTitleStyle}>2. Allgemeine Hinweise und Pflichtinformationen</h2>
            <h3 style={subTitleStyle}>Datenschutz</h3>
            <p style={paragraphStyle}>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
            <p style={paragraphStyle}>
              Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Diese Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
            </p>

            <h3 style={subTitleStyle}>Hinweis zur verantwortlichen Stelle</h3>
            <p style={paragraphStyle}>
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br />
              <strong>work4palace UG (haftungsbeschränkt)</strong><br />
              Erlenweg 7<br />
              31600 Uchte<br />
              Telefon: 05763 - 425622<br />
              E-Mail: moin@work4palace.de
            </p>

            <h3 style={subTitleStyle}>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
            <p style={paragraphStyle}>
              Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
            </p>

            <h2 style={sectionTitleStyle}>3. Datenerfassung auf dieser Website</h2>
            <h3 style={subTitleStyle}>Kontaktformular & Projekt-Konfigurator</h3>
            <p style={paragraphStyle}>
              Wenn Sie uns per Kontaktformular oder über den Konfigurator Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten (sowie optionaler Fotos und Grundrisse) zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p style={paragraphStyle}>
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) falls diese abgefragt wurde.
            </p>

            <h3 style={subTitleStyle}>Lokales Content-Management (CMS)</h3>
            <p style={paragraphStyle}>
              Unsere Bildergalerie und unser CMS-Dashboard speichern Ihre vorgenommenen Anpassungen und hochgeladenen Bilddateien (Base64) ausschließlich **lokal im Speicher Ihres eigenen Webbrowsers (mittels localStorage)**. Es findet keine serverseitige Übertragung oder Speicherung dieser CMS-Bilder auf unsere IT-Systeme statt. Sie behalten die volle Kontrolle über Ihre hochgeladenen Referenzbilder auf Ihrem Endgerät.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

/* Styles */
const contentBlockStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  marginTop: "2rem"
};

const sectionTitleStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "1.5rem",
  color: "var(--text-dark)",
  borderBottom: "1px solid var(--border-dark)",
  paddingBottom: "0.5rem",
  marginTop: "1.5rem"
};

const subTitleStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "1.15rem",
  color: "var(--text-dark)",
  marginTop: "0.5rem"
};

const paragraphStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "1rem",
  color: "var(--text-muted-dark)",
  lineHeight: "1.7",
  fontWeight: 300
};

export default DatenschutzPage;
