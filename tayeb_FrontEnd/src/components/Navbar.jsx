import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <i className="fas fa-utensils me-2"></i>
          <h2>Tayeb</h2>
        </div>

        <span className="hamburger-btn" onClick={toggleMenu}>
          ☰
        </span>

        <ul className={`links ${menuOpen ? "show" : ""}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/pages">Pages</Link></li>
          <li><Link to={`/user/${localStorage.getItem('userId')}`}>Profile</Link></li>
        </ul>

        <div className="action-buttons">
          <button className="btn">Login</button>
          <button className="btn">Register</button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
