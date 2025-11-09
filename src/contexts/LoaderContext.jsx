// src/contexts/LoaderContext.jsx
import React, { createContext, useContext, useState, useCallback } from "react";

const LoaderContext = createContext();

export const useLoader = () => useContext(LoaderContext);

/**
 * LoaderProvider manages a simple global loading overlay.
 * showLoader() and hideLoader() control display.
 * Optionally provide a message and an autoHide timeout.
 */
export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const showLoader = useCallback((opts = {}) => {
    setMessage(opts.message || "");
    setLoading(true);
    if (opts.autoHideMs) {
      setTimeout(() => setLoading(false), opts.autoHideMs);
    }
  }, []);

  const hideLoader = useCallback(() => {
    setLoading(false);
    setMessage("");
  }, []);

  return (
    <LoaderContext.Provider value={{ loading, message, showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};
