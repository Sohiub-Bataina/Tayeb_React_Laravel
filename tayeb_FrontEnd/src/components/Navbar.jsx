import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Adjust the path as needed

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header>
      <nav className="navbar">
        {/* Logo */}
        <div className="logo">
          <h2>Tayeb</h2>
        </div>

        {/* Hamburger menu for small screens */}
        <span className="hamburger-btn" onClick={toggleMenu}>
          ☰
        </span>

        {/* Navigation links */}
        <ul className={`links ${menuOpen ? "show" : ""}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/pages">Pages</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        {/* Login/Registration buttons */}
        <div className="action-buttons">
          <button className="btn">Login</button>
          <button className="btn">Register</button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
