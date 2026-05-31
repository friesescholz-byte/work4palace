import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, X, Compass } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  imgUrl: string;
  size: "large" | "medium" | "tall";
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Luxus-Badezimmer Perspektive",
    category: "Sanitär & Ausbau",
    imgUrl: "https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/work4palace/Bad%20nachher.jpg",
    size: "tall"
  },
  {
    id: 2,
    title: "Kalkputz-Strukturen & Badwanne",
    category: "Wandaufbau & Finish",
    imgUrl: "https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/work4palace/Bad%20nachher%202.jpg",
    size: "medium"
  },
  {
    id: 3,
    title: "Badezimmer Waschbecken & Fliesen",
    category: "Feuchtbereichs-Sanierung",
    imgUrl: "https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/work4palace/Bad%20nachher%203.jpg",
    size: "large"
  },
  {
    id: 4,
    title: "Restaurierter Terrazzo-Eingangsbereich",
    category: "Bodenrestaurierung",
    imgUrl: "https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/work4palace/terrazzo%20neu.jpg",
    size: "medium"
  }
];

const Portfolio: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="section section-dark" id="portfolio" style={{ borderBottom: "1px solid var(--border-light)" }}>
      <div className="container">
        {/* Section Header */}
        <div style={headerStyle}>
          <span className="section-eyebrow">Exquisite Referenzen</span>
          <h2 className="section-title">Impressionen vollendeter Räume</h2>
          <p className="section-desc">
            Erleben Sie die ästhetische Kraft unserer Arbeit. Jedes Projekt spiegelt unsere Liebe zu natürlichen Materialien, struktureller Klarheit und handwerklicher Perfektion wider.
          </p>
        </div>

        {/* Portfolio Masonry Grid */}
        <div style={gridStyle}>
          {galleryItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease, delay: idx * 0.1 }}
              onClick={() => setSelectedItem(item)}
              style={{
                ...cardWrapperStyle,
                gridColumn: item.size === "large" ? "span 2" : "span 1",
                gridRow: item.size === "tall" ? "span 2" : "span 1"
              }}
              className="portfolio-card"
            >
              <div style={imgContainerStyle}>
                <img src={item.imgUrl} alt={item.title} style={imgStyle} />
                
                {/* Hover Overlay */}
                <div style={overlayStyle} className="portfolio-overlay">
                  <div style={overlayIconStyle}>
                    <ZoomIn size={20} color="var(--text-light)" />
                  </div>
                  <div style={overlayTextsStyle}>
                    <span style={catStyle}>{item.category}</span>
                    <h3 style={titleStyle}>{item.title}</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            style={modalBackdropStyle}
          >
            {/* Close Button */}
            <button style={closeBtnStyle} onClick={() => setSelectedItem(null)}>
              <X size={24} color="var(--text-light)" />
            </button>

            {/* Modal Image & Description */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              onClick={(e) => e.stopPropagation()}
              style={modalContentStyle}
            >
              <img
                src={selectedItem.imgUrl}
                alt={selectedItem.title}
                style={modalImgStyle}
              />
              <div style={modalInfoStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--primary)", marginBottom: "0.5rem" }}>
                  <Compass size={14} />
                  <span style={modalCatStyle}>{selectedItem.category}</span>
                </div>
                <h3 style={modalTitleStyle}>{selectedItem.title}</h3>
                <p style={modalDescStyle}>
                  Dieses Projekt demonstriert die exklusive Handschrift der work4palace UG. Mit ehrlicher Haptik, Substanzerhalt und meisterhafter Präzision schaffen wir zeitlose Lebensräume mit architektonischem Charakter.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

/* Styles */
const headerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  marginBottom: "5rem"
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridAutoRows: "400px",
  gap: "2.5rem"
};

const cardWrapperStyle: React.CSSProperties = {
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  border: "1px solid var(--border-light)"
};

const imgContainerStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%"
};

const imgStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)"
};

const overlayStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(to top, rgba(18, 17, 15, 0.9) 0%, rgba(18, 17, 15, 0.2) 60%, transparent 100%)",
  opacity: 0,
  transition: "var(--transition-smooth)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "2rem"
};

const overlayIconStyle: React.CSSProperties = {
  alignSelf: "flex-end",
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  backgroundColor: "var(--primary)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transform: "translateY(-10px)",
  transition: "var(--transition-smooth)"
};

const overlayTextsStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  transform: "translateY(15px)",
  transition: "var(--transition-smooth)"
};

const catStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  color: "var(--primary)",
  fontWeight: 600,
  marginBottom: "0.5rem"
};

const titleStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "1.75rem",
  color: "var(--text-light)"
};

/* Modal styles */
const modalBackdropStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(18, 17, 15, 0.95)",
  backdropFilter: "blur(20px)",
  zIndex: 1100,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "3rem"
};

const closeBtnStyle: React.CSSProperties = {
  position: "absolute",
  top: "2rem",
  right: "2rem",
  background: "none",
  border: "none",
  cursor: "pointer",
  zIndex: 1105
};

const modalContentStyle: React.CSSProperties = {
  maxWidth: "1000px",
  width: "100%",
  backgroundColor: "var(--bg-dark-soft)",
  border: "1px solid var(--border-light)",
  display: "grid",
  gridTemplateColumns: "1.4fr 1fr",
  overflow: "hidden",
  boxShadow: "var(--shadow-luxury)"
};

const modalImgStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  maxHeight: "650px",
  objectFit: "cover"
};

const modalInfoStyle: React.CSSProperties = {
  padding: "3.5rem 3rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  color: "var(--text-light)"
};

const modalCatStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  fontWeight: 600
};

const modalTitleStyle: React.CSSProperties = {
  fontSize: "2.25rem",
  marginBottom: "1.5rem"
};

const modalDescStyle: React.CSSProperties = {
  color: "var(--text-muted-light)",
  fontSize: "0.95rem",
  lineHeight: "1.7",
  fontWeight: 300
};

// Inject CSS transitions for hover state
const styleTag = document.createElement("style");
styleTag.innerHTML = `
  .portfolio-card:hover img {
    transform: scale(1.08);
  }
  .portfolio-card:hover .portfolio-overlay {
    opacity: 1 !important;
  }
  .portfolio-card:hover .portfolio-overlay > div {
    transform: translateY(0) !important;
  }
  @media (max-width: 900px) {
    #portfolio .grid-style {
      grid-template-columns: 1fr !important;
      grid-auto-rows: 350px !important;
    }
    .portfolio-card {
      grid-column: span 1 !important;
      grid-row: span 1 !important;
    }
    .modal-content-style {
      grid-template-columns: 1fr !important;
    }
    .modal-img-style {
      max-height: 300px !important;
    }
  }
`;
document.head.appendChild(styleTag);

export default Portfolio;
