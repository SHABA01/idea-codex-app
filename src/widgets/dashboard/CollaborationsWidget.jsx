// src/widgets/dashboard/CollaborationsWidget.jsx

const CollaborationsWidget = ({ mode }) => {
  if (mode === "limited") {
    return (
      <p>
        Collaboration features are locked. Upgrade to invite and manage
        collaborators.
      </p>
    );
  }

  if (mode === "basic") {
    return (
      <p>
        You are collaborating on 2 projects. Upgrade to unlock real-time
        collaboration and permissions.
      </p>
    );
  }

  return (
    <ul>
      <li>Ada — Editor</li>
      <li>Samuel — Viewer</li>
      <li>Mary — Commenter</li>
    </ul>
  );
};

export default CollaborationsWidget;
