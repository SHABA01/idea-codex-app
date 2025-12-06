// src/components/studio/ToolRegistry.js
// Register tools here. Each tool may optionally set `premium: true` to lock in demo.
import IdeaBuilderTool from "./tools/IdeaBuilderTool";
import ResearchTool from "./tools/ResearchTool";

const toolRegistry = [
  {
    id: "idea-builder",
    name: "Idea Builder",
    icon: "fa-solid fa-pen-nib",
    premium: false,
    Component: IdeaBuilderTool,
  },
  {
    id: "research",
    name: "Research",
    icon: "fa-solid fa-magnifying-glass",
    premium: true, // example premium tool
    Component: ResearchTool,
  },
];

export default toolRegistry;
