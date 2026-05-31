import React from "react";

const ImpressumPage: React.FC = () => {
  return (
    <div className="page-container" style={{ backgroundColor: "var(--bg-light)" }}>
      {/* Header padding offset */}
      <div style={{ height: "80px" }}></div>

      <section className="section section-light" style={{ padding: "8rem 0" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <span className="section-eyebrow">Rechtliches</span>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "3.5rem", color: "var(--text-dark)", marginBottom: "3rem" }}>
            Impressum
          </h1>

          <div style={contentBlockStyle}>
            <h2 style={sectionTitleStyle}>Angaben gemäß § 5 TMG</h2>
            <p style={paragraphStyle}>
              <strong>work4palace UG (haftungsbeschränkt)</strong><br />
              Erlenweg 7<br />
              31600 Uchte
            </p>

            <h2 style={sectionTitleStyle}>Vertreten durch</h2>
            <p style={paragraphStyle}>
              Tina Heinecke (Geschäftsführerin)
            </p>

            <h2 style={sectionTitleStyle}>Kontakt</h2>
            <p style={paragraphStyle}>
              Telefon: <a href="tel:05763425622" style={linkStyle}>05763 - 425622</a><br />
              E-Mail: <a href="mailto:moin@work4palace.de" style={linkStyle}>moin@work4palace.de</a><br />
              Website: <a href="https://www.work4palace.de" style={linkStyle}>www.work4palace.de</a>
            </p>

            <h2 style={sectionTitleStyle}>Registereintrag</h2>
            <p style={paragraphStyle}>
              Eintragung im Handelsregister.<br />
              Registergericht: Amtsgericht Walsrode<br />
              Registernummer: HRB 211183
            </p>

            <h2 style={sectionTitleStyle}>Umsatzsteuer-ID</h2>
            <p style={paragraphStyle}>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              <strong>DE361284432</strong>
            </p>

            <h2 style={sectionTitleStyle}>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
            <p style={paragraphStyle}>
              Berufsbezeichnung: Bauunternehmen / Bautenträger (Verliehen in der Bundesrepublik Deutschland)<br />
              Zuständige Kammer: Handwerkskammer Hannover<br />
              Es gelten die folgenden berufsrechtlichen Regelungen: Handwerksordnung (HwO)
            </p>

            <h2 style={sectionTitleStyle}>Redaktionell verantwortlich</h2>
            <p style={paragraphStyle}>
              Tina Heinecke<br />
              Erlenweg 7<br />
              31600 Uchte
            </p>

            <h2 style={sectionTitleStyle}>Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
            <p style={paragraphStyle}>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
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
  fontSize: "1.4rem",
  color: "var(--text-dark)",
  borderBottom: "1px solid var(--border-dark)",
  paddingBottom: "0.5rem",
  marginTop: "1rem"
};

const paragraphStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "1rem",
  color: "var(--text-muted-dark)",
  lineHeight: "1.7",
  fontWeight: 300
};

const linkStyle: React.CSSProperties = {
  color: "var(--primary)",
  fontWeight: 500,
  textDecoration: "none",
  transition: "var(--transition-fast)"
};

export default ImpressumPage;
