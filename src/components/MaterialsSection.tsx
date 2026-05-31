import React from "react";
import { motion } from "framer-motion";
import { Hammer, Trees, Layers } from "lucide-react";

const MaterialsSection: React.FC = () => {
  const ease = [0.16, 1, 0.3, 1] as const;

  const cards = [
    {
      icon: <Layers size={36} color="var(--primary)" />,
      title: "Kalk- & Lehmputz",
      subtitle: "Die Ästhetik des Mineralischen",
      description: "Wir verarbeiten hochwertigen Sumpfkalk und Lehmputz. Diese rein mineralischen Materialien regulieren das Raumklima auf natürliche Weise, sind schimmelhemmend, absolut emissionsfrei und bieten eine unvergleichliche, matte, handwerklich strukturierte Haptik.",
      highlight: "Reguliert Feuchtigkeit"
    },
    {
      icon: <Trees size={36} color="var(--primary)" />,
      title: "Echtholz & Parkett",
      subtitle: "Die Wärme des Wahren",
      description: "Ob Restaurierung historischer Dielen oder das Verlegen von Massivholz-Parkett: Echtholz bringt Leben in Räume. Wir behandeln Hölzer ausschließlich mit ökologischen Ölen und Wachsen, um den natürlichen Charakter des Holzes fühlbar zu bewahren.",
      highlight: "100% Ökologisch veredelt"
    },
    {
      icon: <Hammer size={36} color="var(--primary)" />,
      title: "Substanzerhalt",
      subtitle: "Respekt vor dem Bestand",
      description: "Eine gelungene Altbausanierung beginnt beim Verstehen des Hauses. Wir begleiten Ihr Projekt vom schonenden, selektiven Rückbau über den fachgerechten Wand- und Bodenaufbau bis hin zur bezugsfertigen, makellosen Oberfläche.",
      highlight: "Erbe bewahren"
    }
  ];

  return (
    <section className="section section-light" id="materials">
      <div className="container">
        {/* Section Header */}
        <div style={headerStyle}>
          <span className="section-eyebrow">Materialästhetik & Handwerk</span>
          <h2 className="section-title" style={{ color: "var(--text-dark)" }}>Echte Werte für exklusive Räume</h2>
          <p className="section-desc" style={{ color: "var(--text-muted-dark)" }}>
            Wir glauben an die Haptik ehrlicher, natürlicher Stoffe. Unsere Materialien sind nicht nur langlebig, sondern erzeugen ein gesundes, behagliches Raumklima und eine edle, architektonische Raumwirkung.
          </p>
        </div>

        {/* 3-Column Luxury Cards */}
        <div className="grid-3">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease, delay: idx * 0.15 }}
              className="luxury-card luxury-card-light"
              style={cardStyle}
            >
              <div style={iconWrapperStyle}>
                {card.icon}
              </div>
              <h3 style={cardTitleStyle}>{card.title}</h3>
              <span style={cardSubtitleStyle}>{card.subtitle}</span>
              <p style={cardDescStyle}>{card.description}</p>
              
              <div style={highlightStyle}>
                <span style={highlightTextStyle}>{card.highlight}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
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

const cardStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  boxShadow: "var(--shadow-soft)",
  borderRadius: 0
};

const iconWrapperStyle: React.CSSProperties = {
  marginBottom: "2rem",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "72px",
  height: "72px",
  backgroundColor: "rgba(184, 105, 69, 0.06)",
  borderRadius: 0
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: "1.75rem",
  color: "var(--text-dark)",
  marginBottom: "0.5rem"
};

const cardSubtitleStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  fontFamily: "var(--font-sans)",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "var(--primary)",
  fontWeight: 600,
  marginBottom: "1.5rem"
};

const cardDescStyle: React.CSSProperties = {
  color: "var(--text-muted-dark)",
  fontSize: "0.95rem",
  lineHeight: "1.7",
  marginBottom: "2.5rem",
  flexGrow: 1
};

const highlightStyle: React.CSSProperties = {
  borderTop: "1px solid var(--border-dark)",
  paddingTop: "1.25rem",
  display: "flex",
  alignItems: "center"
};

const highlightTextStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "var(--text-muted-dark)",
  fontWeight: 600
};

export default MaterialsSection;
