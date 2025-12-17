// src/components/sidebar/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "../../components/ThemeToggle";
import "../../styles/Sidebar.css";
import logo from "../../assets/IdeaCodex_icon_yellow.png";
import { useAppAccess } from "../../contexts/AppAccessContext";
import sidebarConfig from "./sidebarConfig";

const Sidebar = ({
  collapsed,
  setCollapsed,
  mobileOpen: controlledMobileOpen,
  onCloseMobile
}) => {
  const navigate = useNavigate();
  const { tier } = useAppAccess();
  const tierLabel = tier?.toUpperCase() || "demo";

  const [showExpand, setShowExpand] = useState(false);
  const [internalMobileOpen, setInternalMobileOpen] = useState(false);

  const mobileOpen =
    typeof controlledMobileOpen === "boolean"
      ? controlledMobileOpen
      : internalMobileOpen;

  const setMobileOpen = (v) => {
    if (typeof controlledMobileOpen === "boolean") {
      if (!v && onCloseMobile) onCloseMobile();
    } else {
      setInternalMobileOpen(v);
    }
  };

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [mobileOpen]);

  /* =========================
     ACCESS LOGIC (FIXED)
  ========================= */

  // Item is visible to tier
  const hasAccess = (item) =>
    !item.access || item.access.includes(tier);

  // Item is visible but locked
  const isLocked = (item) =>
    item.premium && !item.access?.includes(tier);

  const handleLockedClick = (e) => {
    e.preventDefault();
    alert("Upgrade your plan to unlock this feature.");
  };

  const renderNavItem = (item, closeMobile = false) => {
    if (!hasAccess(item)) return null;

    const locked = isLocked(item);

    return (
      <NavLink
        key={item.id}
        to={locked ? "#" : item.path}
        className={({ isActive }) =>
          `nav-item ${isActive ? "active" : ""} ${locked ? "locked" : ""}`
        }
        onClick={(e) => {
          if (locked) return handleLockedClick(e);
          if (closeMobile) setMobileOpen(false);
        }}
      >
        <i className={item.icon} aria-hidden />
        {!collapsed && <span>{item.label}</span>}
        {locked && !collapsed && (
          <i className="fa-solid fa-lock lock-icon" />
        )}
      </NavLink>
    );
  };

  /* =========================
     DESKTOP SIDEBAR
  ========================= */

  return (
    <>
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div
          className="sidebar-header"
          onMouseEnter={() => collapsed && setShowExpand(true)}
          onMouseLeave={() => collapsed && setShowExpand(false)}
        >
          <div className="header-toggle-area">
            {(!collapsed || !showExpand) && (
              <div className="brand" onClick={() => navigate("/")}>
                <img src={logo} alt="IdeaCodex Logo" className="brand-logo" />
              </div>
            )}

            {collapsed && showExpand && (
              <button
                className="collapse-btn expand-btn"
                onClick={() => setCollapsed(false)}
                title="Expand sidebar"
              >
                <i className="fa-solid fa-angles-right" />
              </button>
            )}
          </div>

          {!collapsed && <div className="sidebar-mode">{tierLabel}</div>}

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
          {sidebarConfig
            .filter((i) => !i.section)
            .map((item) => renderNavItem(item))}

          {sidebarConfig
            .filter((i) => i.section)
            .map((section) => {
              if (!hasAccess(section)) return null;

              const visibleChildren =
                section.children.filter(hasAccess);

              if (!visibleChildren.length) return null;

              return (
                <div key={section.section} className="sidebar-section">
                  {!collapsed && (
                    <h4 className="nav-section-title">
                      {section.title}
                    </h4>
                  )}
                  {visibleChildren.map((child) =>
                    renderNavItem(child)
                  )}
                </div>
              );
            })}
        </nav>

        <div className="sidebar-footer">
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

      {/* =========================
          MOBILE DRAWER
      ========================= */}

      {mobileOpen && (
        <div className="mobile-drawer open">
          <div
            className="mobile-backdrop"
            role="button"
            tabIndex={0}
            onClick={() => setMobileOpen(false)}
            onKeyDown={(e) =>
              e.key === "Escape" && setMobileOpen(false)
            }
          />

          <div className="mobile-inner" role="dialog" aria-modal="true">
            <div className="mobile-inner-header">
              <div
                className="brand"
                onClick={() => {
                  setMobileOpen(false);
                  navigate("/");
                }}
              >
                <img src={logo} alt="IdeaCodex Logo" className="brand-logo" />
              </div>

              <div className="mobile-drawer-mode">{tierLabel}</div>

              <button
                className="btn-close"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <nav className="mobile-nav" aria-label="Mobile primary">
              {sidebarConfig
                .filter((i) => !i.section)
                .map((item) => renderNavItem(item, true))}

              {sidebarConfig
                .filter((i) => i.section)
                .map((section) => {
                  if (!hasAccess(section)) return null;

                  const visibleChildren =
                    section.children.filter(hasAccess);

                  if (!visibleChildren.length) return null;

                  return (
                    <div key={section.section} className="mobile-section">
                      <div className="mobile-section-title">
                        {section.title}
                      </div>
                      {visibleChildren.map((child) =>
                        renderNavItem(child, true)
                      )}
                    </div>
                  );
                })}
            </nav>

            <div className="mobile-footer">
              <div className="nav-item sidebar-theme-toggle">
                <ThemeToggle sidebarMode />
              </div>

              <NavLink
                to="/settings"
                className="nav-item settings"
                onClick={() => setMobileOpen(false)}
              >
                <i className="fa-solid fa-gear" />
                <span>Settings</span>
              </NavLink>

              <NavLink
                to="/auth/logout"
                className="nav-item logout"
                onClick={() => setMobileOpen(false)}
              >
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
