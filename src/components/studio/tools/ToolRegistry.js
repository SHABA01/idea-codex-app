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

export default [
  { id: "idea-builder", name: "Idea Builder", tier: "demo", Component: IdeaBuilderTool },
  { id: "problem-validator", name: "Problem Validator", tier: "live", Component: ProblemValidatorTool },
  { id: "solution-mapper", name: "Solution Mapper", tier: "live", Component: SolutionMapperTool },
  { id: "value-proposition", name: "Value Proposition", tier: "live", Component: ValuePropositionTool },
  { id: "target-audience", name: "Target Audience", tier: "live", Component: TargetAudienceTool },
  { id: "market-snapshot", name: "Market Snapshot", tier: "pro", Component: MarketSnapshotTool },
  { id: "competitor-breakdown", name: "Competitor Breakdown", tier: "pro", Component: CompetitorBreakdownTool },
  { id: "swot", name: "SWOT Generator", tier: "pro" , Component: SWOTTool },
  { id: "assumption-test", name: "Assumption Stress Test", tier: "pro", Component: AssumptionTestTool },
  { id: "risk-register", name: "Risk Register", tier: "pro", Component: RiskRegisterTool },
  { id: "feature-prioritizer", name: "Feature Prioritizer", tier: "pro", Component: FeaturePrioritizerTool },
  { id: "mvp-scope", name: "MVP Scope Builder", tier: "pro", Component: MVPScopeTool },
  { id: "roadmap", name: "Roadmap Generator", tier: "pro", Component: RoadmapTool },
  { id: "user-flow", name: "User Flow Draft", tier: "pro", Component: UserFlowTool },
  { id: "monetization", name: "Monetization Modeler", tier: "pro", Component: MonetizationTool },
  { id: "pitch-outline", name: "Pitch Outline", tier: "pro", Component: PitchOutlineTool },
  { id: "one-pager", name: "One-Pager", tier: "pro", Component: OnePagerTool },
  { id: "executive-summary", name: "Executive Summary", tier: "pro", Component: ExecutiveSummaryTool },
  { id: "export", name: "Export", tier: "live", Component: ExportTool },
  { id: "dashboard-summary", name: "Dashboard Summary", tier: "live", Component: DashboardSummaryTool }
];
