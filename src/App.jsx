// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import ChoiceModal from "./pages/ChoiceModal";

import { LoaderProvider } from "./contexts/LoaderContext";
import { StudioAccessProvider } from "./contexts/StudioAccessContext";

import AppLayout from "./layouts/AppLayout";
import StudioPage from "./pages/Studio";
import MarketPlace from "./pages/MarketPlace";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";

import PageNotFound from "./pages/PageNotFound";
// import ProcessLoader from "./components/loaders/ProcessLoader";
// import SplashRouteWrapper from "./routes/SplashRouteWrapper";

const App = () => {
  return (
    <LoaderProvider>
      <StudioAccessProvider>
        <Router>

          <Routes>
            {/* Public pages */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth/:mode" element={<AuthPage />} />
            <Route path="/choice" element={<ChoiceModal />} />

            {/* Internal app pages */}
            <Route element={<AppLayout />}>
              <Route path="/studio" element={<StudioPage />} />
              <Route path="/market" element={<MarketPlace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/community" element={<Community />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>

          {/* <ProcessLoader /> */}
        </Router>
      </StudioAccessProvider>
    </LoaderProvider>
  );
};

export default App;
