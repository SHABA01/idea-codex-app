import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Hero.css";
import NeuralNetworkBackground from "./NeuralNetworkBackground";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      {/* The dynamic background */}
      <NeuralNetworkBackground withSpiral={false} nodeCount={40} />

      {/* The floating content */}
      <div className="hero-content">
        <h1>Turning Concepts Into Reality</h1>
        <p>AI-powered platform for creators, innovators, and dreamers.</p>
        <div className="hero-buttons">
          <button className="btn-start" onClick={() => navigate("/studio")}>Start Creating</button>
          <button className="btn-explore" onClick={() => navigate("/market")}>Explore Marketplace</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
