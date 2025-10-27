import React from "react";
import "../styles/Features.css";

const Features = () => {
  const cards = [
    {
      title: "Idea Studio",
      text: "Transform your ideas into detailed plans with our AI-powered studio.",
    },
    {
      title: "AI Collaboration",
      text: "Collaborate with our advanced AI to refine and enhance your ideas.",
    },
    {
      title: "Idea Marketplace",
      text: "Explore and share innovative ideas with our global creative community.",
    },
    {
      title: "AI Mentor (Coming Soon)",
      text: "Receive personalized insights, feedback, and learning recommendations from your AI mentor to grow your ideas.",
      comingSoon: true, // flag for styling
    },
  ];

  return (
    <section className="features">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`feature-card ${card.comingSoon ? "coming-soon" : ""}`}
        >
          <h3>{card.title}</h3>
          <p>{card.text}</p>
        </div>
      ))}
    </section>
  );
};

export default Features;
