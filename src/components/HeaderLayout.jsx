// src/components/HeaderLayout.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import "../styles/HeaderLayout.css";
import logo from "../assets/IdeaCodex_icon_yellow.png";
import { getSavedUser } from "../utils/storage";

const HeaderLayout = ({ onOpenMobile = () => {}, mobileOpen = false }) => {
  const navigate = useNavigate();
  const user = getSavedUser();

  const initials = (() => {
    const name = (user?.displayName || user?.fullName || "IdeaCodex").trim();
    return name ? name.charAt(0).toUpperCase() : "I";
  })();

  return (
    <header className="app-header">
      <div className="app-header-left">
        {/* Mobile menu button */}
        <button
          className={`mobile-open ${mobileOpen ? "open" : ""}`}
          onClick={onOpenMobile}
          aria-label="Open menu"
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        {/* Breadcrumb Component */}
        <Breadcrumbs />
      </div>

      <div className="app-header-right">
        {/* Avatar */}
        <div
          className="header-avatar"
          title={user?.displayName || user?.fullName || "IdeaCodex"}
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="avatar"
              className="header-avatar-img"
              onError={(e) => (e.target.src = logo)}
            />
          ) : (
            <div className="avatar-initials">{initials}</div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderLayout;
