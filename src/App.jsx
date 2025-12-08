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
import Gallery from "./pages/Gallery";
import Recommended from "./pages/Recommended";
import Trending from "./pages/Trending";
import Templates from "./pages/Templates";
import Extensions from "./pages/Extensions";
import AITools from "./pages/AITools";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";
import Collab from "./pages/Collaborations";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

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
              <Route path="/market/gallery" element={<Gallery />} />
              <Route path="/market/recommended" element={<Recommended />} />
              <Route path="/market/trending" element={<Trending />} />
              <Route path="/tools/templates" element={<Templates />} />
              <Route path="/tools/extensions" element={<Extensions />} />
              <Route path="/tools/ai_tools" element={<AITools />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/community" element={<Community />} />
              <Route path="/collab" element={<Collab />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
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
