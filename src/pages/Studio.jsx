import React, { useState } from "react";
import { useStudioProjects } from "../hooks/useStudioProjects";

import StudioLayout from "../components/studio/layout/StudioLayout";
import StudioTopbar from "../components/studio/layout/StudioTopbar";
import StudioToolLauncher from "../components/studio/layout/StudioToolLauncher";
import ToolFlyout from "../components/studio/layout/ToolFlyout";
import StudioCanvas from "../components/studio/canvas/StudioCanvas";
import ToolRenderer from "../components/studio/tools/ToolRenderer";
import AIBar from "../components/studio/assistants/AIBar";
import toolRegistry from "../components/studio/tools/toolRegistry";

export default function Studio() {
  const { project, addBlock, saveProject } = useStudioProjects();

  const [launcherOpen, setLauncherOpen] = useState(false);
  const [activeToolId, setActiveToolId] = useState(null);

  const flyoutOpen = Boolean(activeToolId);

  const activeTool = toolRegistry.find(t => t.id === activeToolId);

  return (
    <StudioLayout
      flyoutOpen={flyoutOpen}

      topbar={
        <StudioTopbar
          projectName={project.name}
          status={project.status}
          lastSaved={project.lastSaved}
          onOpenTools={() => {
            if (launcherOpen) return; // prevent double open
            setLauncherOpen(true);
          }}
        />
      }

      launcher={
        <StudioToolLauncher
          isOpen={launcherOpen}
          onClose={() => setLauncherOpen(false)}
          onSelectTool={(tool) => {
            setLauncherOpen(false);
            setActiveToolId(tool.id);
          }}
        />
      }

      canvas={<StudioCanvas blocks={project.blocks} />}

      flyout={
        activeTool && (
          <ToolFlyout
            tool={activeTool}
            onClose={() => setActiveToolId(null)}
          >
            <ToolRenderer
              activeToolId={activeToolId}
              project={project}
              userTier={project.tier}
              onInsertBlock={addBlock}
              onClose={() => setActiveToolId(null)}
            />
          </ToolFlyout>
        )
      }

      aiBar={
        <AIBar
          onInsert={(text) =>
            addBlock({
              tool: "ai",
              title: "AI Assist",
              content: text
            })
          }
        />
      }
    />
  );
}
