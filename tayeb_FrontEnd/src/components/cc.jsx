import React, { useState } from "react";


const AuthForm = () => {
  const [formType, setFormType] = useState("login"); // 'login' or 'signup'
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});

  const toggleFormType = () => setFormType((prev) => (prev === "login" ? "signup" : "login"));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // handle login logic
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // handle signup logic
  };

  return (
    <div className="auth-container">
      <section id="formHolder">
        <div className="row">
          {/* Brand Section */}
          <div className="col-sm-6 brand">
            <a href="" className="logo">
              Tayeb
            </a>
            <div className="heading">
              <p>Your Right Choice</p>
              <h2>Tayeb</h2>
            </div>
            <div className="success-msg">
              <p>Great! You are one of our members now</p>
              <a href="#" className="profile">
                Your Profile
              </a>
            </div>
          </div>
          {formType === "login" ? (
            <div className="login form-peice">
              <form onSubmit={handleLoginSubmit}>
                <h1>Sign In!</h1>
                <div className="form-group">
                  <label htmlFor="loginemail"></label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="CTA">
                  <input type="submit" value="Login" />
                  <a href="#" onClick={toggleFormType} className="switch">
                    I'm New
                  </a>
                </div>
              </form>
            </div>
          ) : (
            <div className="signup form-peice">
              <form onSubmit={handleSignupSubmit}>
                <h3 style={{ color: 'black' }}>Sign Up!</h3>
                <div className="form-group">
                  <label htmlFor="name"></label>
                  <input
                    type="text"
                    id="name"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    placeholder="Full Name"
                  />
                  {errors.username && <span className="error">{errors.username}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="email"></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Email Address"
                  />
                  {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="gender" className={formData.gender ? "active" : ""}>
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    className={errors.gender ? "hasError" : ""}
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {errors.gender && <span className="error">{errors.gender}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="password"></label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Password"
                  />
                  {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="passwordCon"></label>
                  <input
                    type="password"
                    id="passwordCon"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    placeholder="Confirm Password"
                  />
                  {errors.confirmPassword && (
                    <span className="error">{errors.confirmPassword}</span>
                  )}
                </div>
                <div className="CTA">
                  <input type="submit" value="Signup Now" />
                  <a href="#" onClick={toggleFormType} className="switch">
                    I have an account
                  </a>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AuthForm;
