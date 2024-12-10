import  { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import './AuthForm';

const LoginForm = ({ onSwitchToSignup }) => {
  const { setIsLoggedIn } = useContext(AuthContext); // استخدم السياق لتحديث حالة تسجيل الدخول
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/"); // إذا كان الرمز موجودًا، انتقل إلى الصفحة الرئيسية
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value); // التحقق من الأخطاء أثناء الكتابة
  };

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };

    if (fieldName === "email") {
      if (!value) {
        newErrors.email = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = "Please type a valid email address.";
      } else {
        delete newErrors.email;
      }
    }

    if (fieldName === "password") {
      if (!value) {
        newErrors.password = "Password is required.";
      } else if (value.length < 8) {
        newErrors.password = "Password must be at least 8 characters.";
      } else {
        delete newErrors.password;
      }
    }

    setErrors(newErrors);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
      });

      const { token, user } = response.data;
      const { id } = user;
localStorage.setItem("authToken", token);
      localStorage.setItem("userId", id);

     

    // تخزين البيانات في localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("ID", user.id);

    localStorage.setItem("userName", user.name);
    localStorage.setItem("userGender", user.gender);

      setSuccessMessage("Login successful!");
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      setErrors({ login: "Invalid credentials!" });
    }
  };

  return (
    <div className="login form-piece">
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleLoginSubmit}>
      <h1 style={{ color: 'black' }}>Sign In!</h1>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            required
            className={errors.email ? "hasError" : ""}
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
            className={errors.password ? "hasError" : ""}
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