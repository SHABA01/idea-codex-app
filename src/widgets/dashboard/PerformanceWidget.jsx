// src/widgets/dashboard/PerformanceWidget.jsx

const PerformanceWidget = ({ mode }) => {
  if (mode === "limited") {
    return (
      <p>
        Recent performance preview. Upgrade to view full performance history and
        insights.
      </p>
    );
  }

  if (mode === "basic") {
    return (
      <ul>
        <li>Idea updated</li>
        <li>New comment added</li>
        <li>Workspace accessed</li>
      </ul>
    );
  }

  return (
    <ul>
      <li>Idea “Smart Budget App” edited 2 hours ago</li>
      <li>Comment added by Ada on Collaboration thread</li>
      <li>Workspace synced across devices</li>
      <li>AI Mentor session completed</li>
    </ul>
  );
};

export default PerformanceWidget;