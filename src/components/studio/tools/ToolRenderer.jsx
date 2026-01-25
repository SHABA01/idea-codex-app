export default function ToolRenderer({
  tool,
  status,
  draft,
  onUpdateDraft,
  onReadyChange
}) {
  const ToolComponent = tool.Component;

  return (
    <ToolComponent
      draft={draft}
      onDraftChange={onUpdateDraft}
      onReadyChange={onReadyChange}
    />
  );
}
