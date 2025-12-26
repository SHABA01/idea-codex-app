// HeatmapChart.jsx
const HeatmapChart = ({ data }) => (
  <div className="heatmap">
    {data.map((row, i) => (
      <div key={i} className="heatmap-row">
        {row.map((cell, j) => (
          <span
            key={j}
            className="heatmap-cell"
            style={{ opacity: cell / 10 }}
          />
        ))}
      </div>
    ))}
  </div>
);

export default HeatmapChart;
