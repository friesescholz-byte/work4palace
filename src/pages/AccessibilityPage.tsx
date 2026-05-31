import React from "react";
import { CheckCircle2, Eye } from "lucide-react";

interface AccessibilityPageProps {
  highContrast: boolean;
  onContrastToggle: (active: boolean) => void;
}

const AccessibilityPage: React.FC<AccessibilityPageProps> = ({
  highContrast,
  onContrastToggle
}) => {
  return (
    <div className="page-container" style={{ backgroundColor: "var(--bg-light)" }}>
      {/* Header padding offset */}
      <div style={{ height: "80px" }}></div>

      <section className="section section-light" style={{ padding: "8rem 0" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <span className="section-eyebrow">Inklusion & Standard</span>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "3.5rem", color: "var(--text-dark)", marginBottom: "3rem" }}>
            Erklärung zur Barrierefreiheit
          </h1>

          {/* Premium Interactive Accessibility Assistant Dashboard */}
          <div style={dashboardCardStyle} className="a11y-dashboard">
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.45rem", color: "var(--text-dark)", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-dark)", paddingBottom: "0.75rem" }}>
              Barrierefreiheits-Assistent
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--text-muted-dark)", lineHeight: "1.6", marginBottom: "2rem", fontWeight: 300 }}>
              Aktivieren Sie den Kontrast-Assistenten, um die visuelle Lesbarkeit dieser Website optimal an Ihre Bedürfnisse anzupassen. Ihre Einstellungen werden DSGVO-konform direkt in Ihrem Browser gespeichert.
            </p>

            <div style={{ maxWidth: "450px", margin: "0 auto" }}>
              {/* Control: High Contrast Toggle */}
              <div style={controlCardStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", justifyContent: "center" }}>
                  <Eye size={22} color="var(--primary)" />
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: "var(--text-dark)" }}>Kontrast-Modus</h3>
                </div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted-dark)", marginBottom: "1.5rem", lineHeight: "1.5", textAlign: "center" }}>
                  Schalten Sie auf ein kontrastreiches Farbschema für maximale Textabgrenzung bei Sehschwächen.
                </p>
                <button
                  onClick={() => onContrastToggle(!highContrast)}
                  aria-pressed={highContrast}
                  aria-label={highContrast ? "Kontrastmodus deaktivieren" : "Kontrastmodus aktivieren"}
                  style={{
                    ...btnOptionStyle,
                    width: "100%",
                    backgroundColor: highContrast ? "var(--primary)" : "transparent",
                    color: highContrast ? "var(--text-light)" : "var(--text-dark)",
                    borderColor: highContrast ? "var(--primary)" : "var(--text-muted-dark)",
                    fontWeight: highContrast ? 600 : 400
                  }}
                >
                  {highContrast ? "Kontrastmodus aktiv ✓" : "Kontrastmodus aktivieren"}
                </button>
              </div>
            </div>
          </div>

          <div style={contentBlockStyle}>
            <h2 style={sectionTitleStyle}>Rechtliche Erklärung zur Barrierefreiheit</h2>
            <p style={paragraphStyle}>
              Als zukunftsorientiertes Unternehmen legt die work4palace UG großen Wert darauf, dass diese Website für alle Menschen uneingeschränkt zugänglich ist. Wir sind bestrebt, unsere Web-Angebote barrierefrei im Einklang mit den nationalen Rechtsvorschriften zur Umsetzung der Richtlinie (EU) 2016/2102 des Europäischen Parlaments und des Rates barrierefrei zugänglich zu machen.
            </p>

            <h2 style={sectionTitleStyle}>Stand der Vereinbarkeit mit den Anforderungen</h2>
            <p style={paragraphStyle}>
              Diese Website ist mit den Richtlinien für barrierefreie Webinhalte (WCAG 2.1) auf der Stufe AA vollständig vereinbar. Wir integrieren dazu:
            </p>

            <ul style={a11yListStyle}>
              <li style={a11yListItemStyle}>
                <CheckCircle2 size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: "0.25rem" }} />
                <span><strong>Volle Tastatur-Navigation:</strong> Die gesamte Website lässt sich nahtlos und logisch strukturiert per Tabulatortaste steuern, unterstützt durch deutlich sichtbare, terracottafarbene Fokus-Indikatoren.</span>
              </li>
              <li style={a11yListItemStyle}>
                <CheckCircle2 size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: "0.25rem" }} />
                <span><strong>Ausführliche ARIA-Kennzeichnung:</strong> Alle interaktiven Elemente besitzen eindeutige ARIA-Attribute (`aria-label`, `aria-pressed`, `aria-expanded`), um Screenreadern eine präzise akustische Übersetzung zu garantieren.</span>
              </li>
              <li style={a11yListItemStyle}>
                <CheckCircle2 size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: "0.25rem" }} />
                <span><strong>DSGVO-konformes a11y-Cockpit:</strong> Der oben bereitgestellte Assistent erlaubt das Umschalten der Kontraste lokal im Browser, ohne Tracking oder Datenschutz-Einschränkungen.</span>
              </li>
              <li style={a11yListItemStyle}>
                <CheckCircle2 size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: "0.25rem" }} />
                <span><strong>Strikte semantische Struktur:</strong> Klare HTML5-Hierarchien (Nav, Main, Section, Footer) und eine streng sequenzielle Heading-Struktur (H1 bis H3) unterstützen automatische Vorlese-Systeme.</span>
              </li>
            </ul>

            <h2 style={sectionTitleStyle}>Rückmeldung und Kontakt</h2>
            <p style={paragraphStyle}>
              Haben Sie Mängel beim barrierefreien Zugang auf unserer Website festgestellt oder haben Sie Fragen? Schreiben Sie uns gerne eine E-Mail an <a href="mailto:moin@work4palace.de" style={linkStyle}>moin@work4palace.de</a> oder rufen Sie uns an unter <a href="tel:05763425622" style={linkStyle}>05763 - 425622</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

/* Styles */
const dashboardCardStyle: React.CSSProperties = {
  backgroundColor: "var(--bg-light-soft)",
  border: "1px solid var(--border-dark)",
  padding: "3rem",
  boxShadow: "var(--shadow-soft)",
  marginBottom: "4rem",
  position: "relative"
};

const controlCardStyle: React.CSSProperties = {
  backgroundColor: "var(--bg-light)",
  border: "1px solid var(--border-dark)",
  padding: "2.5rem 2rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
};

const btnOptionStyle: React.CSSProperties = {
  padding: "0.75rem 1.25rem",
  fontSize: "0.9rem",
  border: "1px solid",
  cursor: "pointer",
  transition: "var(--transition-fast)",
  fontFamily: "var(--font-sans)",
  background: "transparent"
};

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

const paragraphStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "1rem",
  color: "var(--text-muted-dark)",
  lineHeight: "1.7",
  fontWeight: 300
};

const a11yListStyle: React.CSSProperties = {
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: "1.25rem",
  margin: "1rem 0"
};

const a11yListItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: "1rem",
  fontFamily: "var(--font-sans)",
  fontSize: "1rem",
  color: "var(--text-muted-dark)",
  lineHeight: "1.6",
  fontWeight: 300
};

const linkStyle: React.CSSProperties = {
  color: "var(--primary)",
  fontWeight: 500,
  textDecoration: "none",
  transition: "var(--transition-fast)"
};

export default AccessibilityPage;
