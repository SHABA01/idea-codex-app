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
const Sidebar = ({
  collapsed,
  setCollapsed,
  mobileOpen: controlledMobileOpen,
  onCloseMobile
}) => {
  const navigate = useNavigate();
  const [showExpand, setShowExpand] = useState(false);

  const [internalMobileOpen, setInternalMobileOpen] = useState(false);
  const mobileOpen =
    typeof controlledMobileOpen === "boolean"
      ? controlledMobileOpen
      : internalMobileOpen;

  const setMobileOpen = (v) => {
    if (typeof controlledMobileOpen === "boolean") {
      if (!v && typeof onCloseMobile === "function") onCloseMobile();
    } else {
      setInternalMobileOpen(v);
    }
  };

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [mobileOpen]);

  const renderItem = (item) => (
    <NavLink
      to={item.path}
      key={item.id}
      className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
      onClick={() => mobileOpen && setMobileOpen(false)}
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
          
          {/* FIXED CONTAINER FOR ICON SWAPPING */}
          <div className="header-toggle-area">
          
            {/* LOGO */}
            {(!collapsed || !showExpand) && (
              <div className="brand" onClick={() => navigate("/")}>
                <img src={logo} alt="IdeaCodex Logo" className="brand-logo" />
              </div>
            )}
        
            {/* EXPAND ICON */}
            {collapsed && showExpand && (
              <button
                className="collapse-btn expand-btn"
                onClick={() => setCollapsed(false)}
                title="Expand sidebar"
              >
                <i className="fa-solid fa-angles-right"></i>
              </button>
            )}
        
          </div>
          
          {/* COLLAPSE ICON (RIGHT SIDE, behaves exactly same) */}
          {!collapsed && (
            <button
              className="collapse-btn"
              onClick={() => setCollapsed(true)}
              title="Collapse sidebar"
            >
              ✕
            </button>
          )}
        </div>
        

        <nav className="sidebar-nav" aria-label="Primary">
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
          {/* SIDEBAR THEME TOGGLE (styled like nav-item) */}
          <div className="nav-item sidebar-theme-toggle">
            <ThemeToggle sidebarMode collapsed={collapsed} />
          </div>
          
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

      {/* === Mobile Drawer (only mounted when open) === */}
      {mobileOpen && (
        <div className="mobile-drawer open" aria-hidden={!mobileOpen}>
          {/* backdrop */}
          <div
            className="mobile-backdrop"
            role="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setMobileOpen(false);
            }}
            tabIndex={0}
          />

          {/* drawer content */}
          <div className="mobile-inner" role="dialog" aria-modal="true">
            <div className="mobile-inner-header">
              <div className="brand" onClick={() => { setMobileOpen(false); navigate("/"); }}>
                <img src={logo} alt="IdeaCodex Logo" className="brand-logo" />
              </div>
              <button className="btn-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                ✕
              </button>
            </div>
          
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
            
            <div className="mobile-footer">
              <div className="nav-item sidebar-theme-toggle">
                <ThemeToggle sidebarMode />
              </div>
            
              <NavLink to="/settings" className="nav-item settings">
                <i className="fa-solid fa-gear" />
                <span>Settings</span>
              </NavLink>
            
              <NavLink to="/auth/logout" className="nav-item logout">
                <i className="fa-solid fa-right-from-bracket" />
                <span>Log Out</span>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
