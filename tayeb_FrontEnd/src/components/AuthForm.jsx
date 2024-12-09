import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthForm = () => {
  const [formType, setFormType] = useState("login");

  const toggleFormType = () => {
    setFormType((prevFormType) => (prevFormType === "login" ? "signup" : "login"));
  };

  return (
    <div className="auth-container">
      <section id="formHolder">
        <div className="row align-items-center">
          {/* Brand Section */}
          <div className="col-md-6 brand text-center">
          
            <div className="heading">
              <h2>Tayeb</h2>
              <p>Your Right Choice</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="col-md-6 form">
            {formType === "login" ? (
              <LoginForm onSwitchToSignup={toggleFormType} />
            ) : (
              <SignupForm onSwitchToLogin={toggleFormType} />
            )}
            <div className="text-center mt-3">
              <button 
                className="btn btn-link" 
                onClick={toggleFormType}
                style={{ textDecoration: "none" }}
              >
               
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthForm;
