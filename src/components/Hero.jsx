import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Turning Concepts Into Reality</h1>
        <p>AI-powered platform for creators, innovators, and dreamers.</p>
        <div className="hero-buttons">
          <button className="btn-start">Start Creating</button>
          <button className="btn-explore">Explore Marketplace</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
