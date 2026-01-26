import { useEffect, useMemo, useState } from "react";
import ToolStepShell from "../common/ToolStepShell";
import { ideaBuilderSchema } from "./ideaBuilderSchema";
import "../../../../styles/IdeaBuilderTool.css";

export default function IdeaBuilderTool({
  draft,
  onDraftChange,
  onReadyChange
}) {
  const [data, setData] = useState(
    draft || {
      ideaName: "",
      oneLiner: "",
      problemDescription: "",
      whoItAffects: "",
      currentAlternatives: "",
      solutionDescription: "",
      keyDifferentiator: "",
      primaryValue: "",
      secondaryValue: ""
    }
  );

  const update = (field, value) => {
    setData((d) => ({ ...d, [field]: value }));
  };

  const sectionCompletion = useMemo(() => {
    return {
      core: Boolean(data.ideaName),
      problem: Boolean(data.problemDescription),
      solution: Boolean(data.solutionDescription),
      value: Boolean(data.primaryValue)
    };
  }, [data]);

  const completedCount = Object.values(sectionCompletion).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / 4) * 100);

  useEffect(() => {
    const ready =
      sectionCompletion.core &&
      sectionCompletion.problem &&
      sectionCompletion.solution;

    onReadyChange?.(ready);

    onDraftChange?.({
      tool: ideaBuilderSchema.id,
      title: ideaBuilderSchema.title,
      content: {
        ideaName: data.ideaName,
        oneLiner: data.oneLiner,
        problem: {
          description: data.problemDescription,
          whoItAffects: data.whoItAffects,
          currentAlternatives: data.currentAlternatives
        },
        solution: {
          description: data.solutionDescription,
          keyDifferentiator: data.keyDifferentiator
        },
        value: {
          primaryValue: data.primaryValue,
          secondaryValue: data.secondaryValue
        }
      }
    });
  }, [data, sectionCompletion, onDraftChange, onReadyChange]);

  return (
    <ToolStepShell>
      <div className="idea-builder">

        {/* Progress */}
        <div className="idea-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="progress-label">
            Idea clarity ({progressPercent}%)
          </span>
        </div>

        {/* Sections */}
        <div className="idea-sections">

          <section className={`idea-section ${sectionCompletion.core ? "completed" : ""}`}>
            <h4>Core Idea</h4>
            <input
              placeholder="Idea name"
              value={data.ideaName}
              onChange={(e) => update("ideaName", e.target.value)}
            />
            <input
              placeholder="One-line description"
              value={data.oneLiner}
              onChange={(e) => update("oneLiner", e.target.value)}
            />
          </section>

          <section className={`idea-section ${sectionCompletion.problem ? "completed" : ""}`}>
            <h4>Problem</h4>
            <textarea
              placeholder="What problem are you solving?"
              value={data.problemDescription}
              onChange={(e) => update("problemDescription", e.target.value)}
            />
            <input
              placeholder="Who experiences this problem?"
              value={data.whoItAffects}
              onChange={(e) => update("whoItAffects", e.target.value)}
            />
            <input
              placeholder="How do people solve this today?"
              value={data.currentAlternatives}
              onChange={(e) => update("currentAlternatives", e.target.value)}
            />
          </section>

          <section className={`idea-section ${sectionCompletion.solution ? "completed" : ""}`}>
            <h4>Solution</h4>
            <textarea
              placeholder="Describe your solution"
              value={data.solutionDescription}
              onChange={(e) => update("solutionDescription", e.target.value)}
            />
            <input
              placeholder="Key differentiator"
              value={data.keyDifferentiator}
              onChange={(e) => update("keyDifferentiator", e.target.value)}
            />
          </section>

          <section className={`idea-section ${sectionCompletion.value ? "completed" : ""}`}>
            <h4>Value</h4>
            <input
              placeholder="Primary value delivered"
              value={data.primaryValue}
              onChange={(e) => update("primaryValue", e.target.value)}
            />
            <input
              placeholder="Secondary value (optional)"
              value={data.secondaryValue}
              onChange={(e) => update("secondaryValue", e.target.value)}
            />
          </section>

        </div>
      </div>
    </ToolStepShell>
  );
}
