import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, FileText } from "lucide-react";

interface LegalModalProps {
  isOpen: boolean;
  type: "impressum" | "datenschutz" | null;
  onClose: () => void;
}

const LegalModals: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <AnimatePresence>
      {isOpen && type && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={backdropStyle}
        >
          <motion.div
            initial={{ scale: 0.96, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 15 }}
            transition={{ duration: 0.5, ease }}
            onClick={(e) => e.stopPropagation()}
            style={modalCardStyle}
          >
            {/* Header */}
            <div style={modalHeaderStyle}>
              <div style={headerTitleGroupStyle}>
                {type === "impressum" ? (
                  <FileText size={20} color="var(--primary)" />
                ) : (
                  <ShieldCheck size={20} color="var(--primary)" />
                )}
                <h3 style={modalTitleStyle}>
                  {type === "impressum" ? "Impressum" : "Datenschutzerklärung"}
                </h3>
              </div>
              <button onClick={onClose} style={closeBtnStyle} aria-label="Schließen">
                <X size={20} color="var(--text-dark)" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div style={modalBodyStyle}>
              {type === "impressum" ? (
                <div>
                  <h4 style={sectionHeaderStyle}>Angaben gemäß § 5 TMG</h4>
                  <p style={pStyle}>
                    <strong>work4palace UG (haftungsbeschränkt)</strong><br />
                    Erlenweg 7<br />
                    31600 Uchte
                  </p>

                  <h4 style={sectionHeaderStyle}>Vertreten durch die Geschäftsführerin</h4>
                  <p style={pStyle}>Tina Heinecke</p>

                  <h4 style={sectionHeaderStyle}>Kontaktkanäle</h4>
                  <p style={pStyle}>
                    Telefon: 05763-425622<br />
                    E-Mail: <a href="mailto:moin@work4palace.de" style={linkStyle}>moin@work4palace.de</a>
                  </p>

                  <h4 style={sectionHeaderStyle}>Registereintragung</h4>
                  <p style={pStyle}>
                    Eintragung im Handelsregister.<br />
                    Registergericht: Amtsgericht Walsrode<br />
                    Registernummer: HRB 211183
                  </p>

                  <h4 style={sectionHeaderStyle}>Umsatzsteuer-ID</h4>
                  <p style={pStyle}>
                    Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                    DE361284432
                  </p>

                  <h4 style={sectionHeaderStyle}>Streitschlichtung</h4>
                  <p style={pStyle}>
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" style={linkStyle}>https://ec.europa.eu/consumers/odr</a>.<br />
                    Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                  </p>
                </div>
              ) : (
                <div>
                  <h4 style={sectionHeaderStyle}>1. Datenschutz auf einen Blick</h4>
                  <p style={pStyle}>
                    Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                  </p>

                  <h4 style={sectionHeaderStyle}>2. Datenerfassung auf unserer Website</h4>
                  <p style={pStyle}>
                    Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in unser Kontaktformular eingeben (Name, E-Mail-Adresse, Telefonnummer, Projektbeschreibung). Diese Daten nutzen wir ausschließlich zur Bearbeitung Ihrer individuellen Sanierungsanfrage.
                  </p>
                  <p style={pStyle}>
                    Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten, um eine fehlerfreie Bereitstellung der Website zu gewährleisten.
                  </p>

                  <h4 style={sectionHeaderStyle}>3. Hosting & Bereitstellung</h4>
                  <p style={pStyle}>
                    Diese Website wird über moderne, sichere Cloud-Infrastrukturen gehostet (wie GitHub Pages und Cloudflare CDN). Hierbei werden Datenströme verschlüsselt und Bilder direkt aus unserem geschützten R2-Objektspeicher geladen.
                  </p>

                  <h4 style={sectionHeaderStyle}>4. Ihre Rechte bezüglich Ihrer Daten</h4>
                  <p style={pStyle}>
                    Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenden Sie sich hierzu gern an <a href="mailto:moin@work4palace.de" style={linkStyle}>moin@work4palace.de</a>.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* Styles */
const backdropStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(18, 17, 15, 0.6)",
  backdropFilter: "blur(15px)",
  zIndex: 2000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem"
};

const modalCardStyle: React.CSSProperties = {
  maxWidth: "680px",
  width: "100%",
  backgroundColor: "var(--bg-light)",
  border: "1px solid var(--border-dark)",
  display: "flex",
  flexDirection: "column",
  maxHeight: "85vh",
  boxShadow: "var(--shadow-luxury)",
  color: "var(--text-dark)",
  borderRadius: 0
};

const modalHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "2rem 2.5rem",
  borderBottom: "1px solid var(--border-dark)"
};

const headerTitleGroupStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.75rem"
};

const modalTitleStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "1.75rem",
  color: "var(--text-dark)",
  margin: 0
};

const closeBtnStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.5rem"
};

const modalBodyStyle: React.CSSProperties = {
  padding: "2.5rem",
  overflowY: "auto",
  flexGrow: 1
};

const sectionHeaderStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.95rem",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "var(--primary)",
  fontWeight: 600,
  marginTop: "2rem",
  marginBottom: "0.75rem"
};

const pStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.95rem",
  lineHeight: "1.65",
  color: "var(--text-muted-dark)",
  marginBottom: "1.25rem",
  fontWeight: 300
};

const linkStyle: React.CSSProperties = {
  color: "var(--primary)",
  textDecoration: "underline",
  fontWeight: 500
};

export default LegalModals;
