import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AuthForm.css';

const LoginForm = ({ onSwitchToSignup }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // استخدام useEffect للتحقق من حالة تسجيل الدخول
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/"); // إذا كان الرمز موجودًا، انتقل إلى الصفحة الرئيسية
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Initialize an empty errors object
    const newErrors = {};

    // Validate email
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please type a valid email address.";
    }

    // Validate password
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    // If there are any validation errors, update the errors state and stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      const { token, user } = response.data;
      const { id } = user;

      // Store token and user ID in local storage
      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", id);


      setSuccessMessage("Login successful!");
      navigate("/"); // الانتقال إلى الصفحة الرئيسية بعد تسجيل الدخول
    } catch (error) {
      setErrors({ login: "Invalid credentials!" });
    }
  };

  return (
    <div className="login form-piece">
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleLoginSubmit}>
        <h1>Sign In!</h1>
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
        {errors.login && <p className="error">{errors.login}</p>}
        <div className="CTA">
          <input type="submit" value="Login" />
          <a href="#" onClick={onSwitchToSignup} className="switch">
            I'm New
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
