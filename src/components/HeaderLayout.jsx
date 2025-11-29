// src/components/HeaderLayout.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { buildBreadcrumbs } from "../utils/breadcrumbs";
import ThemeToggle from "./ThemeToggle";
import "../styles/HeaderLayout.css";
import logo from "../assets/IdeaCodex_icon_yellow.png";
import { getSavedUser } from "../utils/storage";

const HeaderLayout = ({ onOpenMobile = () => {} }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const crumbs = buildBreadcrumbs(location.pathname);
  const user = getSavedUser(); // your util — returns unified ideaCodexUser object or null

  const initials = (() => {
    const name = (user?.displayName || user?.fullName || "IdeaCodex").trim();
    return name ? name.charAt(0).toUpperCase() : "I";
  })();

  return (
    <header className="app-header">
      <div className="app-header-left">
        <button className="mobile-open" onClick={onOpenMobile} aria-label="Open menu">
          <i className="fa-solid fa-bars"></i>
        </button>

        <div className="breadcrumb-wrap" onClick={() => navigate("/")}>
          <img src={logo} alt="IdeaCodex" className="header-logo" />
          <nav className="breadcrumbs" aria-label="Breadcrumbs">
            {crumbs.length === 0 ? (
              <span className="crumb">Home</span>
            ) : (
              crumbs.map((c, i) => (
                <span key={c.path} className="crumb" onClick={() => navigate(c.path)}>
                  {c.label} {i < crumbs.length - 1 && <span className="sep">›</span>}
                </span>
              ))
            )}
          </nav>
        </div>
      </div>

      <div className="app-header-right">
        <ThemeToggle />
        {/* small avatar/initials */}
        <div className="header-avatar" title={user?.displayName || user?.fullName || "IdeaCodex"}>
          {user?.avatar ? (
            <img src={user.avatar} alt="avatar" className="header-avatar-img" onError={(e) => (e.target.src = logo)} />
          ) : (
            <div className="avatar-initials">{initials}</div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderLayout;
