import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Trash2, Plus, Upload, CheckCircle2, ArrowRight } from "lucide-react";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imgUrl: string;
}

// Curated showcases R2 assets
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

interface AdminPageProps {
  onPageChange: (page: string) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ onPageChange }) => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(false);

  // New Item States
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Wandaufbau & Kalkputz");
  const [newImgUrl, setNewImgUrl] = useState("");
  const [localFileBase64, setLocalFileBase64] = useState("");
  const [localFileName, setLocalFileName] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [isCmsUploading, setIsCmsUploading] = useState(false);

  const ease = [0.16, 1, 0.3, 1] as const;

  // Load from localStorage
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

  const saveItems = (newItems: PortfolioItem[]) => {
    setItems(newItems);
    localStorage.setItem("w4p_portfolio_items", JSON.stringify(newItems));
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "work4palace-2026") {
      setIsAdminLoggedIn(true);
      setLoginError(false);
      setPasswordInput("");
    } else {
      setLoginError(true);
      setPasswordInput("");
    }
  };

  // Process file upload into Base64
  const handleLocalFileProcess = (files: FileList) => {
    if (files && files[0]) {
      const file = files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert("Die Datei ist zu groß (max. 10 MB).");
        return;
      }
      setIsCmsUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setLocalFileBase64(e.target.result as string);
          setLocalFileName(file.name);
          setNewImgUrl(""); // Clear URL field if file picked
        }
        setIsCmsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCmsDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleCmsDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleLocalFileProcess(e.dataTransfer.files);
    }
  };

  // Add Item to localStorage
  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    const finalImgUrl = localFileBase64 || newImgUrl;

    if (!newTitle.trim()) {
      alert("Bitte geben Sie einen Titel für das Projektbeispiel ein.");
      return;
    }
    if (!finalImgUrl) {
      alert("Bitte wählen Sie eine lokale Bilddatei aus oder geben Sie eine Bild-URL ein.");
      return;
    }

    const newItem: PortfolioItem = {
      id: Date.now().toString(),
      title: newTitle,
      category: newCategory,
      imgUrl: finalImgUrl
    };

    const updated = [newItem, ...items];
    saveItems(updated);

    // Reset Form
    setNewTitle("");
    setNewImgUrl("");
    setLocalFileBase64("");
    setLocalFileName("");
    alert("Das Projektbeispiel wurde erfolgreich zur Galerie hinzugefügt!");
  };

  // Delete Item from localStorage
  const handleDeleteItem = (idToDelete: string) => {
    if (window.confirm("Möchten Sie dieses Projektbeispiel wirklich unwiderruflich aus der Galerie löschen?")) {
      const updated = items.filter(item => item.id !== idToDelete);
      saveItems(updated);
    }
  };

  return (
    <div className="page-container" style={{ backgroundColor: "var(--bg-light)" }}>
      {/* Header padding offset */}
      <div style={{ height: "80px" }}></div>

      {!isAdminLoggedIn ? (
        /* Majestic Central CMS login screen */
        <section className="section section-light" style={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "80vh" }}>
          <div className="container" style={{ maxWidth: "440px" }}>
            <motion.div
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease }}
              style={{
                backgroundColor: "var(--bg-dark-soft)",
                border: "1px solid var(--border-primary)",
                padding: "4.5rem 3rem",
                boxShadow: "var(--shadow-luxury)",
                textAlign: "center"
              }}
            >
              <div style={{ width: "52px", height: "52px", borderRadius: "50%", backgroundColor: "rgba(184, 105, 69, 0.12)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                <Lock size={24} color="var(--primary)" />
              </div>
              <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.85rem", color: "var(--text-light)", marginBottom: "0.5rem" }}>
                work4palace CMS
              </h1>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--text-muted-light)", marginBottom: "2.5rem", fontWeight: 300 }}>
                Geben Sie Ihren Administratorschlüssel ein, um die Bildergalerie zu verwalten.
              </p>

              <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.75rem", textAlign: "left" }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ color: "var(--text-light)" }}>Passwort</label>
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setLoginError(false);
                    }}
                    className="form-input"
                    placeholder="Administratorschlüssel eingeben"
                    style={{ color: "var(--text-light)", borderBottomColor: loginError ? "#b23b3b" : "var(--text-muted-light)" }}
                  />
                  {loginError && (
                    <span style={{ fontSize: "0.75rem", color: "#b23b3b", marginTop: "0.5rem", display: "block" }}>
                      Ungültiger Schlüssel. Bitte versuchen Sie es erneut.
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%", marginTop: "1rem" }}
                >
                  Dashboard entsperren
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      ) : (
        /* Full Dedicated CMS Administration Workspace */
        <section className="section section-light" style={{ flexGrow: 1, padding: "6rem 0" }}>
          <div className="container">
            <div className="cms-dashboard-container">
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4rem", borderBottom: "1px solid var(--border-light)", paddingBottom: "2rem", flexWrap: "wrap", gap: "1.5rem" }}>
                <div>
                  <span className="section-eyebrow" style={{ color: "var(--primary)" }}>Verwaltungszentrale</span>
                  <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2.75rem", color: "var(--text-light)" }}>
                    work4palace CMS Dashboard
                  </h2>
                  <p style={{ color: "var(--text-muted-light)", fontSize: "0.95rem", fontWeight: 300, marginTop: "0.25rem" }}>
                    Aktualisieren Sie die Projektbeispiele in Echtzeit.
                  </p>
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <button
                    onClick={() => onPageChange("portfolio")}
                    className="btn btn-secondary"
                    style={{ color: "var(--text-light)", borderColor: "var(--border-light)", display: "inline-flex", gap: "0.5rem" }}
                  >
                    Zur Galerie wechseln
                    <ArrowRight size={14} />
                  </button>
                  <button
                    onClick={() => {
                      setIsAdminLoggedIn(false);
                      onPageChange("portfolio");
                    }}
                    className="btn btn-primary"
                  >
                    Abmelden
                  </button>
                </div>
              </div>

              <div className="cms-grid">
                {/* Left Column: Form Card */}
                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.65rem", color: "var(--text-light)", marginBottom: "2rem" }}>
                    Neues Projektbeispiel hinzufügen
                  </h3>

                  <form onSubmit={handleAddNewItem} className="cms-form-card">
                    {/* Drag and Drop Base64 uploader */}
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ color: "var(--text-light)" }}>Bilddatei hochladen (Empfohlen)</label>
                      <div
                        className={`cms-file-dropzone ${dragActive ? "drag-active" : ""}`}
                        onDragEnter={handleCmsDrag}
                        onDragOver={handleCmsDrag}
                        onDragLeave={handleCmsDrag}
                        onDrop={handleCmsDrop}
                        onClick={() => document.getElementById("cms-page-file-picker")?.click()}
                        style={{
                          borderColor: localFileBase64 ? "var(--primary)" : "rgba(255, 255, 255, 0.15)",
                          backgroundColor: localFileBase64 ? "rgba(184, 105, 69, 0.03)" : "rgba(255, 255, 255, 0.01)"
                        }}
                      >
                        <input
                          type="file"
                          id="cms-page-file-picker"
                          onChange={(e) => {
                            if (e.target.files) handleLocalFileProcess(e.target.files);
                          }}
                          accept="image/*"
                          style={{ display: "none" }}
                        />
                        <div style={{ display: "inline-flex", width: "44px", height: "44px", borderRadius: "50%", backgroundColor: "rgba(255, 255, 255, 0.03)", alignItems: "center", justifyContent: "center", marginBottom: "1rem", color: "var(--text-muted-light)" }}>
                          {localFileBase64 ? <CheckCircle2 size={20} color="var(--primary)" /> : <Upload size={20} />}
                        </div>
                        {localFileBase64 ? (
                          <>
                            <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", fontWeight: 600, color: "var(--text-light)" }}>
                              {localFileName}
                            </h4>
                            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--primary)", marginTop: "0.25rem", fontWeight: 500 }}>
                              Foto erfolgreich verschlüsselt & bereit
                            </p>
                          </>
                        ) : (
                          <>
                            <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", fontWeight: 600, color: "var(--text-light)" }}>
                              {isCmsUploading ? "Datei wird eingelesen..." : "Bilddatei hierher ziehen"}
                            </h4>
                            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--text-muted-light)", marginTop: "0.25rem" }}>
                              oder vom PC auswählen (JPEG/PNG)
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                      <div style={{ height: "1px", flexGrow: 1, backgroundColor: "var(--border-light)" }}></div>
                      <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted-light)" }}>ODER ALS URL</span>
                      <div style={{ height: "1px", flexGrow: 1, backgroundColor: "var(--border-light)" }}></div>
                    </div>

                    {/* Direct Image URL Input */}
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ color: "var(--text-light)" }}>Direkte Bild-URL</label>
                      <input
                        type="url"
                        value={newImgUrl}
                        onChange={(e) => {
                          setNewImgUrl(e.target.value);
                          if (e.target.value) {
                            setLocalFileBase64("");
                            setLocalFileName("");
                          }
                        }}
                        className="form-input"
                        placeholder="z.B. https://r2-storage.dev/.../bild.jpg"
                        style={{ color: "var(--text-light)" }}
                      />
                    </div>

                    {/* Project Title */}
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ color: "var(--text-light)" }}>Projektname / Überschrift (Hover-Effekt)</label>
                      <input
                        type="text"
                        required
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="form-input"
                        placeholder="z.B. Sumpfkalkputz im Flur"
                        style={{ color: "var(--text-light)" }}
                      />
                    </div>

                    {/* Category Selection */}
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ color: "var(--text-light)" }}>Kategorie</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        style={{
                          width: "100%",
                          background: "transparent",
                          border: "none",
                          borderBottom: "1px solid var(--text-muted-light)",
                          padding: "0.75rem 0",
                          color: "var(--text-light)",
                          fontFamily: "var(--font-sans)",
                          fontSize: "1rem",
                          cursor: "pointer"
                        }}
                      >
                        <option value="Wandaufbau & Kalkputz" style={{ backgroundColor: "var(--bg-dark-soft)" }}>Wandaufbau & Kalkputz</option>
                        <option value="Bodenaufbau & Echtholz" style={{ backgroundColor: "var(--bg-dark-soft)" }}>Bodenaufbau & Echtholz</option>
                        <option value="Innenausbau" style={{ backgroundColor: "var(--bg-dark-soft)" }}>Innenausbau</option>
                        <option value="Altbausanierung" style={{ backgroundColor: "var(--bg-dark-soft)" }}>Altbausanierung</option>
                        <option value="Rückbau & Vorbereitung" style={{ backgroundColor: "var(--bg-dark-soft)" }}>Rückbau & Vorbereitung</option>
                        <option value="Komplettsanierung" style={{ backgroundColor: "var(--bg-dark-soft)" }}>Komplettsanierung</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}
                    >
                      <Plus size={16} />
                      Projektbeispiel hinzufügen
                    </button>
                  </form>
                </div>

                {/* Right Column: List and Management */}
                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.65rem", color: "var(--text-light)", marginBottom: "2rem" }}>
                    Aktuelle Galeriebilder ({items.length})
                  </h3>

                  <div className="cms-items-list">
                    {items.map((item) => (
                      <div key={item.id} className="cms-item-row">
                        <img src={item.imgUrl} alt="" className="cms-item-preview" />
                        <div className="cms-item-details">
                          <span className="cms-item-title">{item.title}</span>
                          <span className="cms-item-cat">{item.category}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted-light)", padding: "0.5rem", transition: "var(--transition-fast)" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted-light)")}
                          aria-label="Projekt löschen"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default AdminPage;
