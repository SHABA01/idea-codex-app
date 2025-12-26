import "../../styles/charts.css";

const ChartContainer = ({ title, children, span = 1 }) => {
  return (
    <div className={`chart-container span-${span}`}>
      {title && <h4 className="chart-title">{title}</h4>}
      {children}
    </div>
  );
};

export default ChartContainer;
