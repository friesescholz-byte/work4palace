import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface ArchitecturalHeroProps {
  className?: string;
  onExploreClick?: () => void;
  onContactClick?: () => void;
}

const ArchitecturalHero: React.FC<ArchitecturalHeroProps> = ({
  onExploreClick,
  onContactClick
}) => {
  const ease = [0.16, 1, 0.3, 1] as const;

  const trustBullets = [
    { title: "Gefühl für Substanz", text: "Altbausanierung mit Respekt" },
    { title: "Hochwertige Oberflächen", text: "Kalkputz, Echtholz & Haptik" },
    { title: "Saubere Ausführung", text: "Vom Rückbau bis zum Finish" },
    { title: "Räume mit Charakter", text: "Wert & Wärme ausstrahlen" }
  ];

  // Motion variants for Staggered Reveal (The Scholz & Friese Intro)
  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const fadeDownVariant = {
    hidden: { opacity: 0, y: -25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease
      }
    }
  };

  // Spring animation for the central showcase viewport
  const showcaseVariant = {
    hidden: { opacity: 0, scale: 0.95, y: 35 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 65,
        damping: 18,
        delay: 0.35
      }
    }
  };

  // Staggered reveal for the 4 bullets inside the trust ribbon
  const trustRibbonContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.8
      }
    }
  };

  const trustBulletVariant = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease
      }
    }
  };

  return (
    <section className="hero-section" style={heroSectionStyle}>
      {/* Immersive Center-Aligned Blueprint drafting guidelines (SVG Animated) */}
      <svg className="hero-drafting-svg" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Horizontal center guideline */}
        <motion.line 
          x1="50" y1="520" x2="1390" y2="520" 
          stroke="rgba(184, 105, 69, 0.08)" 
          strokeDasharray="4 6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease, delay: 0.2 }}
        />
        {/* Vertical center guideline */}
        <motion.line 
          x1="720" y1="60" x2="720" y2="860" 
          stroke="rgba(46, 117, 186, 0.12)" /* Subtle blue guideline */
          strokeDasharray="4 6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease, delay: 0.2 }}
        />
        {/* Large Central Drafting Compass Ring (Concentric to video showcase) */}
        <motion.circle 
          cx="720" cy="520" r="320" 
          stroke="rgba(232, 216, 189, 0.03)" 
          strokeWidth="1"
          strokeDasharray="2 4"
          initial={{ pathLength: 0, rotate: -90 }}
          animate={{ pathLength: 1, rotate: 270 }}
          transition={{ duration: 2.2, ease, delay: 0.4 }}
        />
        {/* Secondary Concentric Compass Ring */}
        <motion.circle 
          cx="720" cy="520" r="180" 
          stroke="rgba(46, 117, 186, 0.06)" /* Subtle blue accent ring */
          strokeWidth="1"
          strokeDasharray="6 8"
          initial={{ pathLength: 0, rotate: 45 }}
          animate={{ pathLength: 1, rotate: -315 }}
          transition={{ duration: 2.4, ease, delay: 0.5 }}
        />
      </svg>

      {/* Technical coordinate labels removed for ultra-clean luxury canvas */}

      {/* Soft atmospheric terracotta ambient glows */}
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>

      <div className="container" style={{ zIndex: 5 }}>
        
        {/* 1. Centered Header Stack (Top-Centered) */}
        <motion.div 
          className="hero-header-stack"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.div className="hero-eyebrow-wrap centered" variants={fadeDownVariant}>
            <span className="eyebrow-dot"></span>
            <span className="section-eyebrow" style={{ marginBottom: 0 }}>Spezialist für exklusive Sanierungen</span>
            <span className="eyebrow-dot"></span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            style={headlineStyle}
            variants={fadeDownVariant}
            className="text-serif"
          >
            Sanierung mit Substanz.<br />
            <span className="text-gradient-blue-orange" style={{ position: "relative", display: "inline-block" }}>
              Räume mit Charakter.
              <span className="headline-underline-centered"></span>
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            style={sublineStyle}
            variants={fadeDownVariant}
          >
            Wir verbinden meisterhaftes Handwerk mit baubiologischer Verantwortung – vom schonenden Rückbau über atmungsaktive Mineralsysteme bis zum edlen Echtholzfinish.
          </motion.p>

          {/* Centered CTA Buttons */}
          <motion.div 
            style={btnGroupStyle}
            variants={fadeDownVariant}
          >
            <button 
              className="btn btn-primary" 
              onClick={onContactClick}
              style={{ padding: "1.1rem 2.25rem", boxShadow: "0 10px 25px rgba(184,105,69,0.12)" }}
            >
              Projekt anfragen
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={onExploreClick}
              style={{ padding: "1.1rem 2.25rem" }}
            >
              Arbeiten ansehen
            </button>
          </motion.div>
        </motion.div>

        {/* 2. Central Framed Architectural Video Showcase (16:9) */}
        <motion.div
          className="hero-showcase-viewport"
          variants={showcaseVariant}
          initial="hidden"
          animate="visible"
        >
          {/* Absolute corner drafting guidelines (expanding outwards) */}
          <div className="showcase-corner-lines">
            <span className="corner-line line-tl-h"></span>
            <span className="corner-line line-tl-v"></span>
            <span className="corner-line line-tr-h"></span>
            <span className="corner-line line-tr-v"></span>
            <span className="corner-line line-bl-h"></span>
            <span className="corner-line line-bl-v"></span>
            <span className="corner-line line-br-h"></span>
            <span className="corner-line line-br-v"></span>
          </div>

          {/* Corner tags and dimension lines removed for a clean floating canvas */}

          {/* Double border technical frame wrapper */}
          <div className="showcase-inner-frame">
            {/* Elegant slow motion mineral video - rendered sharp and natural inside double frame */}
            <video 
              src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Hintergrundvideo.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="showcase-video-element"
            />
            {/* Elegant vignette overlay */}
            <div className="showcase-vignette-overlay" />
          </div>
        </motion.div>

        {/* 3. Bottom Trust Foundation Ribbon (Directly below video showcase) */}
        <motion.div
          variants={trustRibbonContainer}
          initial="hidden"
          animate="visible"
          style={trustBannerStyle}
        >
          {trustBullets.map((bullet, idx) => (
            <motion.div 
              key={idx} 
              style={trustItemStyle}
              variants={trustBulletVariant}
            >
              <div style={iconBoxStyle}>
                <Star size={12} color="var(--primary)" fill="var(--primary)" />
              </div>
              <div style={trustTextsStyle}>
                <span style={trustTitleStyle}>{bullet.title}</span>
                <span style={trustDescStyle}>{bullet.text}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

/* React Inline Styles */
const heroSectionStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  minHeight: "120vh", /* Perfectly adjusted height for stacked centered elements */
  backgroundColor: "rgba(18, 17, 15, 0.85)", /* Translucent dark background matching other dark sections */
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  /* Exquisite, ultra-subtle radial modern terracotta light leak */
  background: "radial-gradient(circle at 50% 50%, rgba(184, 105, 69, 0.04) 0%, rgba(184, 105, 69, 0.015) 50%, transparent 100%), rgba(18, 17, 15, 0.85)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "9.5rem 0 7rem 0",
  zIndex: 2,
};

const headlineStyle: React.CSSProperties = {
  fontSize: "4rem",
  lineHeight: "1.15",
  letterSpacing: "-0.01em",
  marginBottom: "1.25rem",
  color: "var(--text-light)",
  textAlign: "center",
};

const sublineStyle: React.CSSProperties = {
  fontSize: "1.1rem",
  lineHeight: "1.7",
  color: "var(--text-muted-light)",
  marginBottom: "2.25rem",
  fontWeight: 300,
  maxWidth: "680px",
  textAlign: "center",
  marginLeft: "auto",
  marginRight: "auto",
};

const btnGroupStyle: React.CSSProperties = {
  display: "flex",
  gap: "1.5rem",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
};

const trustBannerStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  background: "rgba(28, 26, 23, 0.6)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid var(--border-light)",
  padding: "1.75rem 2rem",
  width: "100%",
  maxWidth: "960px", /* Fits perfectly aligned directly under the video showcase viewport width */
  margin: "0.5rem auto 0 auto",
  gap: "1.5rem",
  borderRadius: "4px",
  boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
  position: "relative",
  zIndex: 10,
};

const trustItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
};

const iconBoxStyle: React.CSSProperties = {
  width: "28px",
  height: "28px",
  borderRadius: "50%",
  backgroundColor: "rgba(184, 105, 69, 0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0
};

const trustTextsStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const trustTitleStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.85rem",
  fontWeight: 600,
  color: "var(--text-light)",
  lineHeight: 1.2
};

const trustDescStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.72rem",
  color: "var(--text-muted-light)",
  fontWeight: 300,
  marginTop: "0.15rem"
};

/* Scroll indicator removed to ensure clean technical alignment */

// Add styles tag containing beautiful CSS effects
const styleTag = document.createElement("style");
styleTag.innerHTML = `
  /* Centered header alignment */
  .hero-header-stack {
    max-width: 900px;
    margin: 0 auto 3.5rem auto;
    text-align: center;
    position: relative;
    z-index: 10;
  }

  /* Animated Drafting SVG background */
  .hero-drafting-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
  }

  /* Background drafting labels removed */

  /* Terracotta Glowing Ambient backgrounds */
  .ambient-glow {
    position: absolute;
    border-radius: 50%;
    filter: blur(140px);
    pointer-events: none;
    z-index: 2;
  }
  .glow-1 {
    width: 380px;
    height: 380px;
    background: rgba(184, 105, 69, 0.12);
    top: 15%;
    left: 10%;
  }
  .glow-2 {
    width: 380px;
    height: 380px;
    background: rgba(46, 117, 186, 0.14); /* Exquisite mineral blue ambient glow */
    bottom: 15%;
    right: 8%;
  }

  /* Eyebrow terracotta dot marker centered */
  .hero-eyebrow-wrap.centered {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    margin-bottom: 1.5rem;
  }
  .eyebrow-dot {
    width: 5px;
    height: 5px;
    background-color: var(--primary);
    border-radius: 50%;
    opacity: 0.75;
  }

  /* Centered Title premium underline */
  .headline-underline-centered {
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background-color: var(--primary);
  }

  /* ==========================================================================
     ARCHITECTURAL VIEWPORT SHOWCASE SYSTEM
     ========================================================================== */
  .hero-showcase-viewport {
    position: relative;
    max-width: 960px;
    width: 100%;
    aspect-ratio: 16/9;
    margin: 0 auto 3rem auto;
    border: 1px solid rgba(184, 105, 69, 0.32);
    background: rgba(18, 17, 15, 0.7);
    box-shadow: var(--shadow-luxury), 0 0 50px rgba(184, 105, 69, 0.04);
    border-radius: 4px;
    padding: 6px; /* Space for double-frame technical border */
    z-index: 10;
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease;
  }

  .hero-showcase-viewport:hover {
    border-color: rgba(184, 105, 69, 0.55);
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5), 0 0 60px rgba(184, 105, 69, 0.12);
    transform: translateY(-4px) scale(1.008);
  }

  .showcase-inner-frame {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 1px solid rgba(184, 105, 69, 0.15);
    border-radius: 2px;
  }

  /* Micro corner drafting extensions */
  .showcase-corner-lines {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 12;
  }
  .corner-line {
    position: absolute;
    background-color: rgba(184, 105, 69, 0.35);
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  /* Top Left corner crosshair */
  .line-tl-h { left: -30px; top: 5px; width: 30px; height: 1px; }
  .line-tl-v { left: 5px; top: -30px; width: 1px; height: 30px; }
  /* Top Right corner crosshair */
  .line-tr-h { right: -30px; top: 5px; width: 30px; height: 1px; }
  .line-tr-v { right: 5px; top: -30px; width: 1px; height: 30px; }
  /* Bottom Left corner crosshair */
  .line-bl-h { left: -30px; bottom: 5px; width: 30px; height: 1px; }
  .line-bl-v { left: 5px; bottom: -30px; width: 1px; height: 30px; }
  /* Bottom Right corner crosshair */
  .line-br-h { right: -30px; bottom: 5px; width: 30px; height: 1px; }
  .line-br-v { right: 5px; bottom: -30px; width: 1px; height: 30px; }

  /* Hover states for corners (bracket contraction/glides) */
  .hero-showcase-viewport:hover .corner-line {
    background-color: var(--primary);
  }
  .hero-showcase-viewport:hover .line-tl-h { left: -10px; }
  .hero-showcase-viewport:hover .line-tl-v { top: -10px; }
  .hero-showcase-viewport:hover .line-tr-h { right: -10px; }
  .hero-showcase-viewport:hover .line-tr-v { top: -10px; }
  .hero-showcase-viewport:hover .line-bl-h { left: -10px; }
  .hero-showcase-viewport:hover .line-bl-v { bottom: -10px; }
  .hero-showcase-viewport:hover .line-br-h { right: -10px; }
  .hero-showcase-viewport:hover .line-br-v { bottom: -10px; }

  /* Corner drafting data labels removed */

  /* Flashing live preview badge removed */

  /* Dimension bar styles removed */

  /* Video player media elements - sharp, clear and perfectly integrated */
  .showcase-video-element {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 2;
    opacity: 1; /* Completely sharp and natural opacity as requested */
    filter: brightness(0.88) contrast(1.04) saturate(0.95);
    transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease;
  }
  .hero-showcase-viewport:hover .showcase-video-element {
    transform: scale(1.01); /* Subtle, premium mechanical zoom */
    filter: brightness(0.95) contrast(1.05) saturate(1.0);
  }

  .showcase-vignette-overlay {
    position: absolute;
    inset: 0;
    z-index: 3;
    background: radial-gradient(
      circle at 50% 50%,
      transparent 30%,
      rgba(18, 17, 15, 0.15) 60%,
      rgba(18, 17, 15, 0.88) 100%
    );
    pointer-events: none;
  }

  /* Responsive layout overrides */
  @media (max-width: 1100px) {
    .hero-section {
      padding: 8.5rem 0 5rem 0;
      min-height: auto;
    }
    .hero-section div[style*="grid-template-columns"] {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 1.5rem !important;
      margin-top: 3rem !important;
      padding: 1.5rem !important;
    }
    .hero-showcase-viewport {
      margin-bottom: 2rem;
    }
  }

  @media (max-width: 768px) {
    .hero-section div[style*="grid-template-columns"] {
      grid-template-columns: 1fr !important;
      gap: 1.25rem !important;
      padding: 1.5rem 1rem !important;
    }
    h1 {
      font-size: 2.85rem !important;
    }
    /* Drafting tag overrides removed */
  }
`;
document.head.appendChild(styleTag);

export default ArchitecturalHero;
