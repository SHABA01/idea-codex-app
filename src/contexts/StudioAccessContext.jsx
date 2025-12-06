import { createContext, useContext, useState, useEffect } from "react";

const StudioAccessContext = createContext(null);

export const StudioAccessProvider = ({ children }) => {
  const [mode, setMode] = useState("guest"); 
  // "guest" | "demo" | "live"

  // persists mode across reloads
  useEffect(() => {
    const saved = localStorage.getItem("ic_access_mode");
    if (saved) setMode(saved);
  }, []);

  const setAccessMode = (value) => {
    setMode(value);
    localStorage.setItem("ic_access_mode", value);
  };

  return (
    <StudioAccessContext.Provider value={{ mode, setAccessMode }}>
      {children}
    </StudioAccessContext.Provider>
  );
};

export const useStudioAccess = () => useContext(StudioAccessContext);
