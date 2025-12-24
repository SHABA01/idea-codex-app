// src/widgets/dashboard/EarningsWidget.jsx

const EarningsWidget = ({ mode }) => {
  if (mode === "limited") {
    return (
      <p>
        Earnings insights are unavailable on your current plan. Upgrade to
        unlock monetization analytics.
      </p>
    );
  }

  if (mode === "basic") {
    return (
      <div>
        <p>Total Earnings: ₦45,000</p>
        <p>This Month: ₦12,500</p>
      </div>
    );
  }

  return (
    <div>
      <p>Total Earnings: ₦125,000</p>
      <p>This Month: ₦42,300</p>
      <p>Top Product: AI Resume Generator</p>
      <p>Conversion Rate: 4.8%</p>
    </div>
  );
};

export default EarningsWidget;
