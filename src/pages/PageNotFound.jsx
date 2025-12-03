import React from "react";
import NeuralNetworkBackground from "../components/NeuralNetworkBackground";
import "../styles/PageNotFound.css";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="pnf-container">
      <NeuralNetworkBackground withSpiral={false} nodeCount={40} />

      <div className="pnf-foreground">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-subtitle">Page Not Found</h2>
        <p className="pnf-text">
          Looks like you’re off the grid.  
          Let’s guide you back to the right path.
        </p>

        <button className="pnf-btn" onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    </div>
  );
}
