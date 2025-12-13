// src/components/UpgradeModal.jsx
import React, { useEffect, useState } from "react";
import { useAppAccess } from "../contexts/AppAccessContext";

export default function UpgradeModal() {
  const [openData, setOpenData] = useState(null);
  const { switchMode, tier } = useAppAccess();

  useEffect(() => {
    const onOpen = (e) => setOpenData(e.detail);
    window.addEventListener("openUpgradeModal", onOpen);
    return () => window.removeEventListener("openUpgradeModal", onOpen);
  }, []);

  if (!openData) return null;

  const { feature, payload } = openData;

  return (
    <div className="upgrade-modal" role="dialog" aria-modal="true">
      <div className="upgrade-modal-inner">
        <h3>{payload.title}</h3>
        <p>{payload.message}</p>

        <div className="upgrade-options">
          {["live", "pro", "enterprise"].map((t) => (
            <button
              key={t}
              onClick={() => {
                switchMode(t);
                setOpenData(null);
              }}
            >
              Choose {t.toUpperCase()}
            </button>
          ))}
        </div>

        <button className="close" onClick={() => setOpenData(null)}>Close</button>
      </div>
    </div>
  );
}
