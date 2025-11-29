// src/components/MobileSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/Sidebar.css";
import sidebarConfig from "../../components/sidebar/sidebarConfig";

const MobileSidebar = ({ open = false, onClose = () => {} }) => {
  return (
    <div className={`mobile-drawer ${open ? "open" : ""}`} role="dialog" aria-hidden={!open}>
      <div className="mobile-inner">
        <button className="btn-close" onClick={onClose} aria-label="Close menu">✕</button>

        <nav className="mobile-nav">
          {sidebarConfig.filter(i => !i.section).map((item) => (
            <NavLink key={item.id} to={item.path} className="nav-item" onClick={onClose}>
              <i className={item.icon} />
              <span>{item.label}</span>
            </NavLink>
          ))}

          {sidebarConfig.filter(i => i.section).map((section) => (
            <div key={section.section} className="mobile-section">
              <div className="mobile-section-title">{section.title}</div>
              {section.children.map((c) => (
                <NavLink key={c.id} to={c.path} className="nav-item" onClick={onClose}>
                  <i className={c.icon} />
                  <span>{c.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </div>

      <div className="mobile-backdrop" onClick={onClose} />
    </div>
  );
};

export default MobileSidebar;
