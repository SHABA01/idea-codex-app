export const marketSnapshotSchema = {
  id: "market-snapshot",
  title: "Market Snapshot",
  description:
    "High-level overview of the target market, customer segments, and current dynamics.",

  outputShape: {
    targetCustomer: "",
    customerContext: "",
    marketStage: "",        // emerging | growing | mature | declining
    demandDrivers: "",
    existingBehaviors: "",
    whyNow: ""
  }
};
