// src/components/SplashRouteWrapper.jsx
import React, { useState } from "react";
import SplashScreen from "../components/loaders/SplashScreen";

const SplashRouteWrapper = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
        <div style={{ opacity: 1, transition: "opacity 0.4s ease" }}>{children}</div>
      )}
    </>
  );
};

export default SplashRouteWrapper;
