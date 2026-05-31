import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare } from "lucide-react";

interface StickyCtaBarProps {
  onContactClick: () => void;
}

const StickyCtaBar: React.FC<StickyCtaBarProps> = ({ onContactClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Fade in sticky CTA bar only after scrolling past the Hero (500px threshold)
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease }}
          className="sticky-cta-bar"
        >
          <div className="container sticky-cta-container">
            <div style={textGroupStyle}>
              <span style={bulletStyle}>&bull;</span>
              <span className="sticky-cta-text">
                Planen Sie eine Sanierung mit architektonischem Anspruch?
              </span>
            </div>
            <button 
              className="btn btn-primary" 
              onClick={onContactClick}
              style={btnStyle}
            >
              Projekt besprechen
              <MessageSquare size={14} style={{ marginLeft: "0.5rem" }} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* Styles */
const textGroupStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.75rem"
};

const bulletStyle: React.CSSProperties = {
  color: "var(--primary)",
  fontSize: "1.5rem",
  lineHeight: 1
};

const btnStyle: React.CSSProperties = {
  padding: "0.75rem 1.75rem",
  fontSize: "0.8rem",
  letterSpacing: "0.08em"
};

export default StickyCtaBar;
