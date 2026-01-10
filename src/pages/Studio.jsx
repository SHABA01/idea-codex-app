import React, { useState } from "react";

import { useStudioProjects } from "../hooks/useStudioProjects";

import StudioLayout from "../components/studio/layout/StudioLayout";
import StudioToolLauncher from "../components/studio/layout/StudioToolLauncher";
import StudioTopbar from "../components/studio/layout/StudioTopbar";
import ToolFlyout from "../components/studio/layout/ToolFlyout";

import StudioCanvas from "../components/studio/canvas/StudioCanvas";

import ToolRenderer from "../components/studio/tools/ToolRenderer";
import AIBar from "../components/studio/assistants/AIBar";

/**
 * Studio
 *
 * High-level composition root for IdeaCodex Studio.
 * Owns ONLY:
 * - active tool selection
 * - project lifecycle wiring
 *
 * All orchestration is delegated.
 */
export default function Studio() {
  const { project, addBlock, saveProject } = useStudioProjects();

  const [activeToolId, setActiveToolId] = useState(null);

  const closeTool = () => setActiveToolId(null);

  return (
    <StudioLayout
      topbar={
        <StudioTopbar
          project={project}
          onSave={saveProject}
        />
      }
      launcher={
        <StudioToolLauncher
          activeToolId={activeToolId}
          onLaunch={(toolId) => setActiveToolId(toolId)}
        />
      }
      canvas={
        <StudioCanvas blocks={project.blocks} />
      }
      flyout={
        activeToolId && (
          <ToolFlyout onClose={closeTool}>
            <ToolRenderer
              activeToolId={activeToolId}
              project={project}
              userTier={project.tier}
              onInsertBlock={addBlock}
              onClose={closeTool}
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
