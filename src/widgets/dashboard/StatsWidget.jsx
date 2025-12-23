// src/widgets/dashboard/StatsWidget.jsx

const StatsWidget = ({ mode }) => {
  if (mode === "limited") {
    return <p>Preview stats only.</p>;
  }

  if (mode === "basic") {
    return <p>Summary stats view.</p>;
  }

  return <p>Full analytics dashboard.</p>;
};

export default StatsWidget;
