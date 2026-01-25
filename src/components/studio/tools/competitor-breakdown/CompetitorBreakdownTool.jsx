import { useState } from "react";
import ToolStepShell from "../common/ToolStepShell";
import { competitorBreakdownSchema } from "./competitorBreakdownSchema";

/**
 * Competitor Breakdown Tool
 *
 * Purpose:
 * Systematically analyze direct and indirect competitors
 * across positioning, strengths, weaknesses, and differentiation.
 */
export default function CompetitorBreakdownTool({ onInsert }) {
  const [competitors, setCompetitors] = useState([
    {
      id: crypto.randomUUID(),
      name: "",
      type: "direct",
      targetSegment: "",
      strengths: "",
      weaknesses: "",
      differentiation: ""
    }
  ]);

  const update = (id, field, value) => {
    setCompetitors((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      )
    );
  };

  const addCompetitor = () => {
    setCompetitors((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: "",
        type: "direct",
        targetSegment: "",
        strengths: "",
        weaknesses: "",
        differentiation: ""
      }
    ]);
  };

  const handleInsert = () => {
    const valid = competitors.filter(c => c.name.trim());

    const payload = {
      schema: competitorBreakdownSchema.id,
      title: "Competitor Breakdown",
      summary: valid.map(
        c => `${c.name} (${c.type})`
      ),
      data: valid
    };

    onInsert(payload);
  };

  return (
    <ToolStepShell title="Competitor Breakdown">
      <div className="studio-tool-content">
        <p className="studio-muted">
          Identify key competitors and analyze how they position themselves,
          where they are strong or weak, and how your idea can differentiate.
        </p>

        {competitors.map((c, idx) => (
          <div key={c.id}>
            <strong>Competitor {idx + 1}</strong>

            <input
              type="text"
              placeholder="Competitor name"
              value={c.name}
              onChange={(e) =>
                update(c.id, "name", e.target.value)
              }
            />

            <select
              value={c.type}
              onChange={(e) =>
                update(c.id, "type", e.target.value)
              }
            >
              <option value="direct">Direct competitor</option>
              <option value="indirect">Indirect competitor</option>
              <option value="alternative">Alternative solution</option>
            </select>

            <input
              type="text"
              placeholder="Target customer segment"
              value={c.targetSegment}
              onChange={(e) =>
                update(c.id, "targetSegment", e.target.value)
              }
            />

            <textarea
              placeholder="Key strengths (what they do well)"
              value={c.strengths}
              onChange={(e) =>
                update(c.id, "strengths", e.target.value)
              }
            />

            <textarea
              placeholder="Key weaknesses (gaps, complaints, limitations)"
              value={c.weaknesses}
              onChange={(e) =>
                update(c.id, "weaknesses", e.target.value)
              }
            />

            <textarea
              placeholder="Where can your idea differentiate?"
              value={c.differentiation}
              onChange={(e) =>
                update(c.id, "differentiation", e.target.value)
              }
            />

            <div className="studio-divider" />
          </div>
        ))}

        <button onClick={addCompetitor}>
          + Add another competitor
        </button>
      </div>
    </ToolStepShell>
  );
}
