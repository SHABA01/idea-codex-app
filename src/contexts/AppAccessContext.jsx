import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import perms from "../utils/permissions.json";

const AppAccessContext = createContext(null);

export const AppAccessProvider = ({ children, initial = {} }) => {
  const [tier, setTier] = useState(initial.tier || "demo");
  const [quota, setQuota] = useState(
    initial.quota || {
      projectsUsed: 0,
      apiCreditsUsed: 0,
      storageMB: 0
    }
  );

  useEffect(() => {
    try {
      const saved = localStorage.getItem("app-access-tier");
      if (saved && perms.tiers.includes(saved)) {
        setTier(saved);
      }
    } catch {}
  }, []);

  const switchMode = (nextTier) => {
    if (!perms.tiers.includes(nextTier)) return;
    setTier(nextTier);
    try {
      localStorage.setItem("app-access-tier", nextTier);
    } catch {}
  };

  const policy = useMemo(() => {
    return perms.policy[tier] || perms.policy.demo;
  }, [tier]);

  const canAccess = (featureKey) => {
    const parts = featureKey.split(".");
    let cursor = policy;
    for (const p of parts) {
      if (cursor == null) return false;
      cursor = cursor[p];
    }

    if (cursor === "none" || cursor === undefined) return false;
    if (typeof cursor === "boolean") return cursor;
    if (typeof cursor === "number") return cursor > 0;
    return true;
  };

  const RequireFeature = ({ feature, fallback = null, children }) => {
    return canAccess(feature) ? children : fallback;
  };

  const useFeatureGate = (feature) => {
    const allowed = canAccess(feature);
    return {
      allowed,
      upgradePrompt: () => ({
        title: "Upgrade required",
        message: `This feature requires a higher plan. Current plan: ${tier}.`,
        suggestions: Object.keys(perms.policy)
          .filter((t) => t !== tier)
          .slice(0, 2)
          .map((t) => ({
            tier: t,
            benefits: perms.policy[t]
          }))
      })
    };
  };

  return (
    <AppAccessContext.Provider
      value={{
        tier,
        switchMode,
        setAccessMode: switchMode,
        quota,
        setQuota,
        policy,
        canAccess,
        RequireFeature,
        useFeatureGate
      }}
    >
      {children}
    </AppAccessContext.Provider>
  );
};

export const useAppAccess = () => {
  const ctx = useContext(AppAccessContext);
  if (!ctx) {
    throw new Error("useAppAccess must be used within AppAccessProvider");
  }
  return ctx;
};
