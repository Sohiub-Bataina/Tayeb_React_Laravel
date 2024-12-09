import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import HeroLogin from "./HeroLogin";

const AuthForm = () => {
  const [formType, setFormType] = useState("login");

  const toggleFormType = () => {
    setFormType((prevFormType) => (prevFormType === "login" ? "signup" : "login"));
  };

  return (


    <div className="">
                  <HeroLogin />

      <section id="formHolder">
        <div className="row align-items-center">
         

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
