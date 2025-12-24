// src/widgets/dashboard/InsightsWidget.jsx

const InsightsWidget = ({ mode }) => {
  if (mode === "limited") {
    return (
      <p>
        Insights preview available. Upgrade to unlock AI-driven recommendations
        and trends.
      </p>
    );
  }

  if (mode === "basic") {
    return (
      <ul>
        <li>Your ideas perform best in Fintech</li>
        <li>Engagement peaks on weekends</li>
      </ul>
    );
  }

  return (
    <ul>
      <li>Fintech ideas have a 35% higher success rate</li>
      <li>Users engage 2× more with AI-assisted ideas</li>
      <li>Recommended next step: Launch MVP</li>
    </ul>
  );
};

export default InsightsWidget;
