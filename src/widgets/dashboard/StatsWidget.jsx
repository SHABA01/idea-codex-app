// src/widgets/dashboard/StatsWidget.jsx

const StatsWidget = ({ mode }) => {
  /* ======================
     LIMITED MODE
     ====================== */
  if (mode === "limited") {
    return (
      <div>
        <p>
          High-level usage snapshot available.
          <br />
          Upgrade to unlock detailed performance metrics.
        </p>

        <ul>
          <li>Ideas created: 3+</li>
          <li>Active sessions: Recent</li>
        </ul>
      </div>
    );
  }

  /* ======================
     BASIC MODE
     ====================== */
  if (mode === "basic") {
    return (
      <div>
        <ul>
          <li>Total Ideas: 18</li>
          <li>Active Projects: 5</li>
          <li>Collaborations: 2</li>
          <li>Weekly Activity: ↑ 12%</li>
        </ul>
      </div>
    );
  }

  /* ======================
     FULL MODE
     ====================== */
  return (
    <div>
      <ul>
        <li>Total Ideas Created: 42</li>
        <li>Active Projects: 11</li>
        <li>Collaborators Invited: 6</li>
        <li>Weekly Activity Growth: ↑ 28%</li>
        <li>Top Category: Fintech</li>
      </ul>

      <p>
        Performance is trending positively. Your most successful ideas are
        AI-assisted and collaboration-driven.
      </p>
    </div>
  );
};

export default StatsWidget;
