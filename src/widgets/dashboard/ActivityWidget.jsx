// src/widgets/dashboard/ActivityWidget.jsx

const ActivityWidget = ({ mode }) => {
  if (mode === "limited") {
    return (
      <p>
        Recent activity preview. Upgrade to view full activity history and
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

export default ActivityWidget;
