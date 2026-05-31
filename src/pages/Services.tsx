import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Hammer, Layers, Trees, Scissors, Layers2, ArrowRight, CheckCircle2 } from "lucide-react";

interface ServicesProps {
  onContactClick: () => void;
}

const Services: React.FC<ServicesProps> = ({ onContactClick }) => {
  const ease = [0.16, 1, 0.3, 1] as const;

  const sections = [
    {
      id: "altbau",
      icon: <Layers size={22} color="var(--primary)" />,
      title: "Altbausanierung",
      heading: "Die Reaktivierung der historischen Würde Ihres Gebäudes",
      intro: "Ein historischer Altbau trägt Charakter, Seele und Geschichte. work4palace restauriert nicht einfach Oberflächen – wir reaktivieren das wertvolle Erbe Ihres Objektes mit meisterhafter Bauphysik, ökologischen Werkstoffen und kompromissloser Präzision.",
      bullets: [
        { label: "Respektvoller Substanzschutz", desc: "Behutsame, fachgerechte Konservierung historischer Riegel, Ziegel und Tragwerke nach denkmalpflegerischen Kriterien." },
        { label: "Unsichtbarer Komfort", desc: "Ästhetisch integrierte Wand- und Fußbodenheizungen, perfekt abgestimmt auf die originale Bausubstanz." },
        { label: "Nachhaltiger Wert", desc: "Werterhalt und Schutz für Generationen durch diffusionsoffene, atmungsaktive Konstruktionsverfahren." }
      ],
      cta: "Substanzanalyse anfragen",
      img: "https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/work4palace/Bad%20nachher%203.jpg",
      badge: "Denkmal-Expertise",
      isDark: false
    },
    {
      id: "kalkputz",
      icon: <Compass size={22} color="var(--primary)" />,
      title: "Kalkputz & Wandaufbau",
      heading: "Diffusionsoffene Wände, die atmen und Ruhe ausstrahlen",
      intro: "Keine künstlichen Versiegelungen, kein Plastik. Mit reinem Sumpfkalk und Lehmputz schaffen wir biologisch reine Oberflächen, die ein gesundes Wohnklima fördern und das einfallende Tageslicht auf eine unnachahmlich samtige Weise brechen.",
      bullets: [
        { label: "Schimmelresistente Biologie", desc: "Natürlicher Schutz vor Sporen und Feuchtigkeit durch den hohen pH-Wert reinsten mineralischen Sumpfkalks." },
        { label: "Schadstofffreie Raumluft", desc: "100% frei von synthetischen Klebern, Weichmachern (VOCs) oder künstlichen Dispersionsbindemitteln." },
        { label: "Ästhetische Haptik", desc: "Fein strukturierte Oberflächen, die Licht beruhigend reflektieren und Räumen spürbaren Charakter schenken." }
      ],
      cta: "Materialberatung vereinbaren",
      img: "https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/work4palace/Bad%20nachher%202.jpg",
      badge: "100% Mineralisch",
      isDark: true
    },
    {
      id: "boden",
      icon: <Trees size={22} color="var(--primary)" />,
      title: "Bodenaufbau & Echtholz",
      heading: "Böden mit Ewigkeitswert und barfuß-warmer Aura",
      intro: "Ein langlebiger Holzboden verlangt ein perfektes Fundament. Wir planen und sanieren Ihren Bodenaufbau von der Rohdecke bis zur handverlegten Massivdiele – absolut eben, schallentkoppelt und mit schadstofffreien Ölen veredelt.",
      bullets: [
        { label: "Massive Meisterdielen", desc: "Auswahl edelster, charaktervoller Laub- und Nadelhölzer mit fühlbarer Maserung und Langlebigkeit." },
        { label: "Akustische Entkopplung", desc: "Erstklassige Trittschalldämmung und schwingungsfreie Balkenlagerung im Altbau für ruhiges Wohnen." },
        { label: "Biologische Veredelung", desc: "Tiefenwirksame Naturöle schützen die Holzfaser von innen heraus und erhalten die natürliche Atmungsaktivität." }
      ],
      cta: "Bodenveredelung planen",
      img: "https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/work4palace/terrazzo%20neu.jpg",
      badge: "Echtholz-Garantie",
      isDark: false
    },
    {
      id: "ausbau",
      icon: <Hammer size={22} color="var(--primary)" />,
      title: "Innenausbau",
      heading: "Flächenbündige Präzision und ruhige Linienführung",
      intro: "Wir erschaffen neue Räume mit klaren Proportionen und exzellenten Übergängen. Unser anspruchsvoller Innenausbau zeichnet sich durch millimetergenaue Spachtelarbeiten (Q3/Q4) und flächenbündig integrierte Details aus.",
      bullets: [
        { label: "Makellose Q4-Flächen", desc: "Absolut plane, streiflichtfreie Wand- und Deckenflächen für höchste ästhetische Ansprüche." },
        { label: "Elegante Geometrie", desc: "Flächenbündige Übergänge, harmonische Schattenfugen und durchdachte, ruhige Raumaufteilungen." },
        { label: "Geprüfte Bauphysik", desc: "Konsequenter Schall- und Wärmeschutz nach DIN-Norm für ungestörten, privaten Wohnkomfort." }
      ],
      cta: "Details besprechen",
      img: "https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/work4palace/Bad%20nachher.jpg",
      badge: "Q4 Oberflächen",
      isDark: true
    },
    {
      id: "trockenbau",
      icon: <Scissors size={22} color="var(--primary)" />,
      title: "Rückbau & Vorbereitung",
      heading: "Sauberer Schnitt für eine makellose Neuentstehung",
      intro: "Jedes meisterhafte Ergebnis braucht eine perfekte, unbelastete Grundlage. Wir entfernen Altlasten, instabile Putze und marode Wandaufbauten extrem behutsam, absolut staubgeschützt und statisch hochpräzise.",
      bullets: [
        { label: "Konsequenter Staubschutz", desc: "Der Einsatz leistungsstarker Unterdruckgeräte und Staubschutztüren hält Ihre Wohnbereiche absolut staubfrei." },
        { label: "Substanzschonend", desc: "Freilegung historischer Bausubstanz ohne Erschütterungen oder Schäden an erhaltenswerten Bauteilen." },
        { label: "Lückenlose Trocknung", desc: "Fachgerechte Freilegung verdeckter Schichten zur optimalen Trocknung und Sanierungsvorbereitung." }
      ],
      cta: "Rückbau anfragen",
      img: "https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/work4palace/Bad%20vorher.jpg",
      badge: "Staubschutz-Garantie",
      isDark: false
    },
    {
      id: "komplett",
      icon: <Layers2 size={22} color="var(--primary)" />,
      title: "Komplettsanierung",
      heading: "Komplexe Prozesse. Eine meisterliche Koordination.",
      intro: "Viele Gewerke, null Sorgen. Wir übernehmen die vollumfängliche, staubgeschützte Realisierung Ihrer Innensanierung aus einer Hand – mit verlässlicher Terminplanung, absoluter Kostensicherheit und persönlicher Begleitung.",
      bullets: [
        { label: "Alles aus einer Hand", desc: "Perfekt getaktete Meilensteine vom ersten Rückbau über alle Putz- und Dielenarbeiten bis zum bezugsfertigen Finish." },
        { label: "Feste Bauleitung vor Ort", desc: "Tina Heinecke ist Ihre persönliche Ansprechpartnerin vor Ort und steuert alle handwerklichen Details." },
        { label: "Ehrliche Festpreis-Planung", desc: "Transparente, verbindliche Kalkulationen ohne versteckte Kosten oder böse Überraschungen." }
      ],
      cta: "Komplettprojekt anfragen",
      img: "https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/work4palace/Bad%20nachher%202.jpg",
      badge: "Schlüsselfertig",
      isDark: true
    }
  ];

  // Active section state for ScrollSpy
  const [activeSection, setActiveSection] = useState<string>("altbau");

  // ScrollSpy trigger logic using IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0.05,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Guided smooth scrolling function
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90; // Fixed navbar spacing offset
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  // Motion variants for staggered entry
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
        delayChildren: 0.2
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
      {/* Editorial Services Hero */}
      <section className="section section-dark" style={heroSectionStyle}>
        <div className="container" style={{ zIndex: 3 }}>
          <div style={{ maxWidth: "850px" }}>
            <motion.span 
              className="section-eyebrow"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              Exklusives Manufakturhandwerk
            </motion.span>
            <motion.h1 
              style={heroHeadlineStyle}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              Sanierungsarbeiten für gehobenen Wohnwert
            </motion.h1>
            <motion.p 
              style={heroSublineStyle}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            >
              Von der Bausubstanz bis zur vollendeten Oberfläche: work4palace verbindet meisterhaftes Handwerk mit einer wohngesunden, atmungsaktiven Materialästhetik für Ihren historischen Altbau.
            </motion.p>
            <motion.button 
              className="btn btn-primary" 
              onClick={onContactClick} 
              style={{ padding: "1.1rem 2.25rem" }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sanierungsprojekt besprechen
              <ArrowRight size={14} style={{ marginLeft: "0.5rem" }} />
            </motion.button>
          </div>
        </div>
        <div style={glowOverlayStyle}></div>
      </section>

      {/* High-Converting Trust Ribbon (Leistungs-Fundament) */}
      <section className="services-trust-ribbon">
        <div className="container">
          <div className="trust-ribbon-grid">
            <motion.div 
              className="trust-ribbon-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
            >
              <div className="trust-ribbon-icon-wrap">
                <CheckCircle2 size={20} color="var(--primary)" />
              </div>
              <div className="trust-ribbon-content">
                <h3>100% Wohngesundheit</h3>
                <p>Diffusionsoffene, rein mineralische Sumpfkalkputze für ein natürlich reguliertes, allergikerfreundliches Raumklima.</p>
              </div>
            </motion.div>

            <motion.div 
              className="trust-ribbon-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
            >
              <div className="trust-ribbon-icon-wrap">
                <Hammer size={20} color="var(--primary)" />
              </div>
              <div className="trust-ribbon-content">
                <h3>Lückenloser Staubschutz</h3>
                <p>Luftreiniger mit HEPA-Filtern, dichte Staubschutzwände und Unterdruck halten angrenzende Wohnräume staubfrei.</p>
              </div>
            </motion.div>

            <motion.div 
              className="trust-ribbon-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
            >
              <div className="trust-ribbon-icon-wrap">
                <Layers size={20} color="var(--primary)" />
              </div>
              <div className="trust-ribbon-content">
                <h3>Direkte Meister-Führung</h3>
                <p>Verlässliche Bauleitung durch Tina Heinecke – kein unkoordiniertes Hin- und Herschieben von Subunternehmern.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bespoke Interactive "Leistungs-Radar" Navigation Bar with Shared Layout Pill */}
      <div className="services-radar-navbar">
        <div className="container">
          <div className="radar-grid">
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`radar-tab-btn ${activeSection === sec.id ? "active" : ""}`}
              >
                <AnimatePresence>
                  {activeSection === sec.id && (
                    <motion.div
                      layoutId="activeRadarTab"
                      className="radar-tab-active-bg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </AnimatePresence>
                <span className="radar-tab-icon" style={{ zIndex: 2 }}>{sec.icon}</span>
                <span className="radar-tab-label" style={{ zIndex: 2 }}>{sec.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Alternating One-Pager Detailed Content Rows with scroll reveal */}
      {sections.map((sec, idx) => (
        <section 
          key={sec.id} 
          id={sec.id}
          className={`section ${sec.isDark ? "section-dark" : "section-light"}`}
          style={{ borderBottom: sec.isDark ? "1px solid var(--border-light)" : "1px solid var(--border-dark)" }}
        >
          <div className="container">
            <div 
              className="grid-2" 
              style={{ 
                direction: idx % 2 === 0 ? "ltr" : "rtl",
                alignItems: "center"
              }}
            >
              {/* Text side with staggered animation */}
              <motion.div 
                style={{ direction: "ltr", display: "flex", flexDirection: "column", gap: "1.5rem" }}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div style={{ display: "flex", alignItems: "center", gap: "1rem" }} variants={fadeUpVariant}>
                  <div style={{ 
                    width: "48px", 
                    height: "48px", 
                    backgroundColor: sec.isDark ? "rgba(255,255,255,0.03)" : "rgba(18,17,15,0.03)", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    border: sec.isDark ? "1px solid var(--border-light)" : "1px solid var(--border-dark)"
                  }}>
                    {sec.icon}
                  </div>
                  <span className="section-eyebrow" style={{ marginBottom: 0 }}>{sec.title}</span>
                </motion.div>
                
                <motion.h2 
                  className="section-title" 
                  style={{ 
                    fontSize: "2.5rem", 
                    lineHeight: "1.25", 
                    color: sec.isDark ? "var(--text-light)" : "var(--text-dark)",
                    maxWidth: "600px" 
                  }}
                  variants={fadeUpVariant}
                >
                  {sec.heading}
                </motion.h2>
                
                <motion.p 
                  style={{ 
                    color: sec.isDark ? "var(--text-muted-light)" : "var(--text-muted-dark)", 
                    fontSize: "1.08rem", 
                    lineHeight: "1.7", 
                    fontWeight: 300,
                    maxWidth: "580px"
                  }}
                  variants={fadeUpVariant}
                >
                  {sec.intro}
                </motion.p>

                {/* 3-Bullet Premium Guarantee Checklist */}
                <motion.ul 
                  className="trust-list" 
                  style={{ marginTop: "1rem", marginBottom: "2rem" }}
                  variants={listContainer}
                >
                  {sec.bullets.map((bullet, bIdx) => (
                    <motion.li 
                      key={bIdx} 
                      className="trust-list-item" 
                      style={{ fontSize: "0.95rem" }}
                      variants={listItemVariant}
                    >
                      <motion.div 
                        className="trust-check-icon" 
                        style={{ marginTop: "0.2rem" }}
                        whileHover={{ scale: 1.15 }}
                      >
                        <CheckCircle2 size={13} color="var(--primary)" />
                      </motion.div>
                      <div>
                        <strong style={{ color: sec.isDark ? "var(--text-light)" : "var(--text-dark)", fontWeight: 600 }}>{bullet.label}:</strong>{" "}
                        <span style={{ color: sec.isDark ? "var(--text-muted-light)" : "var(--text-muted-dark)", fontWeight: 300 }}>{bullet.desc}</span>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.button 
                  className="btn btn-secondary" 
                  onClick={onContactClick}
                  style={{ alignSelf: "flex-start", marginTop: "0.5rem", padding: "0.9rem 2rem" }}
                  variants={fadeUpVariant}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    {sec.cta}
                    <motion.span
                      variants={{
                        hover: { x: 5 },
                        initial: { x: 0 }
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight size={14} />
                    </motion.span>
                  </motion.span>
                </motion.button>
              </motion.div>

              {/* Image side with custom blueprint technical border and hover glows */}
              <motion.div 
                className="services-photo-column"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.1, ease }}
              >
                <div className="services-photo-wrapper" style={{ borderColor: sec.isDark ? "var(--border-light)" : "var(--border-dark)" }}>
                  {/* Technical Blueprint overlay line structures */}
                  <div className="blueprint-line blueprint-line-x"></div>
                  <div className="blueprint-line blueprint-line-y"></div>

                  {/* Corner marks for Drafting aesthetic */}
                  <div className="corner-mark top-left"></div>
                  <div className="corner-mark top-right"></div>
                  <div className="corner-mark bottom-left"></div>
                  <div className="corner-mark bottom-right"></div>

                  {/* Glassmorphic live quality spec badge */}
                  <div className="tech-badge">
                    <span className="badge-pulse-dot"></span>
                    <span>{sec.badge}</span>
                  </div>

                  <div className="services-photo-inner">
                    <img 
                      src={sec.img} 
                      alt={sec.heading} 
                      loading="lazy"
                      draggable="false"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <section className="section section-dark" style={{ borderTop: "1px solid var(--border-light)" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <span className="section-eyebrow">Gemeinsam Realisieren</span>
          <h2 className="section-title" style={{ fontSize: "3rem" }}>Bereit für Qualität, die bleibt?</h2>
          <p style={{ color: "var(--text-muted-light)", marginBottom: "3rem", fontSize: "1.1rem", lineHeight: "1.7", fontWeight: 300 }}>
            Lassen Sie uns Ihr Gebäude besprechen. Wir freuen uns darauf, die historische Bausubstanz Ihres Objektes in einen wohngesunden, edlen Lebensbereich zu transformieren.
          </p>
          <button className="btn btn-primary" onClick={onContactClick} style={{ padding: "1.1rem 2.25rem" }}>
            Sanierungsprojekt anfragen
            <ArrowRight size={14} style={{ marginLeft: "0.5rem" }} />
          </button>
        </div>
      </section>

      {/* CAPSULED PRESTIGE STYLING TAG */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Foundations of our Work (Trust Ribbon) */
        .services-trust-ribbon {
          background-color: var(--bg-dark-soft);
          border-bottom: 1px solid var(--border-light);
          padding: 4rem 0;
          position: relative;
          z-index: 10;
        }
        .trust-ribbon-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
        }
        .trust-ribbon-card {
          display: flex;
          gap: 1.25rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-light);
          border-radius: 4px;
          transition: var(--transition-smooth);
        }
        .trust-ribbon-card:hover {
          border-color: var(--primary);
          background: rgba(255, 255, 255, 0.03);
          box-shadow: 0 10px 25px rgba(184, 105, 69, 0.05);
          transform: translateY(-2px);
        }
        .trust-ribbon-icon-wrap {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(184, 105, 69, 0.08);
          border: 1px solid rgba(184, 105, 69, 0.15);
        }
        .trust-ribbon-content h3 {
          font-family: var(--font-sans);
          font-size: 1.05rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--text-light);
        }
        .trust-ribbon-content p {
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--text-muted-light);
          font-weight: 300;
        }

        /* Leistungs-Radar Sticky Navbar */
        .services-radar-navbar {
          position: sticky;
          top: 75px;
          background-color: var(--bg-dark-soft);
          border-bottom: 1px solid var(--border-light);
          z-index: 100;
          padding: 1rem 0;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          backdrop-filter: blur(15px);
        }
        .radar-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 1rem;
          width: 100%;
        }
        .radar-tab-btn {
          position: relative;
          background: none;
          border: 1px solid transparent;
          padding: 0.75rem 0.5rem;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          transition: var(--transition-fast);
          text-align: center;
          border-radius: 8px;
        }
        .radar-tab-btn:hover {
          transform: translateY(-1px);
        }
        .radar-tab-active-bg {
          position: absolute;
          inset: 0;
          background-color: rgba(184, 105, 69, 0.08);
          border: 1px solid rgba(184, 105, 69, 0.25);
          border-radius: 8px;
          z-index: 1;
        }
        .radar-tab-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          transition: var(--transition-fast);
        }
        .radar-tab-btn.active .radar-tab-icon {
          transform: scale(1.05);
        }
        .radar-tab-label {
          font-family: var(--font-sans);
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted-light);
          font-weight: 500;
          transition: var(--transition-fast);
        }
        .radar-tab-btn.active .radar-tab-label {
          color: var(--primary);
          font-weight: 600;
        }
        .radar-tab-btn:hover .radar-tab-label {
          color: var(--text-light);
        }

        /* Blueprint Photo Frame wraps */
        .services-photo-column {
          width: 100%;
        }
        .services-photo-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          border: 1px solid;
          overflow: hidden;
          box-shadow: var(--shadow-luxury);
          transition: var(--transition-smooth);
          border-radius: 4px;
        }
        .services-photo-inner {
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 3px;
        }
        .services-photo-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .services-photo-wrapper:hover {
          border-color: var(--primary) !important;
          box-shadow: 0 25px 50px rgba(184, 105, 69, 0.14);
        }
        .services-photo-wrapper:hover img {
          transform: scale(1.05);
        }

        /* Blueprint Overlays & Drafting Corner Klammern */
        .blueprint-line {
          position: absolute;
          border: 1px dashed rgba(184, 105, 69, 0.08);
          transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 3;
          pointer-events: none;
        }
        .blueprint-line-x {
          left: 14px;
          right: 14px;
          top: 50%;
          height: 0;
        }
        .blueprint-line-y {
          top: 14px;
          bottom: 14px;
          left: 50%;
          width: 0;
        }
        .services-photo-wrapper:hover .blueprint-line {
          border-color: rgba(184, 105, 69, 0.22);
        }
        
        .corner-mark {
          position: absolute;
          width: 12px;
          height: 12px;
          border: 1px solid transparent;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 5;
          pointer-events: none;
        }
        .corner-mark.top-left {
          top: 8px;
          left: 8px;
          border-top-color: var(--text-muted-light);
          border-left-color: var(--text-muted-light);
        }
        .corner-mark.top-right {
          top: 8px;
          right: 8px;
          border-top-color: var(--text-muted-light);
          border-right-color: var(--text-muted-light);
        }
        .corner-mark.bottom-left {
          bottom: 8px;
          left: 8px;
          border-bottom-color: var(--text-muted-light);
          border-left-color: var(--text-muted-light);
        }
        .corner-mark.bottom-right {
          bottom: 8px;
          right: 8px;
          border-bottom-color: var(--text-muted-light);
          border-right-color: var(--text-muted-light);
        }

        .services-photo-wrapper:hover .corner-mark {
          border-color: var(--primary) !important;
        }
        .services-photo-wrapper:hover .corner-mark.top-left { transform: translate(-3px, -3px); }
        .services-photo-wrapper:hover .corner-mark.top-right { transform: translate(3px, -3px); }
        .services-photo-wrapper:hover .corner-mark.bottom-left { transform: translate(-3px, 3px); }
        .services-photo-wrapper:hover .corner-mark.bottom-right { transform: translate(3px, 3px); }

        /* Dynamic Glassmorphic Tech Badge */
        .tech-badge {
          position: absolute;
          top: 18px;
          right: 18px;
          background: rgba(28, 26, 23, 0.72);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--border-light);
          padding: 0.45rem 0.8rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-sans);
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-light);
          border-radius: 4px;
          z-index: 4;
          box-shadow: 0 6px 15px rgba(0,0,0,0.2);
          transition: var(--transition-fast);
        }
        .services-photo-wrapper:hover .tech-badge {
          border-color: var(--primary);
          background: rgba(28, 26, 23, 0.85);
        }
        .badge-pulse-dot {
          width: 6px;
          height: 6px;
          background-color: var(--primary);
          border-radius: 50%;
          animation: pulse-badge 1.8s infinite ease-in-out;
        }
        @keyframes pulse-badge {
          0% { transform: scale(0.9); opacity: 0.6; }
          50% { transform: scale(1.35); opacity: 1; box-shadow: 0 0 8px var(--primary); }
          100% { transform: scale(0.9); opacity: 0.6; }
        }

        /* Responsive Adaptations */
        @media (max-width: 1100px) {
          .trust-ribbon-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .radar-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.75rem;
          }
          .services-radar-navbar {
            position: relative;
            top: 0;
            margin-bottom: 2rem;
          }
        }
        @media (max-width: 600px) {
          .radar-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .section-title {
            font-size: 2rem !important;
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

export default Services;
