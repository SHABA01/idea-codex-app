// src/components/sidebar/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "../../components/ThemeToggle";
import "../../styles/Sidebar.css";
import logo from "../../assets/IdeaCodex_icon_yellow.png";
import sidebarConfig from "./sidebarConfig";

/**
 * Sidebar (merged desktop + mobile drawer)
 *
 * Props:
 * - mobileOpen (bool) optional: controlled from parent (AppLayout)
 * - onCloseMobile (fn) optional: callback when mobile drawer closes
 *
 * If mobileOpen is not provided, the component manages its own mobile state.
 */
const Sidebar = ({ mobileOpen: controlledMobileOpen, onCloseMobile }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [showExpand, setShowExpand] = useState(false);


  // support controlled/uncontrolled mobile open
  const [internalMobileOpen, setInternalMobileOpen] = useState(false);
  const mobileOpen = typeof controlledMobileOpen === "boolean" ? controlledMobileOpen : internalMobileOpen;
  const setMobileOpen = (v) => {
    if (typeof controlledMobileOpen === "boolean") {
      // controlled: call onCloseMobile when trying to close
      if (!v && typeof onCloseMobile === "function") onCloseMobile();
      // else parent will open/close
    } else {
      setInternalMobileOpen(v);
    }
  };

  useEffect(() => {
    // When mobile drawer opens, prevent body scroll
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  const renderItem = (item, onClickClose) => (
    <NavLink
      to={item.path}
      key={item.id}
      className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
      onClick={() => {
        // close mobile drawer on navigation
        if (mobileOpen) setMobileOpen(false);
        if (typeof onClickClose === "function") onClickClose();
      }}
    >
      <i className={item.icon} aria-hidden />
      {!collapsed && <span>{item.label}</span>}
    </NavLink>
  );

  return (
    <>
      {/* === Desktop Sidebar === */}
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`} aria-hidden={false}>
        <div
          className="sidebar-header"
          onMouseEnter={() => collapsed && setShowExpand(true)}
          onMouseLeave={() => collapsed && setShowExpand(false)}
        >
          {/* LOGO (visible only when NOT collapsed OR when not hovered) */}
          {(!collapsed || !showExpand) && (
            <div className="brand" onClick={() => navigate("/")}>
              <img src={logo} alt="IdeaCodex Logo" className="brand-logo" />
            </div>
          )}

          {/* EXPAND ICON (visible only when collapsed AND hovered) */}
          {collapsed && showExpand && (
            <button
              className="collapse-btn expand-btn"
              onClick={() => setCollapsed(false)}
              title="Expand sidebar"
            >
              <i className="fa-solid fa-angles-right"></i>
            </button>
          )}

          {/* COLLAPSE ICON (visible only when expanded) */}
          {!collapsed && (
            <button
              className="collapse-btn"
              onClick={() => setCollapsed(true)}
              title="Collapse sidebar"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          )}
        </div>

        <nav className="sidebar-nav" aria-label="Primary">
          <h3 className="nav-section-title">{!collapsed && "Navigation"}</h3>

          {sidebarConfig.filter((i) => !i.section).map((it) => (
            <React.Fragment key={it.id}>{renderItem(it)}</React.Fragment>
          ))}

          {sidebarConfig.filter((i) => i.section).map((section) => (
            <div key={section.section} className="sidebar-section">
              {!collapsed && <h4 className="nav-section-title">{section.title}</h4>}
              {section.children.map((c) => (
                <NavLink
                  key={c.id}
                  to={c.path}
                  className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
                >
                  <i className={c.icon} aria-hidden />
                  {!collapsed && <span>{c.label}</span>}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <ThemeToggle />
          <NavLink to="/settings" className="nav-item settings">
            <i className="fa-solid fa-gear" />
            {!collapsed && <span>Settings</span>}
          </NavLink>

          <NavLink to="/auth/logout" className="nav-item logout">
            <i className="fa-solid fa-right-from-bracket" />
            {!collapsed && <span>Log Out</span>}
          </NavLink>
        </div>
      </aside>

      {/* === Mobile Drawer (same structure, slides in) === */}
      <div className={`mobile-drawer ${mobileOpen ? "open" : ""}`} aria-hidden={!mobileOpen}>
        {/* backdrop */}
        <div
          className="mobile-backdrop"
          role="button"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setMobileOpen(false);
          }}
          tabIndex={mobileOpen ? 0 : -1}
        />

        {/* drawer content */}
        <div className="mobile-inner" role="dialog" aria-modal="true">
          <button className="btn-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            ✕
          </button>

          <nav className="mobile-nav" aria-label="Mobile primary">
            {sidebarConfig.filter((i) => !i.section).map((item) => (
              <NavLink key={item.id} to={item.path} className="nav-item" onClick={() => setMobileOpen(false)}>
                <i className={item.icon} />
                <span>{item.label}</span>
              </NavLink>
            ))}

            {sidebarConfig.filter((i) => i.section).map((section) => (
              <div key={section.section} className="mobile-section">
                <div className="mobile-section-title">{section.title}</div>
                {section.children.map((c) => (
                  <NavLink key={c.id} to={c.path} className="nav-item" onClick={() => setMobileOpen(false)}>
                    <i className={c.icon} />
                    <span>{c.label}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
