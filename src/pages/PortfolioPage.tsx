import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Compass } from "lucide-react";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imgUrl: string;
}

// Curated masterpieces from R2
const defaultItems: PortfolioItem[] = [
  {
    id: "1",
    title: "Atmungsaktives Kalkputz-Wandfinish",
    category: "Wandaufbau & Kalkputz",
    imgUrl: "https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/work4palace/Bad%20nachher%202.jpg"
  },
  {
    id: "2",
    title: "Edler Altbau-Ausbau mit Badewanne",
    category: "Innenausbau",
    imgUrl: "https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/work4palace/Bad%20nachher.jpg"
  },
  {
    id: "3",
    title: "Meisterhafte Dielenverlegung & Fugenbild",
    category: "Bodenaufbau & Echtholz",
    imgUrl: "https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/work4palace/Bad%20nachher%203.jpg"
  },
  {
    id: "4",
    title: "Feinster Nassschliff antiker Terrazzoböden",
    category: "Bodenaufbau & Echtholz",
    imgUrl: "https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/work4palace/terrazzo%20neu.jpg"
  }
];

const PortfolioPage: React.FC = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const ease = [0.16, 1, 0.3, 1] as const;

  // Sync state with localStorage to capture real-time CMS adjustments
  useEffect(() => {
    const saved = localStorage.getItem("w4p_portfolio_items");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        setItems(defaultItems);
      }
    } else {
      setItems(defaultItems);
      localStorage.setItem("w4p_portfolio_items", JSON.stringify(defaultItems));
    }
  }, []);

  return (
    <div className="page-container" style={{ backgroundColor: "var(--bg-light)" }}>
      {/* Header spacing offset */}
      <div style={{ height: "80px" }}></div>

      {/* Editorial Title Header */}
      <section className="section section-light" style={{ padding: "8rem 0 2rem 0" }}>
        <div className="container" style={{ maxWidth: "1000px", textAlign: "center" }}>
          <span className="section-eyebrow">Exquisite Referenzen</span>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "3.75rem", color: "var(--text-dark)", lineHeight: 1.15, marginBottom: "1.5rem" }}>
            Projektbeispiele vollendeter Wohnkultur
          </h1>
          <p style={{ color: "var(--text-muted-dark)", fontSize: "1.15rem", fontWeight: 300, lineHeight: 1.7, maxWidth: "750px", margin: "0 auto" }}>
            Erleben Sie die gestalterische Kraft unserer Arbeiten in ihrer authentischen Form. Jedes Bild zeigt unsere handwerkliche Präzision, die ehrliche Materialästhetik und den Respekt vor historischer Bausubstanz – absolut unbeschnitten und pur.
          </p>
        </div>
      </section>

      {/* Modern CSS-Masonry Grid (Preserves proportions perfectly) */}
      <section className="section section-light" style={{ padding: "0 0 8rem 0" }}>
        <div className="container">
          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "5rem 0", border: "1px dashed var(--border-dark)" }}>
              <p style={{ color: "var(--text-muted-dark)", fontSize: "1.1rem" }}>Noch keine Projektbeispiele hochgeladen.</p>
            </div>
          ) : (
            <div className="portfolio-masonry-grid">
              {items.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, ease, delay: idx * 0.08 }}
                  onClick={() => setSelectedItem(item)}
                  className="masonry-item"
                >
                  <img 
                    src={item.imgUrl} 
                    alt={item.title} 
                    loading="lazy" 
                    draggable="false"
                  />
                  
                  {/* Majestic Slide-up Hover Overlay */}
                  <div className="masonry-hover-overlay">
                    <span className="masonry-category">{item.category}</span>
                    <h3 className="masonry-title">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Majestic Lightbox Modal for fullscreen image views */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="lightbox-modal"
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedItem(null)}
              style={{ position: "absolute", top: "2rem", right: "2rem", background: "none", border: "none", cursor: "pointer", zIndex: 1110 }}
            >
              <X size={28} color="var(--text-light)" />
            </button>

            {/* Content card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "1000px",
                width: "90%",
                backgroundColor: "var(--bg-dark-soft)",
                border: "1px solid var(--border-light)",
                display: "flex",
                flexDirection: "column",
                boxShadow: "var(--shadow-luxury)",
                position: "relative"
              }}
            >
              <div style={{ position: "relative", width: "100%", overflow: "hidden", display: "flex", justifyContent: "center", backgroundColor: "#0e0e0c" }}>
                <img
                  src={selectedItem.imgUrl}
                  alt={selectedItem.title}
                  style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "75vh", objectFit: "contain", display: "block" }}
                />
              </div>

              {/* Lightbox Information bar */}
              <div style={{ padding: "2.5rem 3rem", backgroundColor: "var(--bg-dark-soft)", borderTop: "1px solid var(--border-light)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--primary)", marginBottom: "0.5rem" }}>
                  <Compass size={14} />
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600 }}>
                    {selectedItem.category}
                  </span>
                </div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--text-light)", marginBottom: "1rem" }}>
                  {selectedItem.title}
                </h3>
                <p style={{ color: "var(--text-muted-light)", fontSize: "0.95rem", lineHeight: "1.6", fontWeight: 300 }}>
                  Dieses authentische Werk zeigt die meisterhafte Ausführung der work4palace UG. Jedes Detail spiegelt ehrliche Haptik, Langlebigkeit und die Veredelung historischer Bausubstanz wider – ein Unikat mit bleibendem Wert für Ihr Eigentum.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioPage;
