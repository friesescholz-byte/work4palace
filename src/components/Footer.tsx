import React from "react";
import { ArrowUp } from "lucide-react";

interface FooterProps {
  onPageChange: (page: string) => void;
  onImpressumClick: () => void;
  onDatenschutzClick: () => void;
}

const Footer: React.FC<FooterProps> = ({
  onPageChange,
  onImpressumClick,
  onDatenschutzClick
}) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer style={footerStyle} className="section-dark">
      <div className="container">
        {/* Upper Footer: Brand & Navigation */}
        <div style={topRowStyle}>
          <div style={brandColStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <img
                src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/work4palace/work4palace%20logo_transparent.png"
                alt=""
                className="logo-white"
                style={logoStyle}
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <span style={logoTextStyle}>
                work4palace
              </span>
            </div>
            <p style={brandDescStyle}>
              work4palace UG steht für hochwertige Sanierungsarbeiten, natürliche Materialien und saubere handwerkliche Ausführung – vom ersten Rückbau bis zur fertigen Oberfläche.
            </p>
          </div>

          <div style={linksColStyle}>
            <h4 style={colTitleStyle}>Manufaktur</h4>
            <ul style={listStyle}>
              <li><button onClick={() => onPageChange("home")} style={linkStyle}>Startseite</button></li>
              <li><button onClick={() => onPageChange("services")} style={linkStyle}>Leistungen</button></li>
              <li><button onClick={() => onPageChange("about")} style={linkStyle}>Über uns</button></li>
              <li><button onClick={() => onPageChange("contact")} style={linkStyle}>Kontakt</button></li>
            </ul>
          </div>

          <div style={linksColStyle}>
            <h4 style={colTitleStyle}>Kontakt</h4>
            <ul style={listStyle}>
              <li style={listItemStyle}>Tina Heinecke</li>
              <li style={listItemStyle}>Erlenweg 7, 31600 Uchte</li>
              <li style={listItemStyle}><a href="tel:05763425622" style={valueLinkStyle}>05763-425622</a></li>
              <li style={listItemStyle}><a href="mailto:moin@work4palace.de" style={valueLinkStyle}>moin@work4palace.de</a></li>
            </ul>
          </div>
        </div>

        {/* Lower Footer: Copyright & Legal Links */}
        <div style={bottomRowStyle}>
          <div style={copyrightStyle}>
            <span>&copy; {currentYear} work4palace UG (haftungsbeschränkt). Alle Rechte vorbehalten.</span>
            <span style={designerStyle}>
              Gestaltet von <a href="#" style={{ color: "var(--primary)", fontWeight: 500 }}>Scholz & Friese</a>
            </span>
          </div>

          <div style={legalLinksStyle}>
            <button onClick={onImpressumClick} style={legalBtnStyle}>Impressum</button>
            <span style={bulletStyle}>&bull;</span>
            <button onClick={onDatenschutzClick} style={legalBtnStyle}>Datenschutz</button>
            <span style={bulletStyle}>&bull;</span>
            <button onClick={() => onPageChange("accessibility")} style={legalBtnStyle}>Barrierefreiheit</button>
            <span style={bulletStyle}>&bull;</span>
            <button onClick={scrollToTop} style={scrollTopBtnStyle}>
              Nach oben <ArrowUp size={14} style={{ marginLeft: "0.25rem" }} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* Styles */
const footerStyle: React.CSSProperties = {
  backgroundColor: "var(--bg-dark-soft)",
  borderTop: "1px solid var(--border-light)",
  padding: "6rem 0 3rem 0"
};

const topRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "3rem",
  marginBottom: "4rem"
};

const brandColStyle: React.CSSProperties = {
  flex: "1 1 400px",
  display: "flex",
  flexDirection: "column"
};

const logoStyle: React.CSSProperties = {
  height: "28px",
  width: "auto",
  objectFit: "contain",
  borderRadius: 0
};

const logoTextStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "1.25rem",
  color: "var(--text-light)",
  letterSpacing: "0.06em",
  fontWeight: 500,
  lineHeight: 1
};

const brandDescStyle: React.CSSProperties = {
  fontSize: "0.95rem",
  color: "var(--text-muted-light)",
  lineHeight: "1.7",
  maxWidth: "380px"
};

const linksColStyle: React.CSSProperties = {
  flex: "1 1 180px",
  display: "flex",
  flexDirection: "column"
};

const colTitleStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.85rem",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  color: "var(--primary)",
  fontWeight: 600,
  marginBottom: "1.75rem"
};

const listStyle: React.CSSProperties = {
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: "1rem"
};

const linkStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "var(--text-muted-light)",
  fontFamily: "var(--font-sans)",
  fontSize: "0.9rem",
  textAlign: "left",
  cursor: "pointer",
  transition: "var(--transition-fast)",
  padding: 0
};

const listItemStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.9rem",
  color: "var(--text-muted-light)"
};

const valueLinkStyle: React.CSSProperties = {
  color: "var(--text-muted-light)",
  transition: "var(--transition-fast)"
};

/* Register Info Section */
/* Copyright & bottom row */
const bottomRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "1.5rem"
};

const copyrightStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.8rem",
  color: "var(--text-muted-light)",
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem"
};

const designerStyle: React.CSSProperties = {
  opacity: 0.8
};

const legalLinksStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  flexWrap: "wrap"
};

const legalBtnStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "var(--text-muted-light)",
  fontFamily: "var(--font-sans)",
  fontSize: "0.8rem",
  cursor: "pointer",
  transition: "var(--transition-fast)",
  padding: 0
};

const bulletStyle: React.CSSProperties = {
  color: "var(--border-light)",
  fontSize: "0.8rem"
};

const scrollTopBtnStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "var(--primary)",
  fontFamily: "var(--font-sans)",
  fontSize: "0.8rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  display: "inline-flex",
  alignItems: "center",
  cursor: "pointer",
  transition: "var(--transition-fast)"
};

const styleTag = document.createElement("style");
styleTag.innerHTML = `
  footer button:hover, footer a:hover {
    color: var(--text-light) !important;
  }
`;
document.head.appendChild(styleTag);

export default Footer;
