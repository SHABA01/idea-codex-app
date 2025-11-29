// src/components/Sidebar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "../../components/ThemeToggle";
import "../../styles/Sidebar.css";
import logo from "../../assets/IdeaCodex_icon_yellow.png";
import sidebarConfig from "../../components/sidebar/sidebarConfig";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const renderItem = (item) => (
    <NavLink
      to={item.path}
      key={item.id}
      className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
    >
      <i className={item.icon} aria-hidden />
      {!collapsed && <span>{item.label}</span>}
    </NavLink>
  );

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="brand">
          <img src={logo} alt="IdeaCodex Logo" className="brand-logo" />
          {!collapsed && <h1 className="brand-text">IdeaCodex</h1>}
        </div>

        <button
          className="collapse-btn"
          onClick={() => setCollapsed((p) => !p)}
          aria-label="Toggle sidebar"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      <nav className="sidebar-nav">
        <h3 className="nav-section-title">{!collapsed && "Navigation"}</h3>

        {sidebarConfig.filter(i => !i.section).map(renderItem)}

        {sidebarConfig.filter(i => i.section).map((section) => (
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
  );
};

export default Sidebar;
