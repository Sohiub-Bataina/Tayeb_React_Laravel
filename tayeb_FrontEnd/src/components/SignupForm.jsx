import React, { useState } from "react";
import axios from "axios";
import './AuthForm.css';

const SignupForm = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/signup", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          gender: formData.gender,
        });
  
        // Save user details in localStorage
        localStorage.setItem("userName", response.data.name); // Assuming API returns 'name'
        localStorage.setItem("userGender", response.data.gender); // Assuming API returns 'gender'
        console.log(response.data);
        setSuccessMessage("Signup successful! You can now log in.");
        
        // Clear form data
        setFormData({ name: "", email: "", password: "", confirmPassword: "", gender: "" });
        setErrors({});
      } catch (error) {
        setErrors({ api: "Signup failed! Please try again." });
      }
    }
  };
  
  return (
    <div className="signup form-piece">
      {successMessage && <p className="success">{successMessage}</p>}
      <form onChange={handleSignupSubmit}>
        <h3>Sign Up!</h3>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
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
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onKeyChange={handleInputChange}
            required
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </div>
        {errors.api && <p className="error">{errors.api}</p>}
        <div className="CTA">
          <input type="submit" value="Signup Now" />
          <a href="#" onClick={onSwitchToLogin} className="switch">
            I have an account
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
