export const ideaBuilderSchema = {
  id: "idea-builder",
  title: "Idea Builder",
  description:
    "Defines the core product idea, problem, solution, and intended value.",

  outputShape: {
    ideaName: "",
    oneLiner: "",
    problem: {
      description: "",
      whoItAffects: "",
      currentAlternatives: ""
    },
    solution: {
      description: "",
      keyDifferentiator: ""
    },
    value: {
      primaryValue: "",
      secondaryValue: ""
    }
  }
};
