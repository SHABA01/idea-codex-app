// src/widgets/dashboard/IdeaStudioWidget.jsx

const IdeaStudioWidget = ({ mode }) => {
  if (mode === "limited") {
    return (
      <p>
        Create and explore ideas in limited mode. Upgrade to unlock AI-powered
        refinement tools.
      </p>
    );
  }

  if (mode === "basic") {
    return (
      <ul>
        <li>Startup Pitch Draft</li>
        <li>Fintech App Concept</li>
      </ul>
    );
  }

  return (
    <ul>
      <li>Startup Pitch Draft — AI Score: 82%</li>
      <li>Fintech App Concept — Market Fit: High</li>
      <li>Content Creator Platform — Monetization Ready</li>
    </ul>
  );
};

export default IdeaStudioWidget;
