import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, CheckCircle, Send } from "lucide-react";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Altbausanierung",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("https://work4palace-backend.friese-scholz.workers.dev/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          projectType: formData.projectType,
          message: formData.message,
          formType: "contact"
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage(data.message || "Es gab ein Problem beim Senden Ihrer Anfrage.");
      }
    } catch (err) {
      setErrorMessage("Netzwerkfehler. Bitte versuchen Sie es später noch einmal oder kontaktieren Sie uns direkt.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="section section-light" id="contact" style={{ borderBottom: "1px solid var(--border-dark)" }}>
      <div className="container">
        <div className="grid-2">
          {/* Left: Contact Info & Process */}
          <div style={infoBlockStyle}>
            <span className="section-eyebrow">Projektplanung</span>
            <h2 className="section-title" style={{ color: "var(--text-dark)", fontSize: "3rem" }}>Lassen Sie uns Ihre Vision realisieren</h2>
            <p className="section-desc" style={{ color: "var(--text-muted-dark)", marginBottom: "3rem" }}>
              Haben Sie ein historisches Gebäude, das Sie mit Respekt, edlen Mineralstoffen und meisterhafter Präzision in einen modernen Lebensraum verwandeln möchten? Beschreiben Sie uns Ihr Projekt – wir beraten Sie gern persönlich und unverbindlich.
            </p>

            {/* Direct Channels */}
            <div style={channelsContainerStyle}>
              <div style={channelItemStyle}>
                <div style={iconBoxStyle}><Mail size={18} color="var(--primary)" /></div>
                <div style={channelTextsStyle}>
                  <span style={channelLabelStyle}>E-Mail</span>
                  <a href="mailto:moin@work4palace.de" style={channelValueStyle}>moin@work4palace.de</a>
                </div>
              </div>
              <div style={channelItemStyle}>
                <div style={iconBoxStyle}><Phone size={18} color="var(--primary)" /></div>
                <div style={channelTextsStyle}>
                  <span style={channelLabelStyle}>Telefon</span>
                  <a href="tel:05763425622" style={channelValueStyle}>05763 - 425622</a>
                </div>
              </div>
              <div style={channelItemStyle}>
                <div style={iconBoxStyle}><MapPin size={18} color="var(--primary)" /></div>
                <div style={channelTextsStyle}>
                  <span style={channelLabelStyle}>Manufaktur-Sitz</span>
                  <span style={channelValueStyle}>Erlenweg 7, 31600 Uchte</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Premium Interactive Form */}
          <div style={formCardStyle}>
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit}
                  style={formStyle}
                >
                  <h3 style={formTitleStyle}>Projekt anfragen</h3>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Name / Ansprechpartner</label>
                    <input
                      className="form-input"
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Tina Heinecke"
                      style={{ color: "var(--text-dark)" }}
                    />
                  </div>

                  <div className="form-group" style={formRowStyle}>
                    <div style={{ flex: 1 }}>
                      <label className="form-label" htmlFor="email">E-Mail Adresse</label>
                      <input
                        className="form-input"
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="moin@work4palace.de"
                        style={{ color: "var(--text-dark)" }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label className="form-label" htmlFor="phone">Telefonnummer</label>
                      <input
                        className="form-input"
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="05763-425622"
                        style={{ color: "var(--text-dark)" }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="projectType">Gewünschte Arbeit</label>
                    <select
                      className="form-input"
                      id="projectType"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      style={{ color: "var(--text-dark)", border: "none", borderBottom: "1px solid var(--text-muted-dark)", borderRadius: 0, background: "transparent" }}
                    >
                      <option value="Altbausanierung">Exklusive Altbausanierung (Komplett)</option>
                      <option value="Kalkputz">Historischer Kalk- & Lehmputz</option>
                      <option value="Echtholz">Echtholzdielen & Massivparkett</option>
                      <option value="Substanzerhalt">Selektiver Rückbau & Wandaufbau</option>
                      <option value="Innenausbau">Hochwertiger Innenausbau</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: "3rem" }}>
                    <label className="form-label" htmlFor="message">Projektbeschreibung / Ihre Wünsche</label>
                    <textarea
                      className="form-textarea"
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Beschreiben Sie Ihr Bauvorhaben..."
                      style={{ color: "var(--text-dark)" }}
                    ></textarea>
                  </div>

                  {errorMessage && (
                    <div style={{ color: "#e63946", fontSize: "0.95rem", marginBottom: "1.5rem", fontWeight: 400, fontFamily: "var(--font-sans)" }}>
                      ⚠️ {errorMessage}
                    </div>
                  )}

                  <button 
                    className="btn btn-primary" 
                    type="submit" 
                    style={submitBtnStyle}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Wird gesendet..." : "Anfrage absenden"}
                    {!isSubmitting && <Send size={14} style={{ marginLeft: "0.75rem" }} />}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease }}
                  style={successBlockStyle}
                >
                  <CheckCircle size={64} color="var(--primary)" style={{ marginBottom: "1.5rem" }} />
                  <h3 style={successTitleStyle}>Anfrage erfolgreich übermittelt</h3>
                  <p style={successDescStyle}>
                    Vielen Dank für Ihr Vertrauen. Wir haben Ihre Projektanfrage erhalten. Tina Heinecke oder ein Projektverantwortlicher wird sich innerhalb der nächsten 24 bis 48 Stunden telefonisch oder per E-Mail bei Ihnen melden.
                  </p>
                  <button className="btn btn-secondary" onClick={() => setIsSubmitted(false)}>
                    Weitere Anfrage senden
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

/* Styles */
const infoBlockStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
};

const channelsContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "2rem"
};

const channelItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1.25rem"
};

const iconBoxStyle: React.CSSProperties = {
  width: "48px",
  height: "48px",
  backgroundColor: "rgba(184, 105, 69, 0.06)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid var(--border-dark)"
};

const channelTextsStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column"
};

const channelLabelStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "var(--text-muted-dark)"
};

const channelValueStyle: React.CSSProperties = {
  fontSize: "1.05rem",
  fontWeight: 500,
  color: "var(--text-dark)"
};

const formCardStyle: React.CSSProperties = {
  background: "var(--bg-light-soft)",
  border: "1px solid var(--border-dark)",
  padding: "4rem 3.5rem",
  boxShadow: "var(--shadow-soft)"
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column"
};

const formTitleStyle: React.CSSProperties = {
  fontSize: "2rem",
  color: "var(--text-dark)",
  marginBottom: "2.5rem"
};

const formRowStyle: React.CSSProperties = {
  display: "flex",
  gap: "2rem"
};

const submitBtnStyle: React.CSSProperties = {
  width: "100%",
  padding: "1.25rem"
};

/* Success block styles */
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

export default ContactForm;
