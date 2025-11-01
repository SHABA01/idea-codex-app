import { useParams } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import NeuralNetworkBackground from "../components/NeuralNetworkBackground";
import "../styles/AuthPage.css";

const AuthPage = () => {
  const { mode } = useParams();
  const isMobile = window.innerWidth < 768;

  return (
    <div className="auth-page">
      {/* Only render left background if not on mobile */}
      {!isMobile && (
        <div className="auth-left">
          <NeuralNetworkBackground withSpiral={true} nodeCount={40} />
        </div>
      )}

      <div className="auth-right">
        <AuthForm mode={mode || "signup"} />
      </div>
    </div>
  );
};

export default AuthPage;
