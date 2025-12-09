import { useAppAccess } from "../contexts/AppAccessContext";
import React from "react";

export function useUpgradePrompt(feature) {
  const { useFeatureGate, tier } = useAppAccess();
  const gate = useFeatureGate(feature);
  const showUpgrade = () => {
    // Implement your modal open logic here; for now we return data
    return gate.upgradePrompt();
  };
  return { allowed: gate.allowed, showUpgrade, tier, feature };
}

/* Simple Upgrade CTA button component */
export const UpgradeCTA = ({ feature, children, className = "btn-upgrade" }) => {
  const { allowed, showUpgrade } = useUpgradePrompt(feature);
  if (allowed) return children || null;
  return (
    <button
      className={className}
      onClick={() => {
        const payload = showUpgrade();
        // Replace with your modal open code
        window.dispatchEvent(
          new CustomEvent("openUpgradeModal", { detail: { feature, payload } })
        );
      }}
    >
      {children || "Upgrade to access"}
    </button>
  );
};
