import BaseChart from "../../components/charts/BaseChart";

const InsightsWidget = () => {
  const data = {
    labels: ["Ideas", "Validated", "Rejected"],
    datasets: [
      {
        data: [12, 7, 3],
        backgroundColor: [
          "rgba(250,204,21,0.8)",
          "rgba(34,197,94,0.8)",
          "rgba(239,68,68,0.8)"
        ]
      }
    ]
  };

  return (
    <BaseChart
      type="pie"
      data={data}
      options={{
        plugins: { legend: { position: "bottom" } }
      }}
    />
  );
};

export default InsightsWidget;
