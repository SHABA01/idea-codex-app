// src/components/Hero.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Hero.css";
import NeuralNetworkBackground from "./NeuralNetworkBackground";
import { useAppAccess } from "../contexts/AppAccessContext";

const Hero = () => {
  const navigate = useNavigate();
  const { switchMode } = useAppAccess();

  const handleStudioDemo = () => {
    switchMode("demo");
    navigate("/studio");
  };

  const handleMarketDemo = () => {
    switchMode("demo");
    navigate("/market/gallery");
  };

  return (
    <section className="hero">
      {/* The dynamic background */}
      <NeuralNetworkBackground withSpiral={false} nodeCount={40} />

      {/* The floating content */}
      <div className="hero-content">
        <h1>Turning Concepts Into Reality</h1>
        <p>AI-powered platform for creators, innovators, and dreamers.</p>

        <div className="hero-buttons">
          <button className="btn-explore-studio" onClick={handleStudioDemo}>
            Explore Studio
          </button>

          <button className="btn-explore-market" onClick={handleMarketDemo}>
            Explore Marketplace
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
