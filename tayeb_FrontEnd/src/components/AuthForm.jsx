import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthForm = () => {
  const [formType, setFormType] = useState("login");

  const toggleFormType = () => {
    setFormType((prev) => (prev === "login" ? "signup" : "login"));
  };

  return (
    <div className="container">
      <section id="formHolder">
        <div className="row">
          <div className="col-sm-6 brand">
            <a href="https://icom-digital.com/" className="logo">
              ICOM
            </a>
            <div className="heading">
              <h2>Brand</h2>
              <p>Your Right Choice</p>
            </div>
          </div>
        
          <div className="col-sm-6 form">
            {formType === "login" ? (
              <LoginForm onSwitchToSignup={toggleFormType} />
            ) : (
              <SignupForm onSwitchToLogin={toggleFormType} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthForm;
