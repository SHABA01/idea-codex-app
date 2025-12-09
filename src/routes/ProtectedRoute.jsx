import React from "react";
import { Navigate } from "react-router-dom";
import { useAppAccess } from "../contexts/AppAccessContext";

/**
 * Protects a route for a required feature.
 * Usage: <Route path="/studio" element={<ProtectedRoute feature="studio" element={<Studio/>} />} />
 */
const ProtectedRoute = ({ feature, element, redirectTo = "/choice" }) => {
  const { canAccess } = useAppAccess();
  if (canAccess(feature)) {
    return element;
  }
  // optional: pass reason or prompt
  return <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
