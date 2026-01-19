import IdeaBuilderTool from "./idea-builder/IdeaBuilderTool";
import ProblemValidatorTool from "./problem-validator/ProblemValidatorTool";
import SolutionMapperTool from "./solution-mapper/SolutionMapperTool";
import ValuePropositionTool from "./value-proposition/ValuePropositionTool";
import TargetAudienceTool from "./target-audience/TargetAudienceTool";
import MarketSnapshotTool from "./market-snapshot/MarketSnapshotTool";
import CompetitorBreakdownTool from "./competitor-breakdown/CompetitorBreakdownTool";
import SWOTTool from "./swot/SWOTTool";
import AssumptionTestTool from "./assumption-test/AssumptionTestTool";
import RiskRegisterTool from "./risk-register/RiskRegisterTool";
import FeaturePrioritizerTool from "./feature-prioritizer/FeaturePrioritizerTool";
import MVPScopeTool from "./mvp-scope/MVPScopeTool";
import RoadmapTool from "./roadmap/RoadmapTool";
import UserFlowTool from "./user-flow/UserFlowTool";
import MonetizationTool from "./monetization/MonetizationTool";
import PitchOutlineTool from "./pitch-outline/PitchOutlineTool";
import OnePagerTool from "./one-pager/OnePagerTool";
import ExecutiveSummaryTool from "./executive-summary/ExecutiveSummaryTool";
import ExportTool from "./export/ExportTool";
import DashboardSummaryTool from "./dashboard-summary/DashboardSummaryTool";

const toolRegistry = [
  {
    id: "idea-builder",
    name: "Idea Builder",
    icon: "fa-solid fa-lightbulb",
    Component: IdeaBuilderTool,
    visibleFor: ["demo", "live", "pro", "enterprise"],
    lockedBelow: null,
    accessLevelByTier: {
      demo: "DEMO",
      live: "CORE",
      pro: "ADVANCED",
      enterprise: "ENTERPRISE"
    },
    runtimeStatus: "STABLE"
  },

  {
    id: "problem-validator",
    name: "Problem Validator",
    icon: "fa-solid fa-circle-question",
    Component: ProblemValidatorTool,
    visibleFor: ["demo", "live", "pro", "enterprise"],
    lockedBelow: "live",
    accessLevelByTier: {
      live: "CORE",
      pro: "ADVANCED",
      enterprise: "ENTERPRISE"
    },
    runtimeStatus: "BETA"
  },

  {
    id: "solution-mapper",
    name: "Solution Mapper",
    icon: "fa-solid fa-diagram-project",
    Component: SolutionMapperTool,
    visibleFor: ["demo", "live", "pro", "enterprise"],
    lockedBelow: "live",
    accessLevelByTier: {
      live: "CORE",
      pro: "ADVANCED",
      enterprise: "ENTERPRISE"
    },
    runtimeStatus: "BETA"
  },

  {
    id: "value-proposition",
    name: "Value Proposition",
    icon: "fa-solid fa-gem",
    Component: ValuePropositionTool,
    visibleFor: ["demo", "live", "pro", "enterprise"],
    lockedBelow: "live",
    accessLevelByTier: {
      demo: "DEMO",
      live: "CORE",
      pro: "ADVANCED",
      enterprise: "ENTERPRISE"
    },
    runtimeStatus: "STABLE"
  },

  {
    id: "target-audience",
    name: "Target Audience",
    icon: "fa-solid fa-bullseye",
    Component: TargetAudienceTool,
    visibleFor: ["demo", "live", "pro", "enterprise"],
    lockedBelow: "live",
    accessLevelByTier: {
      demo: "DEMO",
      live: "CORE",
      pro: "ADVANCED",
      enterprise: "ENTERPRISE"
    },
    runtimeStatus: "STABLE"
  },

  {
    id: "market-snapshot",
    name: "Market Snapshot",
    icon: "fa-solid fa-chart-line",
    Component: MarketSnapshotTool,
    visibleFor: ["demo", "live", "pro", "enterprise"],
    lockedBelow: "pro",
    accessLevelByTier: {
      pro: "ADVANCED",
      enterprise: "ENTERPRISE"
    },
    runtimeStatus: "EXPERIMENTAL"
  },

  {
    id: "competitor-breakdown",
    name: "Competitor Breakdown",
    icon: "fa-solid fa-chess",
    Component: CompetitorBreakdownTool,
    visibleFor: ["demo", "live", "pro", "enterprise"],
    lockedBelow: "pro",
    accessLevelByTier: {
      demo: "DEMO",
      live: "CORE",
      pro: "ADVANCED",
      enterprise: "ENTERPRISE"
    },
    runtimeStatus: "STABLE"
  },

  {
    id: "swot",
    name: "SWOT Generator",
    icon: "fa-solid fa-table-cells",
    Component: SWOTTool,
    visibleFor: ["demo", "live", "pro", "enterprise"],
    lockedBelow: "pro",
    accessLevelByTier: {
      pro: "ADVANCED",
      enterprise: "ENTERPRISE"
    },
    runtimeStatus: "STABLE"
  },

  {
    id: "assumption-test",
    name: "Assumption Test",
    icon: "fa-solid fa-flask",
    Component: AssumptionTestTool,
    visibleFor: ["demo", "live", "pro", "enterprise"],
    lockedBelow: "pro",
    accessLevelByTier: {
      demo: "DEMO",
      live: "CORE",
      pro: "ADVANCED",
      enterprise: "ENTERPRISE"
    },
    runtimeStatus: "STABLE"
  },

  {
    id: "risk-register",
    name: "Risk Register",
    icon: "fa-solid fa-triangle-exclamation",
    Component: RiskRegisterTool,
    visibleFor: ["demo", "live", "pro", "enterprise"],
    lockedBelow: "pro",
    accessLevelByTier: {
      demo: "DEMO",
      live: "CORE",
      pro: "ADVANCED",
      enterprise: "ENTERPRISE"
    },
    runtimeStatus: "STABLE"
  },

  {
    id: "feature-prioritizer",
    name: "Feature Prioritizer",
    icon: "fa-solid fa-list-check",
    Component: FeaturePrioritizerTool,
    visibleFor: ["demo", "live", "pro", "enterprise"],
    lockedBelow: "pro",
    accessLevelByTier: {
      demo: "DEMO",
      live: "CORE",
      pro: "ADVANCED",
      enterprise: "ENTERPRISE"
    },
    runtimeStatus: "STABLE"
  },

  {
    id: "mvp-scope",
    name: "MVP Scope",
    icon: "fa-solid fa-box-open",
    Component: MVPScopeTool,
    visibleFor: ["demo", "live", "pro", "enterprise"],
    lockedBelow: "pro",
    accessLevelByTier: {
      demo: "DEMO",
      live: "CORE",
      pro: "ADVANCED",
      enterprise: "ENTERPRISE"
    },
    runtimeStatus: "STABLE"
  },

  {
    id: "roadmap",
    name: "Roadmap",
    icon: "fa-solid fa-route",
    Component: RoadmapTool,
    visibleFor: ["demo", "live", "pro", "enterprise"],
    lockedBelow: "pro",
    accessLevelByTier: {
      demo: "DEMO",
      live: "CORE",
      pro: "ADVANCED",
      enterprise: "ENTERPRISE"
    },
    runtimeStatus: "STABLE"
  },

  {
    id: "user-flow",
    name: "User Flow",
    icon: "fa-solid fa-arrows-turn-right",
    Component: UserFlowTool,
    visibleFor: ["demo", "live", "pro", "enterprise"],
    lockedBelow: "pro",
    accessLevelByTier: {
      demo: "DEMO",
      live: "CORE",
      pro: "ADVANCED",
      enterprise: "ENTERPRISE"
    },
    runtimeStatus: "STABLE"
  },

  {
    id: "monetization",
    name: "Monetization",
    icon: "fa-solid fa-coins",
    Component: MonetizationTool,
    visibleFor: ["demo", "live", "pro", "enterprise"],
    lockedBelow: "pro",
    accessLevelByTier: {
      demo: "DEMO",
      live: "CORE",
      pro: "ADVANCED",
      enterprise: "ENTERPRISE"
    },
    runtimeStatus: "STABLE"
  },

  {
    id: "pitch-outline",
    name: "Pitch Outline",
    icon: "fa-solid fa-person-chalkboard",
    Component: PitchOutlineTool,
    visibleFor: ["demo", "live", "pro", "enterprise"],
    lockedBelow: "live",
    accessLevelByTier: {
      demo: "DEMO",
      live: "CORE",
      pro: "ADVANCED",
      enterprise: "ENTERPRISE"
    },
    runtimeStatus: "STABLE"
  },

  {
    id: "one-pager",
    name: "One Pager",
    icon: "fa-solid fa-file-lines",
    Component: OnePagerTool,
    visibleFor: ["demo", "live", "pro", "enterprise"],
    lockedBelow: "live",
    accessLevelByTier: {
      demo: "DEMO",
      live: "CORE",
      pro: "ADVANCED",
      enterprise: "ENTERPRISE"
    },
    runtimeStatus: "STABLE"
  },

  {
    id: "executive-summary",
    name: "Executive Summary",
    icon: "fa-solid fa-briefcase",
    Component: ExecutiveSummaryTool,
    visibleFor: ["demo", "live", "pro", "enterprise"],
    lockedBelow: "pro",
    accessLevelByTier: {
      demo: "DEMO",
      live: "CORE",
      pro: "ADVANCED",
      enterprise: "ENTERPRISE"
    },
    runtimeStatus: "STABLE"
  },

  {
    id: "export",
    name: "Export",
    icon: "fa-solid fa-file-export",
    Component: ExportTool,
    visibleFor: ["demo", "live", "pro", "enterprise"],
    lockedBelow: "live",
    accessLevelByTier: {
      live: "CORE",
      pro: "ADVANCED",
      enterprise: "ENTERPRISE"
    },
    runtimeStatus: "STABLE"
  },

  {
    id: "dashboard-summary",
    name: "Dashboard Summary",
    icon: "fa-solid fa-gauge-high",
    Component: DashboardSummaryTool,
    visibleFor: ["demo", "live", "pro", "enterprise"],
    lockedBelow: "live",
    accessLevelByTier: {
      demo: "DEMO",
      live: "CORE",
      pro: "ADVANCED",
      enterprise: "ENTERPRISE"
    },
    runtimeStatus: "STABLE"
  }
];

export default toolRegistry;