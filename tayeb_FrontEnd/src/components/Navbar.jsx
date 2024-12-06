import React, { useState } from "react";
import "./Navbar.css"; // Adjust the path as needed
import logo from "../assets/images/bg_1.jpg"; // Replace with your logo

import { Link } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <header>
        <nav className="navbar">
          {/* Logo on the top left */}
          <a href="#" className="logo">
            <img src={logo} alt="logo" />
            <h2>Tayeb</h2>
          </a>

          {/* Navigation links in the middle */}
          <span className="hamburger-btn" onClick={toggleMenu}>
            ☰
          </span>
          <ul className={`links ${menuOpen ? "show" : ""}`}>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Pages</a></li>
            <li><a href="#">Contact</a></li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          </ul>

          {/* Login/Registration buttons on the right */}
          <div className="action-buttons">
            <button className="btn">Login</button>
            <button className="btn">Register</button>
          </div>
        </nav>
      </header>
     
    </>
  );
}

export default Navbar;
