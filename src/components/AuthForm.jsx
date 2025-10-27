import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import NeuralNetworkBackground from "./NeuralNetworkBackground";
import "../styles/AuthForm.css";
import logo from "../assets/IdeaCodex_icon_yellow.png";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const toggleMode = () => setIsSignUp(!isSignUp);

  return (
    <div className="auth-form">
      <NeuralNetworkBackground withSpiral={false} nodeCount={20} />

      <div className="auth-form-inner">
        <div className="auth-logo">
          <img src={logo} alt="IdeaCodex logo" />
        </div>

        <p className="auth-subtitle">Begin your journey from idea to product.</p>

        <ProgressBar progress={isSignUp ? 33 : 66} step={isSignUp ? 1 : 2} />

        <h2 className="auth-title">
          {isSignUp ? "Create your account" : "Welcome back"}
        </h2>

        <form>
          {isSignUp && (
            <input type="text" placeholder="Name" className="auth-input" />
          )}
          <input type="email" placeholder="Email" className="auth-input" />
          <input type="password" placeholder="Password" className="auth-input" />

          <button type="submit" className="auth-btn">
            {isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>



        {/*<button className="google-btn">
          <span>Continue with Google</span>
        </button>*/}
        <button className="google-btn">
            <span><i className="fa-brands fa-google"></i> Continue with Google</span>
        </button>





        <p className="auth-toggle">
          {isSignUp ? "Already have an account? " : "Don’t have an account? "}
          <button type="button" onClick={toggleMode} className="toggle-link">
            {isSignUp ? "Log In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
