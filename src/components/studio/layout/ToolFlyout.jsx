import FlyoutHeader from "./FlyoutHeader";
import FlyoutBody from "./FlyoutBody";
import "../../../styles/ToolFlyout.css";

export default function ToolFlyout({
  tool,
  onClose,
  children,
  footer
}) {
  if (!tool) return null;

  return (
    <div className="tool-flyout">
      <FlyoutHeader
        icon={tool.icon}
        title={tool.name}
        runtimeStatus={tool.runtimeStatus}
        onClose={onClose}
      />

      <FlyoutBody>
        {children}
      </FlyoutBody>

      {footer}
    </div>
  );
}
