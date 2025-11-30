// src/components/Breadcrumbs.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { generateBreadcrumb } from "../utils/breadcrumbs";
import "../styles/Breadcrumbs.css";

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const crumbs = generateBreadcrumb(pathname);

  return (
    <nav className="breadcrumbs">
      {crumbs.map((crumb, index) => (
        <span key={crumb.path} className="crumb">
          <Link to={crumb.path}>{crumb.label}</Link>
          {index < crumbs.length - 1 && <span className="separator">/</span>}
        </span>
      ))}
    </nav>
  );
}
