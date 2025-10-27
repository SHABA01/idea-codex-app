import { useLocation } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import NeuralNetworkBackground from "../components/NeuralNetworkBackground";
import "../styles/AuthPage.css";

const AuthPage = () => {
  const location = useLocation();
  const mode = new URLSearchParams(location.search).get("mode") || "signup";

  return (
    <div className="auth-page">
      <div className="auth-left">
        <NeuralNetworkBackground withSpiral={true} nodeCount={40} />
      </div>
      <div className="auth-right">
        <AuthForm mode={mode} />
      </div>
    </div>
  );
};

export default AuthPage;
