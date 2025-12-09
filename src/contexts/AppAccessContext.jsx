// src/contexts/AppAccessContext.jsx
import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import perms from "../utils/permissions.json"; // or import the json object

const AppAccessContext = createContext();

export const AppAccessProvider = ({ children, initial = {} }) => {
  // store current tier: demo | live | pro | enterprise
  const [tier, setTier] = useState(initial.tier || "demo");
  // optional: user's quota state (projectsUsed, apiCreditsUsed, storageUsedMB)
  const [quota, setQuota] = useState(initial.quota || {
    projectsUsed: 0,
    apiCreditsUsed: 0,
    storageMB: 0
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("app-access-tier");
      if (saved && perms.tiers.includes(saved)) {
        setTier(saved);
      }
    } catch {} 
  }, []);

  const switchMode = (next) => {
    if (!perms.tiers.includes(next)) return;
    setTier(next);
    try { localStorage.setItem("app-access-tier", next); } catch {}
  };

  // Backwards compatibility alias (if components still call setAccessMode)
  const setAccessMode = switchMode;

  // Retrieve effective policy object for current tier
  const policy = useMemo(() => {
    return perms.policy[tier] || perms.policy["demo"];
  }, [tier]);

  // Helper: check if feature allowed
  const canAccess = (featureKey) => {
    // support dot-notation for nested keys (e.g., tools.ai)
    const parts = featureKey.split(".");
    let val = policy;
    for (const p of parts) {
      if (val === undefined) return false;
      val = val[p];
    }
    if (val === undefined || val === "none") return false;
    // truthy checks
    if (typeof val === "boolean") return val;
    if (typeof val === "number") return val > 0;
    if (typeof val === "string") return val !== "none" && val !== "read";
    return true;
  };

  // Route guard helper component
  const RequireFeature = ({ feature, fallback = null, children }) => {
    if (canAccess(feature)) return children;
    return fallback;
  };

  // UI helper for gating — returns a hook-like object
  const useFeatureGate = (feature) => {
    return {
      allowed: canAccess(feature),
      upgradePrompt: () => ({ // a small object used by UI to show message
        title: "Upgrade required",
        message: `This feature requires a higher plan. Current plan: ${tier}.`,
        suggestions: Object.keys(perms.policy)
          .filter(t => t !== tier)
          .slice(0, 2)
          .map(t => ({ tier: t, benefits: perms.policy[t] }))
      })
    };
  };

  const value = {
    tier,
    switchMode,
    setAccessMode, // alias for compatibility
    policy,
    quota,
    setQuota,
    canAccess,
    RequireFeature,
    useFeatureGate
  };

  return <AppAccessContext.Provider value={value}>{children}</AppAccessContext.Provider>;
};

export const useAppAccess = () => {
  const ctx = useContext(AppAccessContext);
  if (!ctx) {
    throw new Error("useAppAccess must be used within an AppAccessProvider");
  }
  return ctx;
};
