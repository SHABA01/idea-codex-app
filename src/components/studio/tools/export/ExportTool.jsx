import ToolStepShell from "../common/ToolStepShell";
import { exportToMarkdown } from "./exporters/exportMarkdown";
import { exportToPDF } from "./exporters/exportPDF";
import { exportToPitch } from "./exporters/exportPitch";
import { useAppAccess } from "../../../../contexts/AppAccessContext";

export default function ExportTool({ project }) {
  const { tier } = useAppAccess();

  if (!project) {
    return (
      <ToolStepShell title="Export">
        <p className="studio-muted">No active project to export.</p>
      </ToolStepShell>
    );
  }

  const canExportPDF = tier !== "demo";
  const canExportPitch = tier === "pro" || tier === "enterprise";

  return (
    <ToolStepShell title="Export Project">
      <div className="studio-tool-content">
        <p className="studio-muted">
          Export your project into shareable formats.
        </p>

        <button onClick={() => exportToMarkdown(project)}>
          Export as Markdown
        </button>

        <button
          disabled={!canExportPDF}
          onClick={() => exportToPDF(project)}
        >
          Export as PDF
        </button>

        <button
          disabled={!canExportPitch}
          onClick={() => exportToPitch(project)}
        >
          Export Pitch Deck
        </button>

        {!canExportPDF && (
          <small className="studio-muted">
            PDF export requires Live or higher.
          </small>
        )}

        {!canExportPitch && (
          <small className="studio-muted">
            Pitch export requires Pro or Enterprise.
          </small>
        )}
      </div>
    </ToolStepShell>
  );
}
