import React from "react";
import "./Navbar.css"; // Adjust the path as needed

function HeroSection() {
  return (
    <main className="hero-section">
      <p className="heroP">Delicious Seasonal Fruits</p>
      <h1 className="heroH">Fresh & Organic</h1>
      <div className="btn-container">
        <button className="btn">Fruit Collection</button>
        <button className="btn">Contact Us</button>

        
      </div>
    </main>
  );
}

export default HeroSection;
