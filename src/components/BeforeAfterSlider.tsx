import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowLeftRight } from "lucide-react";

interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
}

const projects: ProjectData[] = [
  {
    id: "bathroom",
    title: "Badsanierung im Altbau",
    subtitle: "Vom maroden Feuchtraum zur Wohlfühloase",
    description: "Komplette Sanierung eines historischen Badezimmers. Nach dem behutsamen Rückbau bauten wir den Wand- und Bodenaufbau vollkommen neu auf. Feuchtigkeitsschutz, edler Kalkputz für ein hervorragendes Raumklima und feine handwerkliche Oberflächen schaffen ruhigen Luxus.",
    beforeImg: "https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/work4palace/Bad%20vorher.jpg",
    afterImg: "https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/work4palace/Bad%20nachher%203.jpg",
    beforeLabel: "Ausgangszustand",
    afterLabel: "Vollendetes Badezimmer"
  },
  {
    id: "terrazzo",
    title: "Terrazzo-Bodenrestaurierung",
    subtitle: "Rettung historischer Substanz",
    description: "Terrazzo ist die Krönung der mineralischen Böden. Für dieses Projekt haben wir einen stark beschädigten, jahrzehntealten Terrazzoboden freigelegt, Risse und Fehlstellen aufwendig rekonstruiert und in mehreren Schleifgängen zu neuem, spiegelndem Glanz poliert.",
    beforeImg: "https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/work4palace/Terrazo%20alt.jpg",
    afterImg: "https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/work4palace/terrazzo%20neu.jpg",
    beforeLabel: "Beschädigter Stein",
    afterLabel: "Vollendeter Glanz"
  }
];

interface BeforeAfterSliderProps {
  onProjectsClick?: () => void;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ onProjectsClick }) => {
  const [activeProjIndex, setActiveProjIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeProj = projects[activeProjIndex];

  // Handle slider drag calculation
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  // Reset slider position on project switch
  const selectProject = (index: number) => {
    setSliderPosition(50);
    setActiveProjIndex(index);
  };

  return (
    <section className="section section-light" id="projects" style={{ borderBottom: "1px solid var(--border-dark)" }}>
      <div className="container">
        {/* Header */}
        <div style={headerStyle}>
          <span className="section-eyebrow">Transformation</span>
          <h2 className="section-title" style={{ color: "var(--text-dark)", maxWidth: "800px" }}>
            Manche Räume brauchen keine neue Hülle. Sondern eine neue Haltung.
          </h2>
          <p className="section-desc" style={{ color: "var(--text-muted-dark)", maxWidth: "700px" }}>
            Der Unterschied zwischen Renovierung und Sanierung zeigt sich im Ergebnis. Deshalb setzen wir auf echte Projektbilder, klare Verwandlungen und sichtbare Qualität. Vorher-/Nachher-Aufnahmen zeigen, wie aus alten, dunklen oder verbauten Räumen wieder hochwertige Wohnbereiche entstehen – mit Substanz, Wärme und Charakter.
          </p>

          {/* Toggle Switches */}
          <div style={toggleContainerStyle}>
            {projects.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => selectProject(idx)}
                className={`slider-toggle-btn ${activeProjIndex === idx ? "active-toggle" : ""}`}
                style={{
                  ...toggleBtnStyle,
                  backgroundColor: activeProjIndex === idx ? "#1e3c60" : "transparent",
                  color: activeProjIndex === idx ? "var(--text-light)" : "var(--text-dark)",
                  borderColor: activeProjIndex === idx ? "#1e3c60" : "var(--border-dark)"
                }}
              >
                {proj.title}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Project Presentation Grid */}
        <div style={mainGridStyle} className="slider-grid">
          {/* Left: Text detail block */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProj.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              style={textBlockStyle}
            >
              <div style={caseBadgeStyle}>
                <Sparkles size={16} color="var(--primary)" />
                <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>Projekt-Detail</span>
              </div>
              <h3 style={projectTitleStyle}>{activeProj.title}</h3>
              <span style={projectSubtitleStyle}>{activeProj.subtitle}</span>
              <p style={projectDescStyle}>{activeProj.description}</p>
              
              {/* Highlight metrics */}
              <div style={highlightRowStyle}>
                <div style={highlightColStyle}>
                  <span style={highlightValStyle}>Substanz</span>
                  <span style={highlightLabelStyle}>Erhalt & Schutz</span>
                </div>
                <div style={highlightColStyle}>
                  <span style={highlightValStyle}>Oberfläche</span>
                  <span style={highlightLabelStyle}>Kalkputz-Finish</span>
                </div>
              </div>

              {onProjectsClick && (
                <button 
                  className="btn btn-secondary" 
                  onClick={onProjectsClick}
                  style={{ alignSelf: "flex-start", marginTop: "2.5rem" }}
                >
                  Projektbeispiele ansehen
                </button>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Right: The Interactive Before/After Drag Slider (Clipped in a Museum Frame) */}
          <div className="before-after-frame" style={{ width: "100%", margin: 0 }}>
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
              style={sliderContainerStyle}
            >
              {/* Before Image (Always underneath, taking full space) */}
              <img
                src={activeProj.beforeImg}
                alt={activeProj.beforeLabel}
                style={imageStyle}
                draggable="false"
              />
              <div style={{ ...labelStyle, left: "1.5rem" }}>{activeProj.beforeLabel}</div>

              {/* After Image (Overlaid, clipped mathematically based on slider position) */}
              <img
                src={activeProj.afterImg}
                alt={activeProj.afterLabel}
                style={{
                  ...imageStyle,
                  clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`
                }}
                draggable="false"
              />
              <div style={{ ...labelStyle, right: "1.5rem" }}>{activeProj.afterLabel}</div>

              {/* Drag Handle Bar */}
              <div
                style={{
                  ...handleBarStyle,
                  left: `${sliderPosition}%`
                }}
              >
                <div style={handleCircleStyle}>
                  <ArrowLeftRight size={18} color="var(--text-light)" />
                </div>
              </div>
            </div>
            
            {/* Visual interactive hint and marketing annotation */}
            <div className="slider-annotation-bar">
              <span className="slider-label-left">Sanierungsstau & Alt-Substanz</span>
              <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-sans)", color: "var(--primary)", letterSpacing: "0.05em" }}>
                ← Ziehen Sie den Regler →
              </span>
              <span className="slider-label-right">Wohnmanufaktur-Ästhetik</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* Styles */
const headerStyle: React.CSSProperties = {
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "4.5rem"
};

const toggleContainerStyle: React.CSSProperties = {
  display: "flex",
  gap: "1rem",
  marginTop: "1.75rem"
};

const toggleBtnStyle: React.CSSProperties = {
  padding: "0.75rem 1.5rem",
  fontFamily: "var(--font-sans)",
  fontSize: "0.85rem",
  fontWeight: 600,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  border: "1px solid",
  cursor: "pointer",
  transition: "var(--transition-fast)"
};

const mainGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1.3fr",
  gap: "4rem",
  alignItems: "center"
};

const textBlockStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
};

const caseBadgeStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  color: "var(--primary)",
  marginBottom: "1rem"
};

const projectTitleStyle: React.CSSProperties = {
  fontSize: "2.5rem",
  color: "var(--text-dark)",
  marginBottom: "0.5rem"
};

const projectSubtitleStyle: React.CSSProperties = {
  fontSize: "1.1rem",
  color: "var(--primary)",
  fontWeight: 600,
  fontFamily: "var(--font-sans)",
  marginBottom: "1.5rem"
};

const projectDescStyle: React.CSSProperties = {
  color: "var(--text-muted-dark)",
  fontSize: "1.05rem",
  lineHeight: "1.7",
  marginBottom: "2.5rem"
};

const highlightRowStyle: React.CSSProperties = {
  display: "flex",
  gap: "3rem",
  borderTop: "1px solid var(--border-dark)",
  paddingTop: "2rem"
};

const highlightColStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column"
};

const highlightValStyle: React.CSSProperties = {
  fontSize: "1.15rem",
  fontWeight: 600,
  color: "var(--text-dark)",
  fontFamily: "var(--font-sans)"
};

const highlightLabelStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "var(--text-muted-dark)"
};

/* Slider container */
const sliderContainerStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  aspectRatio: "4/3",
  overflow: "hidden",
  cursor: "ew-resize",
  boxShadow: "var(--shadow-luxury)",
  border: "1px solid var(--border-dark)",
  backgroundColor: "#e0dcd5"
};

const imageStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  pointerEvents: "none"
};

const handleBarStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  bottom: 0,
  width: "2px",
  backgroundColor: "var(--bg-light)",
  zIndex: 3,
  pointerEvents: "none",
  transform: "translateX(-50%)"
};

const handleCircleStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  backgroundColor: "var(--primary)",
  border: "4px solid var(--bg-light)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
  pointerEvents: "none"
};

const labelStyle: React.CSSProperties = {
  position: "absolute",
  bottom: "1.5rem",
  padding: "0.5rem 1rem",
  backgroundColor: "rgba(18, 17, 15, 0.75)",
  backdropFilter: "blur(5px)",
  color: "var(--text-light)",
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  zIndex: 4,
  fontWeight: 600,
  border: "1px solid var(--border-light)"
};

const styleTag = document.createElement("style");
styleTag.innerHTML = `
  .slider-toggle-btn:not(.active-toggle):hover {
    border-color: #1e3c60 !important;
    color: #1e3c60 !important;
  }
  @media (max-width: 900px) {
    .slider-grid {
      grid-template-columns: 1fr !important;
      gap: 3rem !important;
    }
  }
`;
document.head.appendChild(styleTag);

export default BeforeAfterSlider;
