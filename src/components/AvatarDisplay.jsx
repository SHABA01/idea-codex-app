// src/components/AvatarDisplay.jsx
import React, { useEffect, useState } from "react";
import "../styles/AvatarDisplay.css"; // small companion styles (initials etc.)

/**
 * AvatarDisplay
 *
 * Props:
 * - avatar: string | undefined (data:, blob:, or remote URL)
 * - name: string (used to show initials fallback)
 * - size: number (px) default 43
 * - className: optional extra class names
 * - placeholderMode: "profileModal" | "choiceModal"
 *     - "profileModal": shows the textual "No Image" placeholder when no avatar (keeps your current UX)
 *     - "choiceModal": shows user initial (first character from name) when no avatar
 */
const AvatarDisplay = ({
  avatar,
  name = "",
  size = 43,
  className = "",
  placeholderMode = "choiceModal",
}) => {
  const [src, setSrc] = useState("");
  const [isBlob, setIsBlob] = useState(false);

  // Keep track of created object URL so we can revoke it
  useEffect(() => {
    let active = true;
    let objectUrl = null;

    const setDirect = (v, blobFlag = false) => {
      if (!active) return;
      setSrc(v || "");
      setIsBlob(blobFlag);
    };

    // Normalize handling:
    // - blob: -> use directly
    // - data: -> fetch and create ObjectURL (more stable)
    // - http(s) -> use directly
    if (!avatar || typeof avatar !== "string" || avatar.trim() === "") {
      setDirect("", false);
      return () => {
        active = false;
      };
    }

    if (avatar.startsWith("blob:")) {
      setDirect(avatar, true);
      return () => {
        active = false;
      };
    }

    if (avatar.startsWith("data:")) {
      // Convert data URL -> Blob -> Object URL
      (async () => {
        try {
          const res = await fetch(avatar);
          const blob = await res.blob();
          objectUrl = URL.createObjectURL(blob);
          setDirect(objectUrl, true);
        } catch (err) {
          // fallback to using data URL directly if anything fails
          setDirect(avatar, false);
        }
      })();

      return () => {
        active = false;
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
          objectUrl = null;
        }
      };
    }

    // Otherwise assume it's a remote URL (http/https) - use directly
    setDirect(avatar, false);

    return () => {
      active = false;
    };
  }, [avatar]);

  // Revoke blob URL on unmount if needed
  useEffect(() => {
    return () => {
      if (isBlob && src && src.startsWith("blob:")) {
        try {
          URL.revokeObjectURL(src);
        } catch (e) {
          // noop
        }
      }
    };
  }, [isBlob, src]);

  const firstChar = (name || "").trim().charAt(0).toUpperCase();

  // Render logic:
  // - If src available => <img>
  // - Else if placeholderMode === 'profileModal' => keep your "No Image" placeholder div
  // - Else (choiceModal) => show initials bubble
  if (src) {
    return (
      <img
        src={src}
        alt={name ? `${name} avatar` : "Avatar"}
        className={className}
        style={{ width: size, height: size }}
        onError={(e) => {
          // fallback: if image load fails, remove src so fallback displays
          e.currentTarget.onerror = null;
          setSrc("");
        }}
      />
    );
  }

  if (placeholderMode === "profileModal") {
    return <div className="avatar-placeholder" style={{ width: size, height: size }}>No Image</div>;
  }

  // choiceModal: show initials circle (keeps your visual style; you can style .avatar-initials in AvatarDisplay.css)
  return (
    <div
      className={`avatar-initials ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-hidden
    >
      {firstChar || "I"}
    </div>
  );
};

export default AvatarDisplay;
