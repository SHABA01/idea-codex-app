import { useStudioAccess } from "../contexts/StudioAccessContext";

const LiveFeatureGuard = ({ children }) => {
  const { mode } = useStudioAccess();

  if (mode === "demo") {
    return (
      <div className="demo-locked">
        <p>This feature is available only in Live Mode.</p>
      </div>
    );
  }
  return children;
};

export default LiveFeatureGuard;
