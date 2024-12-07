import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./Navbar.css"; // Adjust the path as needed

import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from "../assets/images/bg_1.jpg"; // Replace with your logo
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
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

  /// Handle logout
  const handleLogout = async () => {
    const token = localStorage.getItem("authToken"); // Get token from localStorage
    if (!token) {
      console.error("No token found for logout.");
      return;
    }
  
    try {
      // Send logout request with Authorization header
      const response = await axios.post("http://localhost:8000/api/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token with the request
        },
      });
  
      // If logout is successful
      localStorage.removeItem("authToken"); // Remove token from local storage
      localStorage.removeItem("userId"); // Remove user ID from local storage
      setIsLoggedIn(false); // Update login state
      navigate("/"); // Redirect to home page after logout
    } catch (error) {
      console.error("Logout failed", error);
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
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/pages">Pages</Link></li>
          <li><Link to={`/user/${localStorage.getItem('userId')}`}>Profile</Link></li>
       

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
