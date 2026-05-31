import React from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck, Heart, CheckCircle2, ArrowRight } from "lucide-react";

interface AboutProps {
  onContactClick: () => void;
  onProjectsClick?: () => void; // Optional to handle portfolio page routing
}

const About: React.FC<AboutProps> = ({ onContactClick, onProjectsClick }) => {
  const ease = [0.16, 1, 0.3, 1] as const;

  // Stagger animation configurations
  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    }
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease
      }
    }
  };

  const listContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15
      }
    }
  };

  const listItemVariant = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease
      }
    }
  };

  return (
    <div className="page-container">
      {/* Editorial About Hero */}
      <section className="section section-dark" style={heroSectionStyle}>
        <div className="container" style={{ zIndex: 3 }}>
          <div style={{ maxWidth: "850px" }}>
            <motion.span 
              className="section-eyebrow"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              Unsere Identität
            </motion.span>
            <motion.h1 
              style={heroHeadlineStyle}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              Wir sanieren keine Oberflächen. Wir reaktivieren historische Dignität.
            </motion.h1>
            <motion.p 
              style={heroSublineStyle}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            >
              work4palace UG versteht sich als exklusive Manufaktur für historisches Wohnen. Wir verbinden meisterhafte Altbaurestaurierung mit baubiologischer Verantwortung und anspruchsvoller Raumästhetik.
            </motion.p>
          </div>
        </div>
        <div style={glowOverlayStyle}></div>
      </section>

      {/* Section 1: Founders & Personal Accountability (Light Background) */}
      <section className="section section-light" style={{ borderBottom: "1px solid var(--border-dark)" }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: "center", gap: "4rem" }}>
            
            {/* Left: Blueprint-framed Portrait of founder Tina Heinecke */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease }}
              className="about-founder-photo-wrap"
            >
              <div className="services-photo-wrapper" style={{ borderColor: "var(--border-dark)", boxShadow: "var(--shadow-soft)" }}>
                {/* Blueprint lines */}
                <div className="blueprint-line blueprint-line-x"></div>
                <div className="blueprint-line blueprint-line-y"></div>

                {/* Corner Marks */}
                <div className="corner-mark top-left"></div>
                <div className="corner-mark top-right"></div>
                <div className="corner-mark bottom-left"></div>
                <div className="corner-mark bottom-right"></div>

                {/* Glassmorphic spec badge */}
                <div className="tech-badge" style={{ background: "rgba(250, 246, 238, 0.85)", color: "var(--text-dark)", borderColor: "var(--border-dark)" }}>
                  <span className="badge-pulse-dot"></span>
                  <span>Gründerin & Meisterin</span>
                </div>

                <div className="services-photo-inner">
                  <img 
                    src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/work4palace/Tina_Heinecke.jpg" 
                    alt="Tina Heinecke - Gründerin und Geschäftsführerin" 
                    loading="lazy"
                    draggable="false"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right: Personal Sales Text & Checklists */}
            <motion.div 
              style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }} variants={fadeUpVariant}>
                <span className="section-eyebrow" style={{ marginBottom: 0 }}>Führung & Verantwortung</span>
              </motion.div>

              <motion.h2 
                className="section-title" 
                style={{ fontSize: "2.75rem", lineHeight: "1.2", color: "var(--text-dark)" }}
                variants={fadeUpVariant}
              >
                Tina Heinecke — Handwerk mit persönlichem Versprechen
              </motion.h2>

              <motion.p 
                style={{ color: "var(--text-dark)", fontSize: "1.1rem", lineHeight: "1.7", fontWeight: 400 }}
                variants={fadeUpVariant}
              >
                Als Geschäftsführerin und meisterliche Leiterin von work4palace stehe ich persönlich für eine Sanierung ein, die über das übliche Handwerker-Niveau hinausgeht. Wir sind kein anonymer Großbetrieb – sondern Ihr verlässlicher Partner vor Ort.
              </motion.p>

              <motion.p 
                style={{ color: "var(--text-muted-dark)", fontSize: "1rem", lineHeight: "1.7", fontWeight: 300 }}
                variants={fadeUpVariant}
              >
                Jedes historische Projekt im Landkreis Nienburg und der Region Hannover wird von uns mit einem Höchstmaß an handwerklicher Sorgfalt geplant, koordiniert und abgenommen. Wir glauben an ehrliches, sauberes und langlebiges Handwerk.
              </motion.p>

              {/* Founder Guarantees checklist */}
              <motion.ul 
                className="trust-list" 
                style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}
                variants={listContainer}
              >
                <motion.li className="trust-list-item" style={{ fontSize: "0.95rem" }} variants={listItemVariant}>
                  <div className="trust-check-icon" style={{ marginTop: "0.2rem" }}>
                    <CheckCircle2 size={13} color="var(--primary)" />
                  </div>
                  <div>
                    <strong style={{ color: "var(--text-dark)", fontWeight: 600 }}>Direkte Erreichbarkeit:</strong>{" "}
                    <span style={{ color: "var(--text-muted-dark)", fontWeight: 300 }}>Sie sprechen immer direkt mit mir, kein Informationsverlust durch ungeschulte Zwischenstellen.</span>
                  </div>
                </motion.li>

                <motion.li className="trust-list-item" style={{ fontSize: "0.95rem" }} variants={listItemVariant}>
                  <div className="trust-check-icon" style={{ marginTop: "0.2rem" }}>
                    <CheckCircle2 size={13} color="var(--primary)" />
                  </div>
                  <div>
                    <strong style={{ color: "var(--text-dark)", fontWeight: 600 }}>Feste Meisterabnahme:</strong>{" "}
                    <span style={{ color: "var(--text-muted-dark)", fontWeight: 300 }}>Jedes Gewerk wird von mir persönlich auf absolute Geradlinigkeit und DIN-Konformität geprüft.</span>
                  </div>
                </motion.li>

                <motion.li className="trust-list-item" style={{ fontSize: "0.95rem" }} variants={listItemVariant}>
                  <div className="trust-check-icon" style={{ marginTop: "0.2rem" }}>
                    <CheckCircle2 size={13} color="var(--primary)" />
                  </div>
                  <div>
                    <strong style={{ color: "var(--text-dark)", fontWeight: 600 }}>Garantierter Staubschutz:</strong>{" "}
                    <span style={{ color: "var(--text-muted-dark)", fontWeight: 300 }}>Wir dichten Arbeitszonen hermetisch ab, damit Ihre unberührten Räume vollkommen bewohnbar bleiben.</span>
                  </div>
                </motion.li>
              </motion.ul>

              <motion.button 
                className="btn btn-secondary" 
                onClick={onContactClick}
                style={{ alignSelf: "flex-start", padding: "0.9rem 2rem" }}
                variants={fadeUpVariant}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Gespräch mit Frau Heinecke führen</span>
                <ArrowRight size={14} style={{ marginLeft: "0.5rem" }} />
              </motion.button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Section 2: Material Aesthetics & Overlapping Collage (Dark Background) */}
      <section className="section section-dark" style={{ borderBottom: "1px solid var(--border-light)", overflow: "visible" }}>
        <div className="container" style={{ position: "relative" }}>
          <div className="grid-2" style={{ alignItems: "center", gap: "5rem" }}>
            
            {/* Left: Material Philosophy Copy */}
            <motion.div 
              style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <span className="section-eyebrow">Materialphilosophie</span>
              <h2 className="section-title" style={{ fontSize: "2.75rem", lineHeight: "1.2" }}>
                Ruhiger Luxus statt lauter Baustellenoptik.
              </h2>
              <p style={{ color: "var(--text-muted-light)", fontSize: "1.1rem", lineHeight: "1.7", fontWeight: 300 }}>
                Ein historischer Altbau braucht keine synthetischen Verkleidungen, die die Bausubstanz abschnüren. Er verlangt nach echten, mineralischen Rohstoffen, die atmen können und von innen heraus Wärme schenken.
              </p>
              <p style={{ color: "var(--text-muted-light)", fontSize: "0.95rem", lineHeight: "1.7", fontWeight: 300 }}>
                Deshalb setzt work4palace konsequent auf diffusionsoffenen Sumpfkalk, wohngesunden Lehm und handverlegte Massivholzdielen. Unsere Baustellen sind Oasen der Struktur: saubere Abläufe, kompromissloser Staubschutz und meisterhafte, dauerhafte Detaillösungen für ein Zuhause mit spürbarer Substanz.
              </p>

              <button 
                className="btn btn-primary" 
                onClick={onProjectsClick || onContactClick}
                style={{ alignSelf: "flex-start", marginTop: "1rem", padding: "1rem 2.25rem" }}
              >
                Unsere Projektbeispiele ansehen
                <ArrowRight size={14} style={{ marginLeft: "0.5rem" }} />
              </button>
            </motion.div>

            {/* Right: Immersive Overlapping Architectural Image Collage with '46' R2 assets */}
            <div className="about-collage-container">
              {/* Backing Main Image */}
              <motion.div 
                className="about-collage-card main-base"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease }}
              >
                <div className="services-photo-wrapper" style={{ borderColor: "var(--border-light)" }}>
                  <div className="blueprint-line blueprint-line-x"></div>
                  <div className="blueprint-line blueprint-line-y"></div>
                  
                  <div className="corner-mark top-left"></div>
                  <div className="corner-mark top-right"></div>
                  <div className="corner-mark bottom-left"></div>
                  <div className="corner-mark bottom-right"></div>
                  

                  
                  <div className="services-photo-inner">
                    <img 
                      src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/work4palace/469876073_122131236716500648_950492279169535038_n.jpg" 
                      alt="work4palace Altbaurestaurierung" 
                      loading="lazy"
                      draggable="false"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Offset Detail Image 1 (Top Right Overlay) */}
              <motion.div 
                className="about-collage-card detail-top-right"
                initial={{ opacity: 0, x: 30, y: -20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease }}
                whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.3 } }}
              >
                <div className="services-photo-wrapper" style={{ borderColor: "var(--primary)" }}>
                  <div className="corner-mark top-left"></div>
                  <div className="corner-mark top-right"></div>
                  <div className="corner-mark bottom-left"></div>
                  <div className="corner-mark bottom-right"></div>
                  
                  <div className="tech-badge" style={{ padding: "0.25rem 0.5rem", fontSize: "0.55rem" }}>
                    <span>Mineralik</span>
                  </div>
                  
                  <div className="services-photo-inner">
                    <img 
                      src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/work4palace/470136744_122131658180500648_1991235812106690479_n.jpg" 
                      alt="Mineralischer Sumpfkalkputz Detail" 
                      loading="lazy"
                      draggable="false"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Offset Detail Image 2 (Bottom Left Overlay) */}
              <motion.div 
                className="about-collage-card detail-bottom-left"
                initial={{ opacity: 0, x: -30, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease }}
                whileHover={{ y: 5, scale: 1.02, transition: { duration: 0.3 } }}
              >
                <div className="services-photo-wrapper" style={{ borderColor: "var(--border-light)" }}>
                  <div className="corner-mark top-left"></div>
                  <div className="corner-mark top-right"></div>
                  <div className="corner-mark bottom-left"></div>
                  <div className="corner-mark bottom-right"></div>
                  
                  <div className="tech-badge" style={{ padding: "0.25rem 0.5rem", fontSize: "0.55rem" }}>
                    <span>Ausführung</span>
                  </div>
                  
                  <div className="services-photo-inner">
                    <img 
                      src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/work4palace/470146585_122131764320500648_1595896764443176187_n.jpg" 
                      alt="work4palace Handwerkliche Präzision" 
                      loading="lazy"
                      draggable="false"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 3: Core Values (Light Background) */}
      <section className="section section-light" style={{ borderBottom: "1px solid var(--border-dark)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <span className="section-eyebrow">Unser Wertekodex</span>
            <h2 className="section-title" style={{ color: "var(--text-dark)", fontSize: "3rem" }}>Das Fundament unserer Vorgehensweise</h2>
          </div>

          <div className="about-values-grid">
            <motion.div 
              className="about-value-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
            >
              <div className="about-value-icon">
                <Award size={24} color="var(--primary)" />
              </div>
              <span className="about-value-number">01</span>
              <h3>Meisterliche Genauigkeit</h3>
              <p>Geradlinige Kanten, absolut ebene Dielenunterkonstruktionen und fehlerfreie Q4-Spachtelungen. Wir tolerieren keinerlei Kompromisse bei der Ausführungsqualität.</p>
            </motion.div>

            <motion.div 
              className="about-value-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
            >
              <div className="about-value-icon">
                <ShieldCheck size={24} color="var(--primary)" />
              </div>
              <span className="about-value-number">02</span>
              <h3>Schadstofffreie Baubiologie</h3>
              <p>Ihr Wohlbefinden steht an erster Stelle. Wir dämmen und verputzen ausschließlich mit baubiologisch geprüften, atmungsaktiven Naturstoffen ohne VOCs.</p>
            </motion.div>

            <motion.div 
              className="about-value-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
            >
              <div className="about-value-icon">
                <Heart size={24} color="var(--primary)" />
              </div>
              <span className="about-value-number">03</span>
              <h3>Absolute Verlässlichkeit</h3>
              <p>Feste Termine, nachvollziehbare meisterliche Festpreis-Kalkulationen und vollste Transparenz über jeden Handwerkergriff vor Ort.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Call to Action (Dark Background) */}
      <section className="section section-dark">
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <span className="section-eyebrow">Projekt Starten</span>
          <h2 className="section-title" style={{ fontSize: "3rem" }}>Besitzen Sie ein historisches Gebäude mit Seele?</h2>
          <p style={{ color: "var(--text-muted-light)", marginBottom: "3rem", fontSize: "1.15rem", lineHeight: "1.7", fontWeight: 300 }}>
            Lassen Sie uns gemeinsam den ursprünglichen Glanz und die bauphysikalische Gesundheit Ihres Gebäudes wiedererwecken. Sichern Sie sich eine kostenfreie, fundierte Substanzanalyse.
          </p>
          <button className="btn btn-primary" onClick={onContactClick} style={{ padding: "1.1rem 2.25rem" }}>
            Jetzt Erstgespräch anfordern
            <ArrowRight size={14} style={{ marginLeft: "0.5rem" }} />
          </button>
        </div>
      </section>

      {/* CAPSULED PRESTIGE ABOUT PAGE STYLING */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Overlapping Image Collage */
        .about-collage-container {
          position: relative;
          width: 100%;
          height: 480px;
          margin-top: 2rem;
        }
        .about-collage-card {
          position: absolute;
          transition: var(--transition-smooth);
        }
        .about-collage-card.main-base {
          width: 70%;
          left: 10%;
          top: 10%;
          z-index: 10;
        }
        .about-collage-card.detail-top-right {
          width: 45%;
          right: -5%;
          top: -5%;
          z-index: 12;
        }
        .about-collage-card.detail-bottom-left {
          width: 45%;
          left: -5%;
          bottom: -5%;
          z-index: 11;
        }
        
        .about-founder-photo-wrap {
          width: 100%;
        }

        /* 3-Column values grid */
        .about-values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          margin-top: 1.5rem;
        }
        .about-value-card {
          position: relative;
          padding: 3rem 2rem 2.5rem 2rem;
          background: rgba(18, 17, 15, 0.02);
          border: 1px solid var(--border-dark);
          border-radius: 4px;
          transition: var(--transition-smooth);
        }
        .about-value-card:hover {
          border-color: var(--primary);
          background: rgba(18, 17, 15, 0.03);
          transform: translateY(-4px);
          box-shadow: 0 15px 30px rgba(18, 17, 15, 0.05);
        }
        .about-value-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(184, 105, 69, 0.06);
          border: 1px solid rgba(184, 105, 69, 0.15);
          margin-bottom: 2rem;
        }
        .about-value-number {
          position: absolute;
          top: 2rem;
          right: 2rem;
          font-family: var(--font-serif);
          font-size: 2.5rem;
          color: rgba(184, 105, 69, 0.12);
          line-height: 1;
        }
        .about-value-card h3 {
          font-family: var(--font-sans);
          font-size: 1.15rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: var(--text-dark);
        }
        .about-value-card p {
          font-size: 0.92rem;
          line-height: 1.65;
          color: var(--text-muted-dark);
          font-weight: 300;
        }

        /* High-contrast support */
        .high-contrast-mode .about-value-card {
          background: #000000 !important;
          border: 1px solid #ffffff !important;
        }
        .high-contrast-mode .about-value-card h3 {
          color: #ffffff !important;
        }
        .high-contrast-mode .about-value-card p {
          color: #ffffff !important;
        }
        .high-contrast-mode .about-value-number {
          color: #ffffff !important;
        }

        /* Responsive Collage & Values */
        @media (max-width: 1024px) {
          .about-collage-container {
            height: 380px;
            margin-top: 3rem;
            margin-bottom: 3rem;
          }
          .about-values-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
        @media (max-width: 600px) {
          .about-collage-container {
            height: 280px;
          }
        }
      ` }} />
    </div>
  );
};

/* Styles */
const heroSectionStyle: React.CSSProperties = {
  position: "relative",
  padding: "13rem 0 8rem 0",
  backgroundColor: "transparent",
  overflow: "hidden"
};

const heroHeadlineStyle: React.CSSProperties = {
  fontSize: "4rem",
  lineHeight: "1.1",
  letterSpacing: "-0.02em",
  marginBottom: "1.75rem",
  color: "var(--text-light)"
};

const heroSublineStyle: React.CSSProperties = {
  fontSize: "1.25rem",
  lineHeight: "1.75",
  color: "var(--text-muted-light)",
  marginBottom: "3rem",
  fontWeight: 300,
  maxWidth: "700px"
};

const glowOverlayStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "radial-gradient(circle at 80% 20%, rgba(184, 105, 69, 0.04) 0%, transparent 60%)",
  pointerEvents: "none",
  zIndex: 1
};

export default About;
