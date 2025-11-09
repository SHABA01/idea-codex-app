// src/components/NeuralNetworkConstellation.jsx
import React, { useEffect, useRef } from "react";
import "../../styles/NeuralNetworkBackground.css";

/**
 * NeuralNetworkConstellation
 * - A canvas-based node+link animation that can form a target "constellation"
 * - Props:
 *   - nodeCount (number) default 40
 *   - responsiveTargets (bool) auto-picks logo/text/logo+text based on viewport
 *   - targetType (string | null) "logo+text" | "text" | "logo" | null (if set, overrides responsiveTargets)
 *   - logoSrc (string) path to logo (SVG/PNG). Prefer same-origin/bundled asset.
 *   - phaseDurations ({random, move, hold, dissolve}) in ms
 *   - loop (bool) whether to repeat the full sequence
 *   - nodeColor/linkColor overrides (strings)
 *   - targetScale (0-1) scale of constellation relative to canvas (default 0.7)
 *   - withSpiral (bool) uses same spiral overlay as your other background
 *   - onComplete (fn) called when a non-looping sequence finishes
 */

const defaultDurations = { random: 1200, move: 900, hold: 1400, dissolve: 700 };

const pickTargetTypeFromWidth = (w) => {
  if (w >= 1025) return "logo+text";
  if (w >= 601) return "text";
  return "logo";
};

const generateOTPString = () => Math.floor(100000 + Math.random() * 900000).toString();

const NeuralNetworkConstellation = ({
  nodeCount = 40,
  nodeColor,
  linkColor,
  responsiveTargets = true,
  targetType = null,
  logoSrc = null,
  phaseDurations = defaultDurations,
  loop = false,
  targetScale = 0.72,
  withSpiral = false,
  className = "",
  onComplete
}) => {
  const canvasRef = useRef(null);
  const nodesRef = useRef([]);
  const targetsRef = useRef(null);
  const phaseRef = useRef("random");
  const rafRef = useRef(null);

  useEffect(() => {
    // Respect prefers-reduced-motion: skip constellation phases if true
    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // choose effective target type
    const effectiveTargetType = targetType || (responsiveTargets ? pickTargetTypeFromWidth(window.innerWidth) : null);

    // init nodes (random positions + velocities)
    nodesRef.current = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
    }));

    // helper: sample visible pixels from offscreen canvas (text/logo)
    const sampleTargetsFromTextOrLogo = async (type) => {
      const off = document.createElement("canvas");
      // set offscreen size relative to canvas for good resolution
      const sW = Math.max(320, Math.floor(width * targetScale));
      const sH = Math.max(120, Math.floor((sW * 0.35)));
      off.width = sW;
      off.height = sH;
      const octx = off.getContext("2d");
      octx.clearRect(0, 0, sW, sH);
      octx.fillStyle = "white";

      // Draw text if needed
      if (type === "text" || type === "logo+text") {
        // choose font-size relative to offscreen height
        const fontSize = Math.floor(sH * 0.6);
        octx.font = `${fontSize}px Inter, system-ui, sans-serif`;
        octx.textBaseline = "middle";
        const text = "IdeaCodex";
        const tw = octx.measureText(text).width;
        octx.fillText(text, (sW - tw) / 2, sH / 2);
      }

      // Draw logo if needed
      if ((type === "logo" || type === "logo+text") && logoSrc) {
        // load image (ensure same origin / bundled)
        const img = new Image();
        img.src = logoSrc;
        // If using bundler import, you can pass the imported value as logoSrc
        await new Promise((res) => { img.onload = res; img.onerror = res; });
        // draw smaller and center-left to avoid overlapping text too much when "logo+text"
        const maxImgW = sW * (type === "logo+text" ? 0.35 : 0.6);
        const scale = Math.min(maxImgW / img.width, sH / img.height, 1);
        const iw = img.width * scale;
        const ih = img.height * scale;
        const x = (sW - iw) / 2;
        const y = (sH - ih) / 2;
        octx.drawImage(img, x, y, iw, ih);
      }

      // sample pixels with stride
      const samples = [];
      const data = octx.getImageData(0, 0, off.width, off.height).data;
      const stride = 6; // adjust density
      for (let y = 0; y < off.height; y += stride) {
        for (let x = 0; x < off.width; x += stride) {
          const idx = (y * off.width + x) * 4 + 3;
          if (data[idx] > 128) {
            // map sample to main canvas space (centered)
            const rx = (x / off.width - 0.5) * width * targetScale + width / 2;
            const ry = (y / off.height - 0.5) * height * targetScale + height / 2;
            samples.push({ x: rx, y: ry });
          }
        }
      }

      return samples;
    };

    // prepare target points and assign to targetsRef
    const prepareTargets = async () => {
      if (!effectiveTargetType) {
        targetsRef.current = null;
        return;
      }
      const samples = await sampleTargetsFromTextOrLogo(effectiveTargetType);
      if (!samples || samples.length === 0) {
        // fallback: random points
        const fallback = Array.from({ length: nodeCount }, () => ({ x: Math.random() * width, y: Math.random() * height }));
        targetsRef.current = fallback;
        return;
      }
      // choose nodeCount points from samples (uniformly)
      const chosen = [];
      const step = Math.max(1, Math.floor(samples.length / nodeCount));
      for (let i = 0; i < nodeCount; i++) {
        chosen.push(samples[(i * step) % samples.length]);
      }
      targetsRef.current = chosen;
    };

    // animation loop (draw + physics)
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // determine drawing styles based on phase
      const phase = phaseRef.current;
      const effectiveLink = linkColor || "rgba(255,215,45,0.12)";
      const effectiveNode = nodeColor || "rgba(255,215,45,0.85)";

      // update nodes
      nodesRef.current.forEach((n, i) => {
        if (phase === "move" && targetsRef.current) {
          const t = targetsRef.current[i % targetsRef.current.length];
          // eased lerp toward target
          n.x += (t.x - n.x) * 0.14;
          n.y += (t.y - n.y) * 0.14;
        } else if (phase === "hold" && targetsRef.current) {
          const t = targetsRef.current[i % targetsRef.current.length];
          n.x += (t.x - n.x) * 0.22;
          n.y += (t.y - n.y) * 0.22;
        } else if (phase === "dissolve") {
          // scatter
          n.vx = (Math.random() - 0.5) * 2;
          n.vy = (Math.random() - 0.5) * 2;
          n.x += n.vx;
          n.y += n.vy;
        } else {
          // random roam
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        }
      });

      // draw links (simple O(N^2) — okay for <= ~80 nodes)
      const maxDist = 120;
      const linkAlpha = (phase === "move" || phase === "hold") ? 0.28 : 0.10;
      ctx.lineWidth = (phase === "move" || phase === "hold") ? 0.9 : 0.45;
      ctx.strokeStyle = effectiveLink;
      for (let i = 0; i < nodesRef.current.length; i++) {
        const a = nodesRef.current[i];
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const b = nodesRef.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx.globalAlpha = linkAlpha * (1 - dist / maxDist);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      // draw nodes
      nodesRef.current.forEach((n) => {
        ctx.fillStyle = effectiveNode;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.1, 0, Math.PI * 2);
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    // timeline controller: runs the phases in sequence
    let cancelled = false;
    const runSequence = async () => {
      // immediate random phase (already moving)
      phaseRef.current = "random";
      if (prefersReduced) {
        // if reduced motion requested, skip to keep it light
        if (!loop) onComplete?.();
        return;
      }
      await new Promise((r) => setTimeout(r, phaseDurations.random));

      // prepare targets then move
      await prepareTargets();
      if (cancelled) return;
      phaseRef.current = "move";
      await new Promise((r) => setTimeout(r, phaseDurations.move));
      if (cancelled) return;
      phaseRef.current = "hold";
      await new Promise((r) => setTimeout(r, phaseDurations.hold));
      if (cancelled) return;
      phaseRef.current = "dissolve";
      await new Promise((r) => setTimeout(r, phaseDurations.dissolve));
      if (cancelled) return;
      phaseRef.current = "random";
      // sequence complete
      if (loop) {
        // small delay then repeat
        setTimeout(() => {
          if (!cancelled) runSequence();
        }, 200);
      } else {
        onComplete?.();
      }
    };

    // start render loop & sequence
    draw();
    runSequence();

    // resize handler
    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);
    // slight delayed resize to fix initial layout
    setTimeout(handleResize, 120);

    // cleanup
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [
    nodeCount,
    responsiveTargets,
    targetType,
    logoSrc,
    phaseDurations.random,
    phaseDurations.move,
    phaseDurations.hold,
    phaseDurations.dissolve,
    loop,
    nodeColor,
    linkColor,
    targetScale,
    onComplete
  ]);

  return (
    <div className={`neural-wrapper ${className}`} style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {withSpiral && <div className="spiral-overlay" aria-hidden="true" />}
      <canvas ref={canvasRef} className="neural-bg" />
    </div>
  );
};

export default NeuralNetworkConstellation;
