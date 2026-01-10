import { useState } from "react";
import ToolStepShell from "../common/ToolStepShell";
import ToolFooter from "../common/ToolFooter";
import { ideaBuilderSchema } from "./ideaBuilderSchema";

export default function IdeaBuilderTool({ onInsert }) {
  const [data, setData] = useState({
    ideaName: "",
    oneLiner: "",
    problemDescription: "",
    whoItAffects: "",
    currentAlternatives: "",
    solutionDescription: "",
    keyDifferentiator: "",
    primaryValue: "",
    secondaryValue: ""
  });

  const update = (field, value) => {
    setData((d) => ({ ...d, [field]: value }));
  };

  const handleInsert = () => {
    onInsert({
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
  };

  return (
    <ToolStepShell title="Idea Builder">
      <div className="studio-tool-content">
        <h3>Core Idea</h3>
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

        <h3>Problem</h3>
        <textarea
          placeholder="What problem are you solving?"
          value={data.problemDescription}
          onChange={(e) =>
            update("problemDescription", e.target.value)
          }
        />

        <input
          placeholder="Who experiences this problem?"
          value={data.whoItAffects}
          onChange={(e) =>
            update("whoItAffects", e.target.value)
          }
        />

        <input
          placeholder="How do people solve this today?"
          value={data.currentAlternatives}
          onChange={(e) =>
            update("currentAlternatives", e.target.value)
          }
        />

        <h3>Solution</h3>
        <textarea
          placeholder="Describe your solution"
          value={data.solutionDescription}
          onChange={(e) =>
            update("solutionDescription", e.target.value)
          }
        />

        <input
          placeholder="Key differentiator"
          value={data.keyDifferentiator}
          onChange={(e) =>
            update("keyDifferentiator", e.target.value)
          }
        />

        <h3>Value</h3>
        <input
          placeholder="Primary value delivered"
          value={data.primaryValue}
          onChange={(e) =>
            update("primaryValue", e.target.value)
          }
        />

        <input
          placeholder="Secondary value (optional)"
          value={data.secondaryValue}
          onChange={(e) =>
            update("secondaryValue", e.target.value)
          }
        />
      </div>

      <ToolFooter
        primaryAction={{
          label: "Insert Idea Definition",
          onClick: handleInsert
        }}
      />
    </ToolStepShell>
  );
}
