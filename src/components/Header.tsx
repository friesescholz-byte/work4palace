import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Phone } from "lucide-react";

interface HeaderProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, onPageChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Startseite", value: "home" },
    { label: "Leistungen", value: "services" },
    { label: "Projektbeispiele", value: "portfolio" },
    { label: "Über uns", value: "about" },
    { label: "Kontakt", value: "contact" }
  ];

  return (
    <header
      className={`nav-header ${isScrolled || activePage !== "home" ? "scrolled" : ""}`}
      style={isScrolled || activePage !== "home" ? undefined : headerTransparentStyle}
    >
      <div className="container" style={containerStyle}>
        {/* Left: Branding (Logo + Elegant Serif Text) */}
        <button 
          onClick={() => {
            setMobileMenuOpen(false);
            onPageChange("home");
          }} 
          style={logoWrapperStyle}
        >
          <img
            src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/work4palace/work4palace%20logo_transparent.png"
            alt=""
            className="logo-white"
            style={logoStyle}
            onError={(e) => {
              // Hide image fallback if broken or solid white block
              (e.target as HTMLElement).style.display = "none";
            }}
          />
          <span style={logoTextStyle}>
            work4palace
          </span>
        </button>

        {/* Center: Desktop Navigation */}
        <nav style={desktopNavStyle}>
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setMobileMenuOpen(false);
                onPageChange(item.value);
              }}
              style={{
                ...navLinkStyle,
                color: activePage === item.value ? "var(--primary)" : "var(--text-muted-light)",
                fontWeight: activePage === item.value ? 600 : 400
              }}
              className={`nav-link ${activePage === item.value ? "active-nav-link" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right: Desktop CTA & Phone Number */}
        <div style={desktopCtaStyle}>
          <a
            href="tel:05763425622"
            className="header-phone-link"
            style={phoneLinkStyle}
          >
            <Phone size={13} style={{ marginRight: "0.45rem", color: "var(--primary)" }} />
            05763 - 425622
          </a>
          <button
            className="btn btn-secondary"
            onClick={() => onPageChange("contact")}
            style={{ padding: "0.65rem 1.5rem", fontSize: "0.8rem", letterSpacing: "0.08em" }}
          >
            Projekt anfragen
          </button>
        </div>

        {/* Mobile Hamburger Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={hamburgerStyle}
          aria-label="Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} color="var(--text-light)" /> : <Menu size={24} color="var(--text-light)" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={mobileMenuDrawerStyle}
          >
            <div className="container" style={mobileMenuContainerStyle}>
              {menuItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onPageChange(item.value);
                  }}
                  style={{
                    ...mobileNavLinkStyle,
                    color: activePage === item.value ? "var(--primary)" : "var(--text-light)"
                  }}
                >
                  {item.label}
                </button>
              ))}
              <button
                className="btn btn-primary"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onPageChange("contact");
                }}
                style={mobileCtaStyle}
              >
                Jetzt Sanierung Planen
                <ArrowRight size={16} style={{ marginLeft: "0.5rem" }} />
              </button>
              
              <a
                href="tel:05763425622"
                style={mobilePhoneLinkStyle}
              >
                <Phone size={16} style={{ marginRight: "0.6rem", color: "var(--primary)" }} />
                Tel: 05763 - 425622
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

/* Styles */
const headerTransparentStyle: React.CSSProperties = {
  background: "transparent",
  borderBottom: "1px solid transparent",
  padding: "1.75rem 0"
};

const containerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
};

const logoWrapperStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 0
};

const logoStyle: React.CSSProperties = {
  height: "36px",
  width: "auto",
  objectFit: "contain",
  borderRadius: 0,
  backgroundColor: "transparent"
};

const logoTextStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "1.5rem",
  color: "var(--text-light)",
  letterSpacing: "0.06em",
  fontWeight: 500,
  lineHeight: 1
};

const desktopNavStyle: React.CSSProperties = {
  display: "flex",
  gap: "3rem",
  alignItems: "center"
};

const navLinkStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  fontFamily: "var(--font-sans)",
  fontSize: "0.85rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  cursor: "pointer",
  transition: "var(--transition-fast)"
};

const desktopCtaStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1.75rem"
};

const phoneLinkStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.9rem",
  fontWeight: 600,
  color: "var(--text-light)",
  display: "inline-flex",
  alignItems: "center",
  transition: "var(--transition-fast)",
  textDecoration: "none"
};

const mobilePhoneLinkStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "1.1rem",
  fontWeight: 600,
  color: "var(--text-light)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.75rem 0",
  marginTop: "0.5rem",
  textDecoration: "none"
};

const hamburgerStyle: React.CSSProperties = {
  display: "none",
  background: "none",
  border: "none",
  cursor: "pointer",
  zIndex: 1001
};

const mobileMenuDrawerStyle: React.CSSProperties = {
  position: "absolute",
  top: "100%",
  left: 0,
  width: "100%",
  backgroundColor: "var(--bg-dark)",
  borderBottom: "1px solid var(--border-light)",
  overflow: "hidden",
  zIndex: 999
};

const mobileMenuContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  padding: "2rem 0",
  gap: "1.5rem"
};

const mobileNavLinkStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  fontFamily: "var(--font-sans)",
  fontSize: "1.2rem",
  fontWeight: 400,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  textAlign: "left",
  padding: "0.5rem 0",
  cursor: "pointer",
  borderBottom: "1px solid var(--border-light)"
};

const mobileCtaStyle: React.CSSProperties = {
  width: "100%",
  marginTop: "1rem"
};

const styleTag = document.createElement("style");
styleTag.innerHTML = `
  .nav-link:hover {
    color: var(--text-light) !important;
  }
  .header-phone-link:hover {
    color: var(--primary) !important;
  }
  @media (max-width: 900px) {
    .nav-header nav, .nav-header div:nth-child(3) {
      display: none !important;
    }
    .nav-header button[aria-label="Navigation Menu"] {
      display: block !important;
    }
  }
`;
document.head.appendChild(styleTag);

export default Header;
