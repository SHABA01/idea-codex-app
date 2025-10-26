import { useState, useRef, useEffect } from "react";
import logo from "../assets/IdeaCodex_icon_yellow.png";
import "./Header.css";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef(null);

  // --- Focus trap + scroll lock ---
  useEffect(() => {
    const handleFocus = (e) => {
      if (menuOpen && drawerRef.current && !drawerRef.current.contains(e.target)) {
        e.stopPropagation();
        drawerRef.current.querySelector("button, a")?.focus();
      }
    };

    if (menuOpen) {
      document.addEventListener("focusin", handleFocus);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("focusin", handleFocus);
      document.body.style.overflow = "auto";
    }

    return () => document.removeEventListener("focusin", handleFocus);
  }, [menuOpen]);

  return (
    <header className="header">
      {/* --- Logo Section --- */}
      <div className="logo-section">
        <img src={logo} alt="IdeaCodex Logo" className="logo-icon" />
        <h1 className="logo-text">IdeaCodex</h1>
      </div>

      {/* --- Desktop Buttons --- */}
      <div className="nav-buttons">
        <button className="btn-signin">Sign In</button>
        <button className="btn-signup">Sign Up</button>
        <ThemeToggle />
      </div>

      {/* --- Hamburger Icon (Mobile) --- */}
      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        aria-label="Toggle navigation"
        aria-controls="mobile-menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* --- Overlay (click to close) --- */}
      {menuOpen && (
        <div
          className={`nav-overlay ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* --- Off-Canvas Drawer --- */}
      <nav
        id="mobile-menu"
        className={`nav-drawer ${menuOpen ? "open" : ""}`}
        ref={drawerRef}
        aria-hidden={!menuOpen}
      >
        <button
          className="btn-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close navigation menu"
        >
          ✕
        </button>

        {/*<a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>*/}

        <button className="btn-signin" onClick={() => setMenuOpen(false)}>Sign In</button>
        <button className="btn-signup" onClick={() => setMenuOpen(false)}>Sign Up</button>
        {/*<ThemeToggle onClick={() => setMenuOpen(false)}/>*/}
        <ThemeToggle />
      </nav>
    </header>
  );
};

export default Header;
