import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, ArrowLeft, ClipboardCheck, Compass, Award, UserCheck } from "lucide-react";

const ContactPage: React.FC = () => {
  const [plannerStep, setPlannerStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    projectType: "",
    scopeSize: "50-100 qm",
    timeframe: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleNext = () => {
    if (plannerStep < 3) setPlannerStep(plannerStep + 1);
  };

  const handleBack = () => {
    if (plannerStep > 1) setPlannerStep(plannerStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setIsSubmitted(true);
    }, 800);
  };

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <div className="page-container" style={{ backgroundColor: "var(--bg-light)" }}>
      {/* Editorial Contact Header */}
      <section className="section section-light" style={{ padding: "12rem 0 4rem 0", borderBottom: "1px solid var(--border-dark)" }}>
        <div className="container" style={{ maxWidth: "900px", textAlign: "center" }}>
          <span className="section-eyebrow">Projektplanung</span>
          <h1 style={heroHeadlineStyle}>
            Ihr Altbau ist ein Unikat. Planen wir seine Veredelung.
          </h1>
          <p style={heroSublineStyle}>
            In wenigen Schritten erstellen Sie eine detaillierte Projekt-Konfiguration für Ihr Sanierungsvorhaben im Landkreis Nienburg oder der Region Hannover.
          </p>
        </div>
      </section>

      {/* Main Grid: Selling roadmap + Planner */}
      <section className="section section-light">
        <div className="container">
          <div className="grid-2" style={{ alignItems: "stretch" }}>
            
            {/* Left: Selling Roadmap and response guarantees */}
            <div style={infoBlockStyle}>
              <span className="section-eyebrow" style={{ marginBottom: "0.5rem" }}>Der Ablauf</span>
              <h2 className="section-title" style={{ color: "var(--text-dark)", fontSize: "2.5rem", lineHeight: "1.2" }}>
                Was nach Ihrer Anfrage passiert
              </h2>
              <p style={{ color: "var(--text-muted-dark)", fontSize: "1.05rem", fontWeight: 300 }}>
                Wir glauben an absolute Planbarkeit, meisterliche Transparenz und ehrliche Handwerksleistung. Deshalb beginnt jedes Projekt mit einem klaren Fahrplan:
              </p>

              {/* 3 Step Selling Roadmap */}
              <div className="selling-roadmap">
                <div className="roadmap-card">
                  <div className="roadmap-icon-box">
                    <Compass size={20} />
                  </div>
                  <div className="roadmap-texts">
                    <h3 className="roadmap-title">01. Kostenfreie Voranalyse</h3>
                    <p className="roadmap-desc">
                      Tina Heinecke prüft Ihre Fotos, Baupläne und Projekt-Eckdaten persönlich auf bautechnische Machbarkeit und erste Materialpotenziale.
                    </p>
                  </div>
                </div>

                <div className="roadmap-card">
                  <div className="roadmap-icon-box">
                    <UserCheck size={20} />
                  </div>
                  <div className="roadmap-texts">
                    <h3 className="roadmap-title">02. Unverbindlicher Ortstermin</h3>
                    <p className="roadmap-desc">
                      Wir besichtigen das Gebäude vor Ort, analysieren die historische Bausubstanz (z. B. Dielenboden, Mauerwerk, Wandaufbau) und besprechen Ihre Wünsche im Detail.
                    </p>
                  </div>
                </div>

                <div className="roadmap-card">
                  <div className="roadmap-icon-box">
                    <Award size={20} />
                  </div>
                  <div className="roadmap-texts">
                    <h3 className="roadmap-title">03. Meisterhafter Festpreis-Fahrplan</h3>
                    <p className="roadmap-desc">
                      Sie erhalten eine transparente und detaillierte Aufstellung aller Sanierungsschritte. Keine versteckten Kosten, sondern meisterliche Ausführung zum Fixpreis.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct channels footer */}
              <div style={{ marginTop: "3rem", display: "flex", gap: "2.5rem", flexWrap: "wrap", borderTop: "1px solid var(--border-dark)", paddingTop: "2.5rem" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted-dark)", display: "block" }}>Direkte Mail</span>
                  <a href="mailto:moin@work4palace.de" style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-dark)" }}>moin@work4palace.de</a>
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted-dark)", display: "block" }}>Telefonnummer</span>
                  <a href="tel:05763425622" style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-dark)" }}>05763 - 425622</a>
                </div>
              </div>
            </div>

            {/* Right: The Advanced Contact Form Wizard with integrated drag & drop uploader */}
            <div style={formCardStyle}>
              {/* Response Timer countdown badge */}
              <div className="response-timer-badge">
                <div className="response-timer-dot"></div>
                <span className="response-timer-text">Persönliche Antwort garantiert in unter 24 Std.</span>
              </div>

              <div className="planner-step-header">
                <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600, color: "var(--text-dark)" }}>
                  {!isSubmitted ? `Schritt ${plannerStep} von 3` : "Erfolgreich"}
                </span>
                <div className="step-indicator">
                  <div className={`step-dot ${plannerStep >= 1 && !isSubmitted ? "active" : ""}`}></div>
                  <div className={`step-dot ${plannerStep >= 2 && !isSubmitted ? "active" : ""}`}></div>
                  <div className={`step-dot ${plannerStep >= 3 && !isSubmitted ? "active" : ""}`}></div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column" }}>
                    
                    {/* Step 1: Was soll saniert werden */}
                    {plannerStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ duration: 0.5, ease }}
                      >
                        <h3 style={formTitleStyle}>Welches Gewerk planen Sie?</h3>
                        
                        <div className="planner-choice-grid">
                          {[
                            { id: "Altbausanierung", label: "Altbausanierung (Komplett)", desc: "Ganzheitlicher Substanzschutz und moderner Innenausbau." },
                            { id: "Kalkputz", label: "Kalk- & Lehmputz", desc: "Atmungsaktiver mineralischer Wandaufbau für Raumklima." },
                            { id: "Echtholz", label: "Echtholz & Dielen", desc: "Fachgerechte Verlegung oder Sanierung feiner Dielenböden." },
                            { id: "Innenausbau", label: "Veredelter Innenausbau", desc: "Präzise Montagen, Deckenbekleidung & Trockenbausysteme." }
                          ].map((item) => (
                            <div
                              key={item.id}
                              onClick={() => setFormData({ ...formData, projectType: item.id })}
                              className={`step-card-visual ${formData.projectType === item.id ? "active" : ""}`}
                            >
                              <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", color: "var(--text-dark)" }}>{item.label}</h4>
                              <p style={{ color: "var(--text-muted-dark)", fontSize: "0.85rem", lineHeight: "1.4", fontWeight: 300 }}>{item.desc}</p>
                              {formData.projectType === item.id && (
                                <div className="step-check-mark">✓</div>
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="planner-nav-row" style={{ justifyContent: "flex-end" }}>
                          <button
                            className="btn btn-primary"
                            disabled={!formData.projectType}
                            onClick={handleNext}
                            style={{ opacity: !formData.projectType ? 0.5 : 1, cursor: !formData.projectType ? "not-allowed" : "pointer" }}
                          >
                            Weiter zu Schritt 2
                            <ArrowRight size={14} style={{ marginLeft: "0.5rem" }} />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Rahmendaten + Drag & Drop Uploader */}
                    {plannerStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ duration: 0.5, ease }}
                      >
                        <h3 style={formTitleStyle}>Projektgröße & zeitlicher Rahmen</h3>

                        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                          <div className="form-group">
                            <label className="form-label">Ungefähre Projektfläche</label>
                            <div className="planner-choice-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
                              {["< 50 qm", "50 - 100 qm", "100 - 180 qm", "> 180 qm"].map((size) => (
                                <div
                                  key={size}
                                  onClick={() => setFormData({ ...formData, scopeSize: size })}
                                  style={{
                                    padding: "1rem 0.5rem",
                                    border: "1px solid var(--border-dark)",
                                    backgroundColor: formData.scopeSize === size ? "rgba(184, 105, 69, 0.04)" : "var(--bg-light)",
                                    borderColor: formData.scopeSize === size ? "var(--primary)" : "var(--border-dark)",
                                    textAlign: "center",
                                    cursor: "pointer",
                                    fontSize: "0.85rem",
                                    fontWeight: formData.scopeSize === size ? 600 : 400,
                                    color: "var(--text-dark)"
                                  }}
                                >
                                  {size}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="form-group form-grid-row" style={formRowStyle}>
                            <div style={{ flex: 1 }}>
                              <label className="form-label" htmlFor="planner-location">Ort des Projekts</label>
                              <input
                                className="form-input"
                                type="text"
                                id="planner-location"
                                required
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                placeholder="e.g. 31600 Uchte oder Hannover"
                                style={{ color: "var(--text-dark)" }}
                              />
                            </div>
                            <div style={{ flex: 1 }}>
                              <label className="form-label" htmlFor="planner-timeframe">Wunschzeitraum</label>
                              <input
                                className="form-input"
                                type="text"
                                id="planner-timeframe"
                                value={formData.timeframe}
                                onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                                placeholder="e.g. Herbst 2026"
                                style={{ color: "var(--text-dark)" }}
                              />
                            </div>
                          </div>

                          {/* Interactive Drag & Drop Uploader */}
                          <div className="form-group">
                            <label className="form-label">Fotos oder Pläne des aktuellen Zustands hochladen (optional)</label>
                            <div 
                              className={`photo-dropzone ${dragActive ? "drag-active" : ""}`}
                              onDragEnter={handleDrag}
                              onDragOver={handleDrag}
                              onDragLeave={handleDrag}
                              onDrop={handleDrop}
                              onClick={() => document.getElementById("contact-file-input")?.click()}
                            >
                              <input 
                                type="file"
                                id="contact-file-input"
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

                        <div className="planner-nav-row" style={{ marginTop: "3rem" }}>
                          <button className="btn btn-secondary" onClick={handleBack}>
                            <ArrowLeft size={14} style={{ marginRight: "0.5rem" }} />
                            Zurück
                          </button>
                          <button className="btn btn-primary" onClick={handleNext}>
                            Weiter
                            <ArrowRight size={14} style={{ marginLeft: "0.5rem" }} />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Kontakt */}
                    {plannerStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ duration: 0.5, ease }}
                      >
                        <h3 style={formTitleStyle}>Kontaktdaten & Projektbeschreibung</h3>

                        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                          <div className="form-group">
                            <label className="form-label" htmlFor="planner-name">Ihr Name</label>
                            <input
                              className="form-input"
                              type="text"
                              id="planner-name"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="Name eingeben"
                              style={{ color: "var(--text-dark)" }}
                            />
                          </div>

                          <div className="form-group form-grid-row" style={formRowStyle}>
                            <div style={{ flex: 1 }}>
                              <label className="form-label" htmlFor="planner-email">E-Mail Adresse</label>
                              <input
                                className="form-input"
                                type="email"
                                id="planner-email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="moin@work4palace.de"
                                style={{ color: "var(--text-dark)" }}
                              />
                            </div>
                            <div style={{ flex: 1 }}>
                              <label className="form-label" htmlFor="planner-phone">Telefonnummer</label>
                              <input
                                className="form-input"
                                type="tel"
                                id="planner-phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="Telefon eingeben"
                                style={{ color: "var(--text-dark)" }}
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="form-label" htmlFor="planner-message">Projektbeschreibung / Ihre Wünsche</label>
                            <textarea
                              className="form-textarea"
                              id="planner-message"
                              required
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              placeholder="Beschreiben Sie Ihr Bauvorhaben..."
                              style={{ color: "var(--text-dark)" }}
                            ></textarea>
                          </div>
                        </div>

                        <div className="planner-nav-row">
                          <button className="btn btn-secondary" onClick={handleBack}>
                            <ArrowLeft size={14} style={{ marginRight: "0.5rem" }} />
                            Zurück
                          </button>
                          <button
                            className="btn btn-primary"
                            disabled={!formData.name || !formData.email}
                            onClick={handleSubmit}
                            style={{ opacity: (!formData.name || !formData.email) ? 0.5 : 1, cursor: (!formData.name || !formData.email) ? "not-allowed" : "pointer" }}
                          >
                            Anfrage absenden
                            <ClipboardCheck size={14} style={{ marginLeft: "0.5rem" }} />
                          </button>
                        </div>
                      </motion.div>
                    )}

                  </form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease }}
                    style={successBlockStyle}
                  >
                    <CheckCircle2 size={64} color="var(--primary)" style={{ marginBottom: "1.5rem" }} />
                    <h3 style={successTitleStyle}>Anfrage erfolgreich übermittelt</h3>
                    <p style={successDescStyle}>
                      Vielen Dank. Tina Heinecke hat Ihre Sanierungsanfrage erhalten. Wir nehmen in Kürze persönlichen Kontakt zu Ihnen auf, um die baulichen Gegebenheiten vor Ort abzustimmen.
                    </p>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setPlannerStep(1);
                        setIsSubmitted(false);
                        setUploadedFiles([]);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          location: "",
                          projectType: "",
                          scopeSize: "50-100 qm",
                          timeframe: "",
                          message: ""
                        });
                      }}
                    >
                      Weitere Anfrage senden
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

/* Styles */
const heroHeadlineStyle: React.CSSProperties = {
  fontSize: "3.5rem",
  lineHeight: "1.15",
  letterSpacing: "-0.01em",
  marginBottom: "1.5rem",
  color: "var(--text-dark)"
};

const heroSublineStyle: React.CSSProperties = {
  fontSize: "1.15rem",
  lineHeight: "1.75",
  color: "var(--text-muted-dark)",
  fontWeight: 300,
  maxWidth: "780px",
  margin: "0 auto"
};

const infoBlockStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
};

const formCardStyle: React.CSSProperties = {
  background: "var(--bg-light-soft)",
  border: "1px solid var(--border-dark)",
  padding: "4rem 3.5rem",
  boxShadow: "var(--shadow-soft)",
  position: "relative"
};

const formTitleStyle: React.CSSProperties = {
  fontSize: "2rem",
  color: "var(--text-dark)",
  marginBottom: "2.5rem",
  fontFamily: "var(--font-serif)"
};

const formRowStyle: React.CSSProperties = {
  display: "flex",
  gap: "2rem"
};

const successBlockStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  padding: "3rem 0"
};

const successTitleStyle: React.CSSProperties = {
  fontSize: "1.75rem",
  color: "var(--text-dark)",
  marginBottom: "1rem"
};

const successDescStyle: React.CSSProperties = {
  color: "var(--text-muted-dark)",
  fontSize: "0.95rem",
  lineHeight: "1.7",
  marginBottom: "2.5rem",
  maxWidth: "400px"
};

const styleTag = document.createElement("style");
styleTag.innerHTML = `
  @media (max-width: 600px) {
    .form-grid-row {
      flex-direction: column !important;
      gap: 0 !important;
    }
  }
`;
document.head.appendChild(styleTag);

export default ContactPage;
