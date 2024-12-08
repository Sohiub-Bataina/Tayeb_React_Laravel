import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./Navbar.css"; // Adjust the path as needed
import '@fortawesome/fontawesome-free/css/all.min.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [favorites, setFavorites] = useState([]); // حالة لتخزين المفضلات
  const navigate = useNavigate(); // Hook for programmatic navigation

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Change token name to 'authToken'
    if (token) {
      setIsLoggedIn(true); // If token exists, user is logged in
    }
  }, []);

  // Handle login (for storing token and user ID)
  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("http://localhost/api/login", { email, password });
      const { token, user } = response.data; // Extract token and user from response
      const { id } = user; // Extract id from user object

      // Store token and user ID in local storage
      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", id);

      setIsLoggedIn(true); // Update login state
      navigate("/"); // Redirect to home page after login
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("authToken"); // الحصول على التوكن
    if (!token) {
      console.error("No token found for logout.");
      navigate("/login"); // إعادة التوجيه إلى صفحة تسجيل الدخول إذا لم يكن هناك توكن
      return;
    }
  
    try {
      // إرسال طلب للخروج إذا كان لديك API خاص بالخروج
      await axios.post("http://localhost:8000/api/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`, // إرسال التوكن مع الطلب
        },
      });
    } catch (error) {
      console.error("Logout failed on server:", error);
    } finally {
      // في كل الحالات، قم بحذف التوكن وإعادة التوجيه
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      setIsLoggedIn(false);
      navigate("/login"); // إعادة التوجيه إلى صفحة تسجيل الدخول
    }
  };

  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <i className="fas fa-utensils me-2"></i>
          <h2>Tayeb</h2>
        </div>

          {/* Navigation links in the middle */}
          <span className="hamburger-btn" onClick={toggleMenu}>
            ☰
          </span>
          <ul className={`links ${menuOpen ? "show" : ""}`}>
          <li className="nav-item"><Link to="/">Home</Link></li>
          <li className="nav-item"><Link to="/about">About</Link></li>
          <li className="nav-item">
            <Link to="/favorites" state={{ favorites }}>
              Favorites
            </Link>
          </li>
          <li className="nav-item"><Link to={`/user/${localStorage.getItem('userId')}`}>Profile</Link></li>
       

          {/* Conditionally render login/logout buttons */}
          {isLoggedIn ? (
            <li className="nav-item">
              <button className="btn" onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
