// src/components/ThemeToggle.jsx
import React, { useEffect, useState } from "react";
import "../styles/ThemeToggle.css";

const ThemeToggle = () => {
  // Check user's system preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Initialize theme from localStorage or system default
  const [theme, setTheme] = useState(localStorage.getItem("theme") || (prefersDark ? "dark" : "light"));

  // Apply theme to <html> and save preference
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between light and dark
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === "light" ? (
        <i className="fa-solid fa-moon"></i> // 🌙 Dark mode icon
      ) : (
        <i className="fa-solid fa-sun"></i> // ☀️ Light mode icon
      )}
    </button>
  );
};

export default ThemeToggle;
