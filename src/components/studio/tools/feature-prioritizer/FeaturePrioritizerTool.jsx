import { useState } from "react";
import ToolStepShell from "../common/ToolStepShell";
import ToolFooter from "../common/ToolFooter";
import { featurePrioritizerSchema } from "./featurePrioritizerSchema";

export default function FeaturePrioritizerTool({ onInsert }) {
  const [features, setFeatures] = useState([
    {
      name: "",
      description: "",
      reach: 5,
      impact: 5,
      confidence: 5,
      effort: 5
    }
  ]);

  const updateFeature = (index, field, value) => {
    const next = [...features];
    next[index][field] = value;
    setFeatures(next);
  };

  const addFeature = () => {
    setFeatures([
      ...features,
      {
        name: "",
        description: "",
        reach: 5,
        impact: 5,
        confidence: 5,
        effort: 5
      }
    ]);
  };

  const computeScore = (f) =>
    ((f.reach * f.impact * f.confidence) / Math.max(f.effort, 1)).toFixed(2);

  const handleInsert = () => {
    const scored = features
      .map((f) => ({
        ...f,
        score: Number(computeScore(f))
      }))
      .sort((a, b) => b.score - a.score);

    onInsert({
      tool: featurePrioritizerSchema.id,
      title: featurePrioritizerSchema.title,
      content: {
        method: "RICE-lite",
        prioritizedFeatures: scored
      }
    });
  };

  return (
    <ToolStepShell title="Feature Prioritizer">
      <div className="studio-tool-content">
        <p className="studio-muted">
          Score and rank features to determine what should be built first.
        </p>

        {features.map((f, idx) => (
          <div key={idx} className="studio-divider">
            <input
              placeholder="Feature name"
              value={f.name}
              onChange={(e) =>
                updateFeature(idx, "name", e.target.value)
              }
            />

            <textarea
              placeholder="Feature description"
              value={f.description}
              onChange={(e) =>
                updateFeature(idx, "description", e.target.value)
              }
            />

            <label>
              Reach
              <input
                type="number"
                min={1}
                max={10}
                value={f.reach}
                onChange={(e) =>
                  updateFeature(idx, "reach", Number(e.target.value))
                }
              />
            </label>

            <label>
              Impact
              <input
                type="number"
                min={1}
                max={10}
                value={f.impact}
                onChange={(e) =>
                  updateFeature(idx, "impact", Number(e.target.value))
                }
              />
            </label>

            <label>
              Confidence
              <input
                type="number"
                min={1}
                max={10}
                value={f.confidence}
                onChange={(e) =>
                  updateFeature(idx, "confidence", Number(e.target.value))
                }
              />
            </label>

            <label>
              Effort
              <input
                type="number"
                min={1}
                max={10}
                value={f.effort}
                onChange={(e) =>
                  updateFeature(idx, "effort", Number(e.target.value))
                }
              />
            </label>

            <strong>
              Score: {computeScore(f)}
            </strong>
          </div>
        ))}

        <button onClick={addFeature}>+ Add Feature</button>
      </div>

      <ToolFooter
        primaryAction={{
          label: "Insert Prioritized Features",
          onClick: handleInsert
        }}
      />
    </ToolStepShell>
  );
}
