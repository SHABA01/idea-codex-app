const IdeaStudioWidget = ({ mode }) => {
  if (mode === "limited") {
    return <p>Upgrade to unlock AI refinement tools.</p>;
  }

  return (
    <ul style={{ paddingLeft: "1rem", lineHeight: 1.6 }}>
      <li>Startup Pitch Draft — AI Score: 82%</li>
      <li>Fintech App Concept — Market Fit: High</li>
      <li>Creator Platform — Monetization Ready</li>
    </ul>
  );
};

export default IdeaStudioWidget;
