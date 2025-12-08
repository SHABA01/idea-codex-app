import React, { createContext, useContext, useState, useEffect } from "react";

const StudioAccessContext = createContext();

export const StudioAccessProvider = ({ children }) => {
  const [mode, setMode] = useState("demo"); 
  // “demo” | “live”

  // Auto-detect from storage or default to “demo”
  useEffect(() => {
    try {
      const saved = localStorage.getItem("studio-access-mode");
      if (saved === "live" || saved === "demo") {
        setMode(saved);
      }
    } catch (_) {}
  }, []);

  const switchMode = (next) => {
    setMode(next);
    try {
      localStorage.setItem("studio-access-mode", next);
    } catch (_) {}
  };

  return (
    <StudioAccessContext.Provider value={{ mode, switchMode }}>
      {children}
    </StudioAccessContext.Provider>
  );
};

export const useStudioAccess = () => useContext(StudioAccessContext);
