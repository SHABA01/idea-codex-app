export const featurePrioritizerSchema = {
  id: "feature-prioritizer",
  title: "Feature Prioritization",
  description:
    "Ranks product features based on impact, effort, and confidence to guide MVP and roadmap decisions.",

  outputShape: {
    method: "RICE-lite",
    features: [
      {
        name: "",
        description: "",
        reach: 0,
        impact: 0,
        confidence: 0,
        effort: 0,
        score: 0
      }
    ]
  }
};
