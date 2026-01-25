import { useState } from "react";
import ToolStepShell from "../common/ToolStepShell";
import { assumptionTestSchema } from "./assumptionTestSchema";

/**
 * Assumption Stress Test Tool
 *
 * Purpose:
 * Identify, classify, and stress-test key assumptions behind an idea.
 *
 * Output:
 * Structured assumption objects with risk and validation paths.
 */
export default function AssumptionTestTool({ onInsert }) {
  const [assumptions, setAssumptions] = useState([
    {
      id: crypto.randomUUID(),
      assumption: "",
      category: "market",
      riskLevel: "medium",
      validationPlan: ""
    }
  ]);

  const update = (id, field, value) => {
    setAssumptions((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, [field]: value } : a
      )
    );
  };

  const addAssumption = () => {
    setAssumptions((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        assumption: "",
        category: "market",
        riskLevel: "medium",
        validationPlan: ""
      }
    ]);
  };

  const handleInsert = () => {
    const payload = {
      schema: assumptionTestSchema.id,
      title: "Assumption Stress Test",
      summary: assumptions
        .filter(a => a.assumption.trim())
        .map(a => `${a.assumption} (${a.riskLevel} risk)`),
      data: assumptions.filter(a => a.assumption.trim())
    };

    onInsert(payload);
  };

  return (
    <ToolStepShell title="Assumption Stress Test">
      <div className="studio-tool-content">
        <p className="studio-muted">
          Identify critical assumptions that must be true for this idea to succeed,
          assess their risk, and define how you would validate them.
        </p>

        {assumptions.map((a, idx) => (
          <div key={a.id}>
            <strong>Assumption {idx + 1}</strong>

            <textarea
              placeholder="What must be true for this idea to work?"
              value={a.assumption}
              onChange={(e) =>
                update(a.id, "assumption", e.target.value)
              }
            />

            <select
              value={a.category}
              onChange={(e) =>
                update(a.id, "category", e.target.value)
              }
            >
              <option value="market">Market</option>
              <option value="user">User</option>
              <option value="technical">Technical</option>
              <option value="financial">Financial</option>
              <option value="operational">Operational</option>
            </select>

            <select
              value={a.riskLevel}
              onChange={(e) =>
                update(a.id, "riskLevel", e.target.value)
              }
            >
              <option value="low">Low risk</option>
              <option value="medium">Medium risk</option>
              <option value="high">High risk</option>
              <option value="critical">Critical risk</option>
            </select>

            <textarea
              placeholder="How would you validate or disprove this assumption?"
              value={a.validationPlan}
              onChange={(e) =>
                update(a.id, "validationPlan", e.target.value)
              }
            />

            <div className="studio-divider" />
          </div>
        ))}

        <button onClick={addAssumption}>
          + Add another assumption
        </button>
      </div>
    </ToolStepShell>
  );
}
