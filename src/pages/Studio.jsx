import React from "react";
import { useStudioProjects } from "../hooks/useStudioProjects";
import { useStudioTool } from "../hooks/useStudioTool";

import StudioLayout from "../components/studio/layout/StudioLayout";
import StudioTopbar from "../components/studio/layout/StudioTopbar";
import StudioToolLauncher from "../components/studio/layout/StudioToolLauncher";
import ToolFlyout from "../components/studio/layout/ToolFlyout";
import FlyoutFooter from "../components/studio/layout/FlyoutFooter";
import StudioCanvas from "../components/studio/canvas/StudioCanvas";
import ToolRenderer from "../components/studio/tools/ToolRenderer";
import AIBar from "../components/studio/assistants/AIBar";
import toolRegistry from "../components/studio/tools/toolRegistry";

export default function Studio() {
  const { project, addBlock } = useStudioProjects();

  const tool = useStudioTool({
    toolRegistry,
    onInsertBlock: addBlock
  });

  return (
    <StudioLayout
      flyoutOpen={!!tool.activeTool}
      topbar={
        <StudioTopbar
          projectName={project.name}
          onOpenTools={tool.openLauncher}
        />
      }
      launcher={
        <StudioToolLauncher
          isOpen={tool.isLauncherOpen}
          onClose={tool.closeLauncher}
          onSelectTool={tool.openTool}
        />
      }
      canvas={<StudioCanvas blocks={project.blocks} />}
      flyout={
        tool.activeTool && (
          <ToolFlyout
            tool={tool.activeTool}
            onClose={tool.closeTool}
            footer={
              <FlyoutFooter
               status={tool.status}
                onInsert={tool.insert}
              />
            }
          >
            <ToolRenderer
              tool={tool.activeTool}
              status={tool.status}
              draft={tool.draft}
              onUpdateDraft={tool.updateDraft}
              onReadyChange={tool.setReady}
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
