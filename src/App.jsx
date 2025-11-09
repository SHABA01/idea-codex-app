// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import ChoiceModal from "./pages/ChoiceModal";
import { LoaderProvider } from "./contexts/LoaderContext";
import ProcessLoader from "./components/loaders/ProcessLoader";
import SplashRouteWrapper from "./routes/SplashRouteWrapper";

const App = () => {
  return (
    <LoaderProvider>
      <Router>
        {/* SplashRouteWrapper shows splash once per session before landing */}
        <SplashRouteWrapper>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth/:mode" element={<AuthPage />} />
            <Route path="/choice" element={<ChoiceModal />} />
            {/* add other routes here */}
          </Routes>
        </SplashRouteWrapper>

        {/* Global process loader (renders above everything when active) */}
        <ProcessLoader />
      </Router>
    </LoaderProvider>
  );
};

export default App;
