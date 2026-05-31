import { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import ContactPage from "./pages/ContactPage";
import PortfolioPage from "./pages/PortfolioPage";
import AdminPage from "./pages/AdminPage";
import ImpressumPage from "./pages/ImpressumPage";
import DatenschutzPage from "./pages/DatenschutzPage";
import AccessibilityPage from "./pages/AccessibilityPage";
import Footer from "./components/Footer";
import LegalModals from "./components/LegalModals";

type PageType = "home" | "services" | "about" | "contact" | "portfolio" | "admin" | "impressum" | "datenschutz" | "accessibility";

function App() {
  const [activePage, setActivePage] = useState<PageType>("home");


  const [legalModal, setLegalModal] = useState<{
    isOpen: boolean;
    type: "impressum" | "datenschutz" | null;
  }>({
    isOpen: false,
    type: null,
  });

  // Global Accessibility States
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    return localStorage.getItem("w4p_high_contrast") === "true";
  });

  // Apply accessibility settings globally
  useEffect(() => {
    // Apply high contrast mode class
    if (highContrast) {
      document.body.classList.add("high-contrast-mode");
    } else {
      document.body.classList.remove("high-contrast-mode");
    }
  }, [highContrast]);

  const handleContrastToggle = (active: boolean) => {
    setHighContrast(active);
    localStorage.setItem("w4p_high_contrast", active ? "true" : "false");
  };

  // Check URL hash for admin access & general SPA routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#admin") {
        setActivePage("admin");
        window.scrollTo({ top: 0, behavior: "instant" as any });
      } else if (hash === "#portfolio") {
        setActivePage("portfolio");
        window.scrollTo({ top: 0, behavior: "instant" as any });
      } else if (hash === "#services") {
        setActivePage("services");
        window.scrollTo({ top: 0, behavior: "instant" as any });
      } else if (hash === "#about") {
        setActivePage("about");
        window.scrollTo({ top: 0, behavior: "instant" as any });
      } else if (hash === "#contact") {
        setActivePage("contact");
        window.scrollTo({ top: 0, behavior: "instant" as any });
      } else if (hash === "#impressum") {
        setActivePage("impressum");
        window.scrollTo({ top: 0, behavior: "instant" as any });
      } else if (hash === "#datenschutz") {
        setActivePage("datenschutz");
        window.scrollTo({ top: 0, behavior: "instant" as any });
      } else if (hash === "#barrierefreiheit") {
        setActivePage("accessibility");
        window.scrollTo({ top: 0, behavior: "instant" as any });
      } else if (hash === "#home" || hash === "") {
        setActivePage("home");
      }
    };

    // Initial check on mount
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Sync navigation clicks with URL Hash
  const handlePageChange = (page: string) => {
    setActivePage(page as PageType);
    if (page === "home") {
      // Remove hash for homepage
      window.history.pushState("", document.title, window.location.pathname + window.location.search);
    } else {
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: "instant" as any });
  };

  const openLegalModal = (type: "impressum" | "datenschutz") => {
    // Redirect to separate legal pages instead of opening modals
    handlePageChange(type);
  };

  const closeLegalModal = () => {
    setLegalModal({ isOpen: false, type: null });
  };

  // Redirect directly to the beautiful uncropped portfolio page
  const handleScrollToProjects = () => {
    setActivePage("portfolio");
    window.scrollTo({ top: 0, behavior: "instant" as any });
  };

  return (
    <div className="page-container" style={{ backgroundColor: "var(--bg-dark)", minHeight: "100vh", position: "relative" }}>
      {/* Immersive fixed background image (shining through translucent dark sections) */}
      <div className="fixed-scroll-video-container">
        <img 
          src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/00000212.webp" 
          alt="" 
          className="scroll-video-frame"
          draggable="false"
        />
      </div>
      {/* Dynamic Nav Header */}
      <Header
        activePage={activePage}
        onPageChange={handlePageChange}
      />

      {/* Main Multi-page content area */}
      <main style={{ flexGrow: 1 }}>
        {activePage === "home" && (
          <Home
            onContactClick={() => handlePageChange("contact")}
            onServicesClick={() => handlePageChange("services")}
            onProjectsClick={handleScrollToProjects}
          />
        )}
        {activePage === "services" && (
          <Services
            onContactClick={() => handlePageChange("contact")}
          />
        )}
        {activePage === "about" && (
          <About
            onContactClick={() => handlePageChange("contact")}
          />
        )}
        {activePage === "portfolio" && (
          <PortfolioPage />
        )}
        {activePage === "admin" && (
          <AdminPage onPageChange={handlePageChange} />
        )}
        {activePage === "impressum" && (
          <ImpressumPage />
        )}
        {activePage === "datenschutz" && (
          <DatenschutzPage />
        )}
        {activePage === "accessibility" && (
          <AccessibilityPage
            highContrast={highContrast}
            onContrastToggle={handleContrastToggle}
          />
        )}
        {activePage === "contact" && (
          <ContactPage />
        )}
      </main>

      {/* Central Footer */}
      <Footer
        onPageChange={handlePageChange}
        onImpressumClick={() => openLegalModal("impressum")}
        onDatenschutzClick={() => openLegalModal("datenschutz")}
      />

      {/* Legal disclosures modals */}
      <LegalModals
        isOpen={legalModal.isOpen}
        type={legalModal.type}
        onClose={closeLegalModal}
      />
    </div>
  );
}

export default App;
