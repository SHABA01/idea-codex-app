import { useState } from "react";
import ToolStepShell from "../common/ToolStepShell";
import ToolFooter from "../common/ToolFooter";
import { roadmapSchema } from "./roadmapSchema";

export default function RoadmapTool({ onInsert }) {
  const [data, setData] = useState(roadmapSchema.outputShape);
  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  return (
    <ToolStepShell title="Roadmap Generator">
      <div className="studio-tool-content">
        <textarea placeholder="Phase 1 (Now)" onChange={e => update("phase1", e.target.value)} />
        <textarea placeholder="Phase 2 (Next)" onChange={e => update("phase2", e.target.value)} />
        <textarea placeholder="Phase 3 (Later)" onChange={e => update("phase3", e.target.value)} />
        <textarea placeholder="Key dependencies" onChange={e => update("dependencies", e.target.value)} />
        <textarea placeholder="Success milestones" onChange={e => update("successMilestones", e.target.value)} />
      </div>

      <ToolFooter
        primaryAction={{
          label: "Insert Roadmap",
          onClick: () =>
            onInsert({ tool: roadmapSchema.id, title: roadmapSchema.title, content: data })
        }}
      />
    </ToolStepShell>
  );
}
