import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hammer, Trash2, Layers, Trees, Compass, ArrowRight, ClipboardCheck, ChevronLeft, ChevronRight, CheckCircle2, Mail, Award } from "lucide-react";
import ArchitecturalHero from "../components/ArchitecturalHero";
import BeforeAfterSlider from "../components/BeforeAfterSlider";

interface HomeProps {
  onContactClick: () => void;
  onServicesClick: () => void;
  onProjectsClick: () => void;
}

const testimonials = [
  {
    quote: "Die komplette Badsanierung und der Kalkputz in unserem Fachwerkhaus im Landkreis Nienburg übertreffen alle Erwartungen. Tina Heinecke und ihr Team arbeiten unglaublich sauber, strukturiert und lösungsorientiert. Die ehrliche Materialästhetik spürt man an jedem Detail.",
    author: "Dr. M. Lindner",
    location: "Landkreis Nienburg",
    project: "Fachwerk-Restaurierung & Kalkputz"
  },
  {
    quote: "work4palace hat den historischen Dielenboden und den Wandaufbau unserer Jugendstilvilla in Hannover restauriert. Ruhiger Luxus statt lauter Baustellenoptik – ein exzellentes Handwerk, dem man vollkommen vertrauen kann.",
    author: "Familie Brandes",
    location: "Hannover",
    project: "Echtholzdielen & Ausbau"
  },
  {
    quote: "Vom selektiven Rückbau bis zum bezugsfertigen Finish lief alles transparent und absolut zuverlässig. Keine leeren Handwerker-Versprechen, sondern meisterliche Qualität mit Substanz, die jeden Euro wert ist.",
    author: "S. Westermann",
    location: "Uchte",
    project: "Komplettsanierung Altbau"
  }
];

const Home: React.FC<HomeProps> = ({ onContactClick, onServicesClick, onProjectsClick }) => {
  const ease = [0.16, 1, 0.3, 1] as const;
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // States for the inline Homepage Project Planner Widget
  const [plannerStep, setPlannerStep] = useState(1);
  const [plannerData, setPlannerData] = useState({
    projectType: "",
    scopeSize: "50-100 qm",
    location: "",
    timeframe: "",
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [plannerSuccess, setPlannerSuccess] = useState(false);

  // States & helper functions for simulated premium Drag & Drop Photo Uploader
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string }[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFiles = (files: FileList) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate premium visual uploader progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          const newFiles: { name: string; size: string }[] = [];
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
            newFiles.push({ name: file.name, size: `${sizeInMb} MB` });
          }
          setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
          return 100;
        }
        return prev + 25;
      });
    }, 150);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFiles(e.target.files);
    }
  };

  const removeUploadedFile = (indexToRemove: number) => {
    setUploadedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // 6 Leistungen on Startseite - dynamic icon inheritance
  const services = [
    {
      icon: <Layers size={24} />,
      title: "Altbausanierung",
      subtitle: "Substanz erhalten. Wohnwert schaffen.",
      desc: "Wir sanieren Altbauten mit Respekt vor dem Bestand und Blick auf modernes Wohnen. Dabei verbinden wir handwerkliche Erfahrung mit klaren Lösungen für heutige Ansprüche."
    },
    {
      icon: <Trash2 size={24} />,
      title: "Rückbau & Vorbereitung",
      subtitle: "Sauber beginnen, besser sanieren.",
      desc: "Ein hochwertiges Ergebnis entsteht durch eine saubere Grundlage. Wir übernehmen Rückbauarbeiten, bereiten Flächen vor und schaffen die Basis für den weiteren Aufbau."
    },
    {
      icon: <Compass size={24} />,
      title: "Wandaufbau & Kalkputz",
      subtitle: "Natürliche Oberflächen mit Charakter.",
      desc: "Kalkputz steht für ein angenehmes Raumgefühl, natürliche Ästhetik und hochwertige Wandgestaltung. Wir schaffen Oberflächen, die ruhig wirken und Räume sichtbar aufwerten."
    },
    {
      icon: <Trees size={24} />,
      title: "Bodenaufbau & Echtholz",
      subtitle: "Böden, die Wärme und Wert ausstrahlen.",
      desc: "Vom Untergrund bis zur fertigen Fläche kümmern wir uns um durchdachte Bodenaufbauten und hochwertige Materialien wie Echtholz – für langlebige Räume mit natürlicher Wirkung."
    },
    {
      icon: <Hammer size={24} />,
      title: "Innenausbau",
      subtitle: "Durchdachte Räume bis ins Detail.",
      desc: "Wir begleiten den Innenausbau mit sauberer Ausführung, präziser Montage und einem Blick für Proportionen, Materialien und Nutzbarkeit."
    },
    {
      icon: <ClipboardCheck size={24} />,
      title: "Komplettsanierung",
      subtitle: "Ein Ansprechpartner für viele Schritte.",
      desc: "Vom ersten Eingriff bis zum fertigen Raum koordinieren und realisieren wir Sanierungsarbeiten effizient und zuverlässig – ideal für Eigentümer, die Wert auf klare Abläufe legen."
    }
  ];

  // Warum work4palace?
  const whyPoints = [
    {
      title: "Hochwertige Materialästhetik",
      text: "Wir setzen auf Materialien, die Räume aufwerten: Kalkputz, Echtholz, natürliche Strukturen und ruhige Oberflächen."
    },
    {
      title: "Saubere handwerkliche Ausführung",
      text: "Gute Sanierung erkennt man an Details: geraden Übergängen, sauberem Aufbau und einem Ergebnis, das nicht nur auf Fotos überzeugt."
    },
    {
      title: "Verständnis für Altbau und Bestand",
      text: "Alte Gebäude brauchen Erfahrung, Geduld und die richtigen Entscheidungen. Wir erhalten, was wertvoll ist, und erneuern, was neu gedacht werden muss."
    },
    {
      title: "Klare Abläufe",
      text: "Von der ersten Besichtigung bis zur fertigen Oberfläche arbeiten wir strukturiert, zuverlässig und lösungsorientiert."
    }
  ];

  // Ablauf steps (Premium process flow cards)
  const processSteps = [
    {
      num: "01",
      icon: <Mail size={22} />,
      title: "Voranalyse in 24h",
      desc: "Sie übermitteln uns Wünsche & Fotos. Tina Heinecke prüft Ihre baulichen Potenziale kostenfrei innerhalb von 24 Stunden."
    },
    {
      num: "02",
      icon: <Compass size={22} />,
      title: "Substanz-Ortstermin",
      desc: "Wir analysieren die Bausubstanz direkt an Ihrem Objekt – von der Feuchtigkeitsdiffusion bis zur Tragfähigkeit alter Dielen."
    },
    {
      num: "03",
      icon: <Award size={22} />,
      title: "Der Festpreis-Entwurf",
      desc: "Sie erhalten einen detaillierten Material-Fahrplan mit transparentem Festpreis. Keine versteckten Kosten."
    },
    {
      num: "04",
      icon: <Hammer size={22} />,
      title: "Meisterhafter Aufbau",
      desc: "Staubgeschützter selektiver Rückbau und millimetergenauer Aufbau durch unsere qualifizierten Manufaktur-Handwerker."
    },
    {
      num: "05",
      icon: <CheckCircle2 size={22} />,
      title: "Schlüsselübergabe",
      desc: "Nach einer meisterlichen Abnahme übergeben wir Ihren bezugsfertigen, exklusiven Lebensraum mit Ewigkeitswert."
    }
  ];

  return (
    <div>
      {/* Cinematic Blueprint Hero */}
      <ArchitecturalHero
        onExploreClick={onProjectsClick}
        onContactClick={onContactClick}
      />

      {/* Intro-Abschnitt (Marketing-Optimized with checkmarks & Luxury Image Stack) */}
      <section className="section section-light attitude-section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: "center" }}>
            
            {/* Left Column: Bold emotional copy, bullet checks & micro CTA */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08
                  }
                }
              }}
            >
              <motion.span 
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="section-eyebrow"
              >
                Unsere Haltung
              </motion.span>
              <motion.h2 
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="section-title" 
                style={{ color: "var(--text-dark)", fontSize: "3.25rem", lineHeight: "1.15", marginBottom: "2rem" }}
              >
                Aus alter Substanz wird vollendete Wohnkultur.
              </motion.h2>
              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                style={{ color: "var(--text-dark)", fontSize: "1.25rem", fontWeight: 400, marginBottom: "1.75rem", borderLeft: "2px solid var(--primary)", paddingLeft: "1rem" }}
              >
                Wir restaurieren nicht einfach Oberflächen – wir reaktivieren die historische Würde Ihres Gebäudes. Mit natürlichen Mineralstoffen und kompromissloser handwerklicher Präzision.
              </motion.p>
              
              <motion.ul 
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.06
                    }
                  }
                }}
                className="trust-list" 
                style={{ marginBottom: "2.5rem" }}
              >
                <motion.li 
                  variants={{
                    hidden: { opacity: 0, x: -15 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="trust-list-item"
                >
                  <div className="trust-check-icon">
                    <CheckCircle2 size={14} />
                  </div>
                  <div>
                    <strong>Substanzerhaltendes Veredeln:</strong> Wir erhalten den historischen Kern und integrieren moderne Wohnstandards mit Fingerspitzengefühl.
                  </div>
                </motion.li>
                <motion.li 
                  variants={{
                    hidden: { opacity: 0, x: -15 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="trust-list-item"
                >
                  <div className="trust-check-icon">
                    <CheckCircle2 size={14} />
                  </div>
                  <div>
                    <strong>Atmungsaktiver Sumpfkalkputz:</strong> Reiner, mineralischer Wandaufbau, der Schimmel vorbeugt und das Raumklima natürlich reguliert.
                  </div>
                </motion.li>
                <motion.li 
                  variants={{
                    hidden: { opacity: 0, x: -15 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="trust-list-item"
                >
                  <div className="trust-check-icon">
                    <CheckCircle2 size={14} />
                  </div>
                  <div>
                    <strong>Ehrliche Materialästhetik:</strong> Massives Echtholz, handverlesene Strukturen und nahtlose Übergänge für spürbaren Wert.
                  </div>
                </motion.li>
              </motion.ul>

              <motion.button 
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="btn btn-primary" 
                onClick={onContactClick}
                style={{ padding: "1.1rem 2.25rem" }}
              >
                Sanierung besprechen
                <ArrowRight size={14} style={{ marginLeft: "0.5rem" }} />
              </motion.button>
            </motion.div>

            {/* Right Column: Premium Asymmetric side-by-side layout with fine limestone frames */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="attitude-asymmetric-wrapper"
            >
              <div className="attitude-editorial-grid">
                {/* Large Portrait Restoration Frame */}
                <div className="blueprint-editorial-frame frame-left">
                  <div className="blueprint-frame-decor">
                    <span className="frame-corner corner-tl"></span>
                    <span className="frame-corner corner-tr"></span>
                    <span className="frame-corner corner-bl"></span>
                    <span className="frame-corner corner-br"></span>
                  </div>
                  <div className="frame-img-wrap">
                    <img 
                      src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/work4palace/469876073_122131236716500648_950492279169535038_n.jpg" 
                      alt="Historische Altbausanierung work4palace" 
                      className="frame-img"
                      draggable="false"
                      loading="lazy"
                    />
                  </div>
                  <div className="frame-badge">Restaurierung</div>
                </div>

                {/* Staggered Square Material Frame */}
                <div className="blueprint-editorial-frame frame-right">
                  <div className="blueprint-frame-decor">
                    <span className="frame-corner corner-tl"></span>
                    <span className="frame-corner corner-tr"></span>
                    <span className="frame-corner corner-bl"></span>
                    <span className="frame-corner corner-br"></span>
                  </div>
                  <div className="frame-img-wrap">
                    <img 
                      src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/work4palace/470136744_122131658180500648_1991235812106690479_n.jpg" 
                      alt="Mineralischer Wandaufbau Sumpfkalk" 
                      className="frame-img"
                      draggable="false"
                      loading="lazy"
                    />
                  </div>
                  <div className="frame-badge badge-primary">Details & Mineralik</div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Problem-vs-Solution Column (Pain vs. Manufaktur Verdict - Sleek Hairline Redesign) */}
      <section className="section section-dark" style={{ borderTop: "1px solid var(--border-light)", borderBottom: "1px solid var(--border-light)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <span className="section-eyebrow">Qualitätsanspruch</span>
            <h2 className="section-title" style={{ fontSize: "3rem" }}>Warum gewöhnliche Renovierungen scheitern</h2>
            <p className="section-desc" style={{ color: "var(--text-muted-light)", margin: "0 auto", maxWidth: "700px" }}>
              Eine erstklassige Sanierung entscheidet sich hinter der fertigen Oberfläche. Wir kontrastieren den herkömmlichen Sanierungsschmerz mit unserer kompromisslosen Manufaktur-Methode.
            </p>
          </div>

          <div className="pain-verdict-grid">
            {/* The Pain Column */}
            <div className="pain-box">
              <h3 className="pain-title">❌ Gewöhnlicher Renovierungsstau</h3>
              
              <div className="compare-row">
                <span className="compare-num pain-num">01</span>
                <span className="compare-text pain-text">
                  <strong>Künstliche Wand-Barrieren</strong>
                  Gipsplatten & Dispersionskleber sperren Feuchtigkeit ab – erhöhtes Schimmelrisiko im Altbau.
                </span>
              </div>

              <div className="compare-row">
                <span className="compare-num pain-num">02</span>
                <span className="compare-text pain-text">
                  <strong>Detail-Ungenauigkeiten</strong>
                  Wellige Spachtelung, schiefe Fugen & unsaubere Übergänge mindern den Wert Ihrer Immobilie.
                </span>
              </div>

              <div className="compare-row">
                <span className="compare-num pain-num">03</span>
                <span className="compare-text pain-text">
                  <strong>Subunternehmer-Chaos</strong>
                  Häufige Verzögerungen, wechselnde Akkord-Kolonnen & fehlende persönliche Verantwortung vor Ort.
                </span>
              </div>
            </div>

            {/* The work4palace Verdict Column */}
            <div className="verdict-box">
              <h3 className="verdict-title">✨ Die work4palace Manufaktur-Methode</h3>

              <div className="compare-row">
                <span className="compare-num verdict-num">01</span>
                <span className="compare-text verdict-text">
                  <strong>100% Mineralisches Raumklima</strong>
                  Sumpfkalk & natürlicher Lehmputz absorbieren Feuchtigkeit vollkommen biologisch und schimmelfrei.
                </span>
              </div>

              <div className="compare-row">
                <span className="compare-num verdict-num">02</span>
                <span className="compare-text verdict-text">
                  <strong>Absolute DIN-Präzision</strong>
                  Millimetergenaues Finish nach DIN 18202 & absolut bündige, meisterhafte Wand-Boden-Übergänge.
                </span>
              </div>

              <div className="compare-row">
                <span className="compare-num verdict-num">03</span>
                <span className="compare-text verdict-text">
                  <strong>Tina Heinecke Garantie</strong>
                  Persönliche Projektleitung vor Ort vom staubgeschützten Rückbau bis zur Übergabe.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sensory Material Experience Showcase */}
      <section className="section section-dark" style={{ borderTop: "1px solid var(--border-light)", borderBottom: "1px solid var(--border-light)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span className="section-eyebrow">Haptik & Natur</span>
            <h2 className="section-title" style={{ fontSize: "3rem" }}>Die Poesie ehrlicher Werkstoffe</h2>
            <p className="section-desc" style={{ color: "var(--text-muted-light)", margin: "0 auto", maxWidth: "750px" }}>
              Eine exklusive Sanierung entscheidet sich über das Gefühl unter den Fingerspitzen und das Wohlbefinden im Raum. Wir arbeiten konsequent mit diffusionsoffenen, edlen Materialien, die atmen und Charakter ausstrahlen.
            </p>
          </div>

          <div className="material-showcase-grid">
            {/* Card 1 */}
            <div className="material-preview-card">
              <img 
                src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/work4palace/Bad%20nachher%202.jpg" 
                alt="Edler Sumpfkalkputz" 
                className="material-preview-card-img" 
                draggable="false"
              />
              <div className="material-preview-card-overlay">
                <span className="section-eyebrow" style={{ color: "var(--primary)", marginBottom: "0.25rem" }}>01. Wände</span>
                <h3 className="material-title">Kalk- & Sumpfkalkputz</h3>
                <div className="material-desc-wrapper">
                  <p className="material-desc">
                    Reiner, mehrschichtig aufgetragener Sumpfkalk ist hochgradig diffusionsoffen. Er nimmt überschüssige Feuchtigkeit auf, beugt Schimmel vor und erzeugt eine samtweiche, beruhigende Wandoptik.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="material-preview-card">
              <img 
                src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/work4palace/Bad%20nachher%203.jpg" 
                alt="Massive Hobeldielen" 
                className="material-preview-card-img" 
                draggable="false"
              />
              <div className="material-preview-card-overlay">
                <span className="section-eyebrow" style={{ color: "var(--primary)", marginBottom: "0.25rem" }}>02. Boden</span>
                <h3 className="material-title">Massive Dielen & Echtholz</h3>
                <div className="material-desc-wrapper">
                  <p className="material-desc">
                    Laufwarme, meisterhaft veredelte Dielenböden. Wir restaurieren historische Bestände oder verlegen neue Massivholzdielen, die barfuß ein warmes Gefühl von Beständigkeit schenken.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="material-preview-card">
              <img 
                src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/work4palace/terrazzo%20neu.jpg" 
                alt="Feiner Terrazzoboden" 
                className="material-preview-card-img" 
                draggable="false"
              />
              <div className="material-preview-card-overlay">
                <span className="section-eyebrow" style={{ color: "var(--primary)", marginBottom: "0.25rem" }}>03. Stein</span>
                <h3 className="material-title">Restaurierter Terrazzo</h3>
                <div className="material-desc-wrapper">
                  <p className="material-desc">
                    Fugenloser Mineralstein und Terrazzo sind Denkmäler handwerklicher Perfektion. Durch feinsten mehrstufigen Nassschliff erwecken wir antike Glanzflächen zu ewigem, modernem Wert.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leistungen auf der Startseite */}
      <section className="section section-light">
        <div className="container">
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <span className="section-eyebrow">Leistungsspektrum</span>
            <h2 className="section-title" style={{ color: "var(--text-dark)" }}>Sanierung vom Rückbau bis zur fertigen Oberfläche</h2>
            <p className="section-desc" style={{ color: "var(--text-muted-dark)", margin: "0 auto 3rem auto" }}>
              work4palace übernimmt die entscheidenden Arbeiten im Innenbereich – präzise, effizient und abgestimmt auf das Ziel: Räume, die wieder funktionieren, wirken und Bestand haben.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid-3">
            {services.map((srv, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease, delay: idx * 0.08 }}
                className="luxury-card luxury-card-light"
                style={{ display: "flex", flexDirection: "column", height: "100%" }}
              >
                {/* Delicate blueprint drafting corner marks */}
                <div className="card-corner-marks">
                  <span className="card-corner mark-tl"></span>
                  <span className="card-corner mark-tr"></span>
                  <span className="card-corner mark-bl"></span>
                  <span className="card-corner mark-br"></span>
                </div>

                <div className="service-card-icon-box">
                  {srv.icon}
                </div>
                <h3 style={{ fontSize: "1.4rem", color: "var(--text-dark)", marginBottom: "0.25rem", transition: "color 0.4s ease" }}>
                  {srv.title}
                </h3>
                <span style={{ fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--primary)", fontWeight: 600, marginBottom: "1rem", display: "block" }}>
                  {srv.subtitle}
                </span>
                <p style={{ color: "var(--text-muted-dark)", fontSize: "0.95rem", lineHeight: "1.65", flexGrow: 1, fontWeight: 300 }}>
                  {srv.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "4rem" }}>
            <button className="btn btn-secondary" onClick={onServicesClick}>
              Alle Leistungen ansehen
            </button>
          </div>
        </div>
      </section>

      {/* BeforeAfterSlider (Interactive Comparison) */}
      <BeforeAfterSlider onProjectsClick={onProjectsClick} />

      {/* Testimonials Carousel */}
      <section className="section section-light" style={{ borderTop: "1px solid var(--border-dark)", borderBottom: "1px solid var(--border-dark)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span className="section-eyebrow">Vertrauen</span>
            <h2 className="section-title" style={{ color: "var(--text-dark)" }}>Was unsere Kunden sagen</h2>
          </div>

          {/* Testimonial Panel */}
          <div style={testimonialBoxStyle}>
            <button onClick={handlePrevTestimonial} style={carouselArrowStyle} aria-label="Vorherige">
              <ChevronLeft size={24} color="var(--text-dark)" />
            </button>

            <div style={{ flexGrow: 1, padding: "0 2rem", position: "relative", minHeight: "220px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <p style={testimonialQuoteStyle}>
                    &bdquo;{testimonials[activeTestimonial].quote}&ldquo;
                  </p>
                  <div style={testimonialMetaStyle}>
                    <span style={testimonialAuthorStyle}>{testimonials[activeTestimonial].author}</span>
                    <span style={testimonialLocStyle}>
                      {testimonials[activeTestimonial].location} &bull; {testimonials[activeTestimonial].project}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button onClick={handleNextTestimonial} style={carouselArrowStyle} aria-label="Nächste">
              <ChevronRight size={24} color="var(--text-dark)" />
            </button>
          </div>

          {/* Dot Indicators */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "2rem" }}>
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: activeTestimonial === idx ? "var(--primary)" : "var(--text-muted-dark)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0
                }}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* Warum work4palace? (Split Marketing Upgrade) */}
      <section className="section section-dark" style={{ borderBottom: "1px solid var(--border-light)" }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: "center" }}>
            
            {/* Left Column: Big Testimonial Bold Hook */}
            {/* Left Column: Big Testimonial Bold Hook */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="section-eyebrow">Unsere Werte</span>
              <h2 className="section-title" style={{ fontSize: "3.25rem", lineHeight: "1.15", marginBottom: "2rem" }}>
                Für alle, die nicht einfach nur renovieren wollen.
              </h2>
              <div style={{ borderLeft: "3px solid var(--primary)", paddingLeft: "1.5rem", marginTop: "2rem" }}>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", color: "var(--secondary)", fontStyle: "italic", fontWeight: 300, lineHeight: "1.6" }}>
                  &bdquo;Eine exklusive Altbausanierung verlangt Respekt vor dem Erbe, Fingerspitzengefühl für mineralische Stoffe und ein Auge für Proportionen. Das unterscheidet uns vom Massenbetrieb.&ldquo;
                </p>
              </div>
            </motion.div>

            {/* Right Column: 4 structured high-converting bullets */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.12
                  }
                }
              }}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {whyPoints.map((pt, idx) => (
                <motion.div 
                  key={idx} 
                  className="why-point-item"
                  variants={{
                    hidden: { opacity: 0, x: 30 },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                    }
                  }}
                >
                  <div className="why-point-badge">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="why-point-title">
                      {pt.title}
                    </h3>
                    <p style={{ color: "var(--text-muted-light)", fontSize: "0.95rem", lineHeight: "1.65", fontWeight: 300 }}>
                      {pt.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>

          <div style={{ textAlign: "center", marginTop: "5rem" }}>
            <button className="btn btn-primary" onClick={onContactClick} style={{ padding: "1.1rem 2.25rem" }}>
              Jetzt Beratung anfragen
            </button>
          </div>
        </div>
      </section>

      {/* Ablauf (Veredeltes horizontales Prozess-Karten-System) */}
      <section className="section section-light" id="workflow">
        <div className="container" style={{ maxWidth: "1300px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <span className="section-eyebrow">Der Manufaktur-Weg</span>
            <h2 className="section-title" style={{ color: "var(--text-dark)" }}>So wird aus Bausubstanz bleibender Wohnwert</h2>
            <p className="section-desc" style={{ color: "var(--text-muted-dark)", margin: "0 auto", maxWidth: "700px" }}>
              Qualität entsteht durch Methode. Unser strukturierter Prozess nimmt Ihnen jegliches Risiko und sichert ein meisterliches Ergebnis vom ersten Gespräch bis zum bezugsfertigen Finish.
            </p>
          </div>

          {/* Majestic Horizontal Process Grid */}
          <div className="process-flow-container">
            {processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease, delay: idx * 0.1 }}
                className="process-step-card"
              >
                <span className="step-card-num">{step.num}</span>
                <div className="step-card-icon">
                  {step.icon}
                </div>
                <h3 className="step-card-title">{step.title}</h3>
                <p className="step-card-desc">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "5rem" }}>
            <button className="btn btn-secondary" onClick={onContactClick} style={{ padding: "1.1rem 2.25rem" }}>
              Jetzt Sanierungsgespräch starten
            </button>
          </div>
        </div>
      </section>

      {/* Trust Upgrade 3: Meet Tina Heinecke (Founder Personal Accountability Row with drop-cap) */}
      <section className="section section-dark" style={{ borderTop: "1px solid var(--border-light)", borderBottom: "1px solid var(--border-light)" }}>
        <div className="container">
          <div className="grid-2">
            
            {/* Left: Beautiful Blueprint Frame with Tina's profile picture */}
            <div className="services-photo-wrapper" style={{ borderColor: "var(--border-light)", maxHeight: "480px" }}>
              <div className="blueprint-line blueprint-line-x"></div>
              <div className="blueprint-line blueprint-line-y"></div>

              <div className="corner-mark top-left"></div>
              <div className="corner-mark top-right"></div>
              <div className="corner-mark bottom-left"></div>
              <div className="corner-mark bottom-right"></div>

              <div className="tech-badge">
                <span className="badge-pulse-dot"></span>
                <span>Geschäftsführung / Meisterin</span>
              </div>

              <div className="services-photo-inner">
                <img 
                  src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/work4palace/Tina_Heinecke.jpg" 
                  alt="Tina Heinecke - Geschäftsführung" 
                  loading="lazy"
                  draggable="false"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>


            {/* Right: Personal accountability copy with big drop cap editorial quote */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.5rem" }}>
              <span className="section-eyebrow">Persönliche Verantwortung</span>
              <h2 className="section-title" style={{ fontSize: "2.75rem", lineHeight: "1.2" }}>
                Sanierung ist Vertrauenssache.
              </h2>
              
              {/* Drop-cap quote */}
              <div style={dropCapQuoteContainerStyle}>
                <span style={dropCapStyle}>S</span>
                <p style={dropCapTextStyle}>
                  anierung ist Vertrauenssache. Mein Ziel ist es, aus alter Substanz echten, langlebigen Wohnwert zu schaffen – mit Respekt, ehrlicher Haptik und kompromissloser Präzision. Ein Altbau trägt Charakter und Geschichte. Mein persönliches Versprechen an Sie ist eine meisterhafte handwerkliche Ausführung, die Ihr Eigentum im Wert steigert.
                </p>
              </div>

              <p style={{ color: "var(--text-muted-light)", fontSize: "0.95rem", lineHeight: "1.7", fontWeight: 300 }}>
                Wir sind kein anonymer Massenbetrieb. Jedes Sanierungsprojekt im Landkreis Nienburg und der Region Hannover wird von uns persönlich betreut – vom ersten Rückbau bis zur vollendeten Oberfläche. Wir arbeiten transparent, zuverlässig und stehen voll für unser Ergebnis ein.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", marginTop: "1rem" }}>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: "var(--text-light)" }}>Tina Heinecke</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--primary)", fontWeight: 600 }}>
                  Gründerin & Geschäftsführerin, work4palace UG
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Homepage-Integrated Project Planner Widget */}
      <section className="section section-light" id="planner-widget" style={{ borderTop: "1px solid var(--border-dark)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span className="section-eyebrow">Digitaler Projekt-Konfigurator</span>
            <h2 className="section-title" style={{ color: "var(--text-dark)", fontSize: "3rem" }}>
              Planen Sie Ihre Sanierung mit Anspruch
            </h2>
            <p className="section-desc" style={{ color: "var(--text-muted-dark)", margin: "0 auto", maxWidth: "700px" }}>
              Teilen Sie uns in wenigen Sekunden Ihre Wünsche mit. Tina Heinecke wertet Ihre Angaben persönlich aus und erstellt für Sie eine kostenfreie, maßgeschneiderte Ersteinschätzung.
            </p>
          </div>

          <div className="planner-widget-container">
            {/* Step Indicators */}
            <div className="planner-step-header">
              <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, color: "var(--text-dark)" }}>
                {!plannerSuccess ? `Schritt ${plannerStep} von 3` : "Abgeschlossen"}
              </span>
              <div className="step-indicator">
                <div className={`step-dot ${plannerStep >= 1 && !plannerSuccess ? "active" : ""}`}></div>
                <div className={`step-dot ${plannerStep >= 2 && !plannerSuccess ? "active" : ""}`}></div>
                <div className={`step-dot ${plannerStep >= 3 && !plannerSuccess ? "active" : ""}`}></div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {/* Step 1: Choose Project Type */}
              {plannerStep === 1 && !plannerSuccess && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <h3 style={{ fontSize: "1.6rem", color: "var(--text-dark)", marginBottom: "2rem", fontFamily: "var(--font-serif)" }}>
                    Welches Gewerk oder Vorhaben planen Sie?
                  </h3>
                  
                  <div className="planner-choice-grid">
                    {[
                      { id: "Altbausanierung", label: "Komplettsanierung", desc: "Umfassende Altbausanierung mit Substanzschutz vom Keller bis zum Dach." },
                      { id: "Kalkputz", label: "Kalkputz & Wand", desc: "Exklusive Wandaufbauten mit rein mineralischem Lehm- & Sumpfkalkputz." },
                      { id: "Echtholz", label: "Dielen & Echtholz", desc: "Verlegung oder behutsame Restaurierung edler Massivholzdielen." },
                      { id: "Innenausbau", label: "Veredelter Innenausbau", desc: "Präzise Montage, Trockenbau & feine Tischleroberflächen im Innenbereich." }
                    ].map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setPlannerData({ ...plannerData, projectType: item.id })}
                        className={`step-card-visual ${plannerData.projectType === item.id ? "active" : ""}`}
                      >
                        <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: "var(--text-dark)" }}>{item.label}</h4>
                        <p style={{ color: "var(--text-muted-dark)", fontSize: "0.9rem", lineHeight: "1.5", fontWeight: 300 }}>{item.desc}</p>
                        {plannerData.projectType === item.id && (
                          <div className="step-check-mark">✓</div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="planner-nav-row" style={{ justifyContent: "flex-end" }}>
                    <button
                      className="btn btn-primary"
                      disabled={!plannerData.projectType}
                      onClick={() => setPlannerStep(2)}
                      style={{ opacity: !plannerData.projectType ? 0.5 : 1, cursor: !plannerData.projectType ? "not-allowed" : "pointer" }}
                    >
                      Weiter zu Schritt 2
                      <ArrowRight size={14} style={{ marginLeft: "0.5rem" }} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Choose Scope and Details */}
              {plannerStep === 2 && !plannerSuccess && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <h3 style={{ fontSize: "1.6rem", color: "var(--text-dark)", marginBottom: "2.25rem", fontFamily: "var(--font-serif)" }}>
                    Rahmendaten & Projekt-Details
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                    <div className="form-group">
                      <label className="form-label">Ungefähre Projektgröße (Fläche)</label>
                      <div className="planner-choice-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
                        {["< 50 qm", "50 - 100 qm", "100 - 180 qm", "> 180 qm"].map((size) => (
                          <div
                            key={size}
                            onClick={() => setPlannerData({ ...plannerData, scopeSize: size })}
                            style={{
                              padding: "1rem",
                              border: "1px solid var(--border-dark)",
                              backgroundColor: plannerData.scopeSize === size ? "rgba(184, 105, 69, 0.04)" : "var(--bg-light)",
                              borderColor: plannerData.scopeSize === size ? "var(--primary)" : "var(--border-dark)",
                              textAlign: "center",
                              cursor: "pointer",
                              fontSize: "0.9rem",
                              fontWeight: plannerData.scopeSize === size ? 600 : 400,
                              color: "var(--text-dark)"
                            }}
                          >
                            {size}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="form-group form-grid-row" style={{ display: "flex", gap: "2rem" }}>
                      <div style={{ flex: 1 }}>
                        <label className="form-label" htmlFor="planner-location">Ort des Objekts</label>
                        <input
                          className="form-input"
                          type="text"
                          id="planner-location"
                          value={plannerData.location}
                          onChange={(e) => setPlannerData({ ...plannerData, location: e.target.value })}
                          placeholder="z.B. Hannover oder Uchte"
                          style={{ color: "var(--text-dark)" }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label className="form-label" htmlFor="planner-timeframe">Wunschzeitraum</label>
                        <input
                          className="form-input"
                          type="text"
                          id="planner-timeframe"
                          value={plannerData.timeframe}
                          onChange={(e) => setPlannerData({ ...plannerData, timeframe: e.target.value })}
                          placeholder="z.B. Herbst 2026"
                          style={{ color: "var(--text-dark)" }}
                        />
                      </div>
                    </div>

                    {/* Drag & Drop Photo Uploader Zone */}
                    <div className="form-group">
                      <label className="form-label">Fotos oder Baupläne des Objekts hochladen (optional)</label>
                      <div 
                        className={`photo-dropzone ${dragActive ? "drag-active" : ""}`}
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById("file-upload-input")?.click()}
                      >
                        <input 
                          type="file"
                          id="file-upload-input"
                          multiple
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                          accept="image/*,.pdf"
                        />
                        <div className="uploader-icon-container">
                          <ClipboardCheck size={28} />
                        </div>
                        <h4 className="uploader-title">Raumbilder oder Grundrisse hierher ziehen</h4>
                        <p className="uploader-subtitle">oder vom Computer auswählen (max. 10 MB pro Datei)</p>
                      </div>

                      {/* Upload progress feedback */}
                      {isUploading && (
                        <div style={{ marginTop: "1rem", backgroundColor: "var(--border-dark)", height: "4px", width: "100%", position: "relative", overflow: "hidden" }}>
                          <div 
                            style={{ 
                              position: "absolute", 
                              left: 0, 
                              top: 0, 
                              height: "100%", 
                              backgroundColor: "var(--primary)", 
                              width: `${uploadProgress}%`, 
                              transition: "width 0.15s ease" 
                            }}
                          ></div>
                        </div>
                      )}

                      {/* Previews of uploaded files */}
                      {uploadedFiles.length > 0 && (
                        <div className="uploaded-photos-grid">
                          {uploadedFiles.map((file, idx) => (
                            <div key={idx} className="file-preview-pill">
                              <div className="file-pill-left">
                                <CheckCircle2 size={16} color="var(--primary)" />
                                <span className="file-pill-name">{file.name}</span>
                                <span className="file-pill-size">({file.size})</span>
                              </div>
                              <button 
                                type="button"
                                className="file-pill-delete"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeUploadedFile(idx);
                                }}
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="planner-nav-row">
                    <button className="btn btn-secondary" onClick={() => setPlannerStep(1)}>
                      Zurück
                    </button>
                    <button className="btn btn-primary" onClick={() => setPlannerStep(3)}>
                      Weiter zur Kontaktdaten
                      <ArrowRight size={14} style={{ marginLeft: "0.5rem" }} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Contact & Send */}
              {plannerStep === 3 && !plannerSuccess && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <h3 style={{ fontSize: "1.6rem", color: "var(--text-dark)", marginBottom: "2.25rem", fontFamily: "var(--font-serif)" }}>
                    Persönliche Kontaktdaten
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="planner-name">Ihr Name</label>
                      <input
                        className="form-input"
                        type="text"
                        id="planner-name"
                        required
                        value={plannerData.name}
                        onChange={(e) => setPlannerData({ ...plannerData, name: e.target.value })}
                        placeholder="Name eingeben"
                        style={{ color: "var(--text-dark)" }}
                      />
                    </div>

                    <div className="form-group form-grid-row" style={{ display: "flex", gap: "2rem" }}>
                      <div style={{ flex: 1 }}>
                        <label className="form-label" htmlFor="planner-email">E-Mail Adresse</label>
                        <input
                          className="form-input"
                          type="email"
                          id="planner-email"
                          required
                          value={plannerData.email}
                          onChange={(e) => setPlannerData({ ...plannerData, email: e.target.value })}
                          placeholder="mail@adresse.de"
                          style={{ color: "var(--text-dark)" }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label className="form-label" htmlFor="planner-phone">Telefonnummer</label>
                        <input
                          className="form-input"
                          type="tel"
                          id="planner-phone"
                          value={plannerData.phone}
                          onChange={(e) => setPlannerData({ ...plannerData, phone: e.target.value })}
                          placeholder="Telefonnummer eingeben"
                          style={{ color: "var(--text-dark)" }}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="planner-message">Weitere Wünsche oder Notizen (optional)</label>
                      <textarea
                        className="form-textarea"
                        id="planner-message"
                        value={plannerData.message}
                        onChange={(e) => setPlannerData({ ...plannerData, message: e.target.value })}
                        placeholder="Hier können Sie Besonderheiten eintragen..."
                        style={{ color: "var(--text-dark)" }}
                      ></textarea>
                    </div>
                  </div>

                  <div className="planner-nav-row">
                    <button className="btn btn-secondary" onClick={() => setPlannerStep(2)}>
                      Zurück
                    </button>
                    <button 
                      className="btn btn-primary" 
                      disabled={!plannerData.name || !plannerData.email}
                      onClick={() => {
                        setPlannerSuccess(true);
                      }}
                      style={{ opacity: (!plannerData.name || !plannerData.email) ? 0.5 : 1, cursor: (!plannerData.name || !plannerData.email) ? "not-allowed" : "pointer" }}
                    >
                      Konfiguration absenden
                      <ClipboardCheck size={14} style={{ marginLeft: "0.5rem" }} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Success State */}
              {plannerSuccess && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "2.5rem 0" }}
                >
                  <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "rgba(184, 105, 69, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "2rem" }}>
                    <CheckCircle2 size={40} color="var(--primary)" />
                  </div>
                  <h3 style={{ fontSize: "1.85rem", color: "var(--text-dark)", marginBottom: "1rem", fontFamily: "var(--font-serif)" }}>
                    Projektkonfiguration übermittelt
                  </h3>
                  <p style={{ color: "var(--text-muted-dark)", fontSize: "1rem", lineHeight: "1.7", marginBottom: "2.5rem", maxWidth: "480px", fontWeight: 300 }}>
                    Vielen Dank für Ihre Konfiguration. Tina Heinecke analysiert Ihre baulichen Angaben und meldet sich innerhalb von 24 Stunden persönlich bei Ihnen für das weitere Vorgehen.
                  </p>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setPlannerStep(1);
                      setPlannerSuccess(false);
                      setPlannerData({
                        projectType: "",
                        scopeSize: "50-100 qm",
                        location: "",
                        timeframe: "",
                        name: "",
                        email: "",
                        phone: "",
                        message: ""
                      });
                    }}
                  >
                    Neue Konfiguration erstellen
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

/* Testimonial styles */
const testimonialBoxStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  maxWidth: "900px",
  margin: "0 auto",
  background: "var(--bg-light-soft)",
  border: "1px solid var(--border-dark)",
  padding: "3.5rem 2rem",
  boxShadow: "var(--shadow-soft)"
};

const carouselArrowStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "48px",
  height: "48px",
  backgroundColor: "rgba(18, 17, 15, 0.03)",
  transition: "var(--transition-fast)"
};

const testimonialQuoteStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "1.35rem",
  lineHeight: "1.7",
  color: "var(--text-dark)",
  fontStyle: "italic",
  marginBottom: "2rem",
  textAlign: "center"
};

const testimonialMetaStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const testimonialAuthorStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.95rem",
  fontWeight: 600,
  color: "var(--text-dark)"
};

const testimonialLocStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.8rem",
  color: "var(--text-muted-dark)",
  marginTop: "0.25rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em"
};



/* Drop-cap quote styles */
const dropCapQuoteContainerStyle: React.CSSProperties = {
  position: "relative",
  borderLeft: "2px solid var(--primary)",
  paddingLeft: "1.5rem",
  margin: "1rem 0"
};

const dropCapStyle: React.CSSProperties = {
  float: "left",
  fontFamily: "var(--font-serif)",
  fontSize: "4.5rem",
  lineHeight: "0.8",
  color: "var(--primary)",
  marginRight: "0.75rem",
  marginTop: "0.25rem",
  fontWeight: 400
};

const dropCapTextStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "1.25rem",
  lineHeight: "1.75",
  color: "var(--text-light)",
  fontStyle: "italic",
  fontWeight: 300
};

const styleTag = document.createElement("style");
styleTag.innerHTML = `
  /* Asymmetric Editorial Grid for Unsere Haltung */
  .attitude-asymmetric-wrapper {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .attitude-editorial-grid {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 2.5rem;
    width: 100%;
    max-width: 640px;
    position: relative;
    padding: 3rem 0;
  }

  .blueprint-editorial-frame {
    position: relative;
    background: #faf6ee; /* Cream limestone passepartout */
    padding: 12px; /* Fine frame padding */
    border: 1px solid rgba(18, 17, 15, 0.06);
    box-shadow: 0 15px 45px rgba(18, 17, 15, 0.06);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
  }

  .blueprint-editorial-frame.frame-left {
    aspect-ratio: 3 / 4;
    transform: translateY(-24px);
    z-index: 2;
  }

  .blueprint-editorial-frame.frame-right {
    aspect-ratio: 1 / 1;
    transform: translateY(48px);
    border-color: rgba(184, 105, 69, 0.12); /* Subtle primary border */
    align-self: flex-start;
    z-index: 3;
  }

  .frame-img-wrap {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background: #e8d8bd;
  }

  .frame-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: brightness(0.97) contrast(1.01);
    transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease;
  }

  .frame-badge {
    position: absolute;
    bottom: -10px;
    right: 20px;
    background: var(--bg-dark);
    color: var(--text-light);
    font-family: var(--font-sans);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    padding: 0.35rem 0.75rem;
    font-weight: 600;
    z-index: 10;
    border: 1px solid var(--border-light);
    pointer-events: none;
  }

  .frame-badge.badge-primary {
    background: var(--primary);
    border-color: var(--primary);
  }

  /* Drafting Corner Ornaments */
  .blueprint-frame-decor {
    position: absolute;
    inset: 4px;
    pointer-events: none;
    z-index: 5;
  }

  .frame-corner {
    position: absolute;
    width: 6px;
    height: 6px;
    border: 1px solid transparent;
    transition: all 0.5s ease;
  }

  .corner-tl { top: 4px; left: 4px; border-top-color: rgba(18, 17, 15, 0.12); border-left-color: rgba(18, 17, 15, 0.12); }
  .corner-tr { top: 4px; right: 4px; border-top-color: rgba(18, 17, 15, 0.12); border-right-color: rgba(18, 17, 15, 0.12); }
  .corner-bl { bottom: 4px; left: 4px; border-bottom-color: rgba(18, 17, 15, 0.12); border-left-color: rgba(18, 17, 15, 0.12); }
  .corner-br { bottom: 4px; right: 4px; border-bottom-color: rgba(18, 17, 15, 0.12); border-right-color: rgba(18, 17, 15, 0.12); }

  /* Premium Asymmetric Hover Effects */
  .blueprint-editorial-frame:hover {
    box-shadow: 0 25px 55px rgba(18, 17, 15, 0.15);
    border-color: rgba(184, 105, 69, 0.35);
  }

  .blueprint-editorial-frame.frame-left:hover {
    transform: translateY(-32px) scale(1.015);
  }

  .blueprint-editorial-frame.frame-right:hover {
    transform: translateY(40px) scale(1.02);
  }

  .blueprint-editorial-frame:hover .frame-img {
    transform: scale(1.045);
    filter: brightness(1) contrast(1.03);
  }

  .blueprint-editorial-frame:hover .corner-tl { transform: translate(-2px, -2px); border-color: var(--primary) !important; }
  .blueprint-editorial-frame:hover .corner-tr { transform: translate(2px, -2px); border-color: var(--primary) !important; }
  .blueprint-editorial-frame:hover .corner-bl { transform: translate(-2px, 2px); border-color: var(--primary) !important; }
  .blueprint-editorial-frame:hover .corner-br { transform: translate(2px, 2px); border-color: var(--primary) !important; }

  /* Trust list interactive micro-interactions */
  .attitude-section .trust-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1.5rem;
    margin-bottom: 2.5rem !important;
  }

  .attitude-section .trust-list-item {
    display: flex;
    align-items: flex-start;
    gap: 1.25rem;
    padding: 1rem 1.25rem;
    border-radius: 4px;
    border-left: 2px solid transparent;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    cursor: pointer;
    background: transparent;
    margin-left: -1.25rem;
    margin-right: 1.25rem;
  }

  .attitude-section .trust-list-item:hover {
    background: rgba(184, 105, 69, 0.025);
    border-left-color: var(--primary);
    transform: translateX(8px);
    box-shadow: 0 4px 15px rgba(18, 17, 15, 0.015);
  }

  .attitude-section .trust-check-icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: rgba(184, 105, 69, 0.1);
    color: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .attitude-section .trust-check-icon svg {
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .attitude-section .trust-list-item:hover .trust-check-icon {
    background-color: var(--primary);
    color: var(--text-light);
    transform: scale(1.12);
  }

  .attitude-section .trust-list-item:hover .trust-check-icon svg {
    stroke: var(--text-light) !important;
  }

  .attitude-section .trust-list-item strong {
    color: var(--text-dark);
    font-weight: 600;
    transition: color 0.3s ease;
  }

  .attitude-section .trust-list-item:hover strong {
    color: var(--primary);
  }

  @media (max-width: 1024px) {
    .attitude-editorial-grid {
      margin: 3rem auto 0 auto;
    }
  }

  @media (max-width: 600px) {
    .attitude-editorial-grid {
      grid-template-columns: 1fr;
      gap: 3.5rem;
    }
    .blueprint-editorial-frame.frame-left {
      transform: none;
    }
    .blueprint-editorial-frame.frame-right {
      transform: none;
    }
    .blueprint-editorial-frame.frame-left:hover {
      transform: translateY(-4px);
    }
    .blueprint-editorial-frame.frame-right:hover {
      transform: translateY(-4px);
    }
  }

  /* Blueprint service cards styling */
  .luxury-card-light {
    position: relative;
    overflow: hidden;
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
  }
  
  .luxury-card-light:hover {
    transform: translateY(-8px) !important;
    border-color: rgba(184, 105, 69, 0.3) !important;
    box-shadow: 0 20px 45px rgba(18, 17, 15, 0.08) !important;
  }

  .service-card-icon-box {
    margin-bottom: 1.5rem;
    display: inline-flex;
    width: 48px;
    height: 48px;
    background-color: rgba(184, 105, 69, 0.08);
    border: 1px solid rgba(184, 105, 69, 0.12);
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    color: var(--primary);
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .service-card-icon-box svg {
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .luxury-card-light:hover .service-card-icon-box {
    background-color: var(--primary);
    color: var(--text-light) !important;
    border-color: var(--primary);
    transform: scale(1.08) rotate(360deg);
    box-shadow: 0 6px 15px rgba(184, 105, 69, 0.25);
  }
  
  .luxury-card-light:hover .service-card-icon-box svg {
    stroke: var(--text-light) !important;
  }

  /* Micro blueprint drafting corner marks */
  .card-corner-marks {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 5;
  }
  
  .card-corner {
    position: absolute;
    width: 8px;
    height: 8px;
    border: 1px solid transparent;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .mark-tl { top: 12px; left: 12px; border-top-color: rgba(18, 17, 15, 0.06); border-left-color: rgba(18, 17, 15, 0.06); }
  .mark-tr { top: 12px; right: 12px; border-top-color: rgba(18, 17, 15, 0.06); border-right-color: rgba(18, 17, 15, 0.06); }
  .mark-bl { bottom: 12px; left: 12px; border-bottom-color: rgba(18, 17, 15, 0.06); border-left-color: rgba(18, 17, 15, 0.06); }
  .mark-br { bottom: 12px; right: 12px; border-bottom-color: rgba(18, 17, 15, 0.06); border-right-color: rgba(18, 17, 15, 0.06); }
  
  .luxury-card-light:hover .mark-tl { transform: translate(-3px, -3px); border-color: var(--primary) !important; }
  .luxury-card-light:hover .mark-tr { transform: translate(3px, -3px); border-color: var(--primary) !important; }
  .luxury-card-light:hover .mark-bl { transform: translate(-3px, 3px); border-color: var(--primary) !important; }
  .luxury-card-light:hover .mark-br { transform: translate(3px, 3px); border-color: var(--primary) !important; }

  .why-point-item {
    display: flex; 
    gap: 1.5rem; 
    align-items: flex-start;
    padding: 1.25rem 1.5rem;
    border-radius: 4px;
    border: 1px solid transparent;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    cursor: pointer;
    background: transparent;
    margin: 0 -1.5rem;
  }
  
  .why-point-item:hover {
    border-color: var(--border-light);
    background: rgba(255, 255, 255, 0.015);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
  
  .why-point-badge {
    font-family: var(--font-sans); 
    font-size: 1rem; 
    color: var(--primary); 
    font-weight: 700;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: rgba(184, 105, 69, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    line-height: 1; /* Guaranteed mathematical vertical alignment */
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    border: 1px solid rgba(184, 105, 69, 0.15);
  }
  
  .why-point-item:hover .why-point-badge {
    transform: scale(1.08);
    background-color: var(--primary);
    color: var(--text-light);
    border-color: var(--primary);
    box-shadow: 0 6px 18px rgba(184, 105, 69, 0.25);
  }
  
  .why-point-title {
    font-family: var(--font-sans); 
    font-size: 1.15rem; 
    font-weight: 600; 
    color: var(--text-light); 
    margin-bottom: 0.5rem;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .why-point-item:hover .why-point-title {
    transform: translateX(4px);
    color: var(--primary);
  }

  @media (max-width: 900px) {
    div[style*="testimonialBoxStyle"] {
      flex-direction: column !important;
      padding: 2rem 1rem !important;
    }
    div[style*="carouselArrowStyle"] {
      margin: 1rem 0 !important;
    }
  }
`;
document.head.appendChild(styleTag);

export default Home;
