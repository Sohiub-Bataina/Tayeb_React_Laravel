import React from "react";
import "./HeroSection.css"; // Adjust the path as needed

function HeroSection() {
  return (
    <main className="hero-section">
      <div className="hero-text">
        <p className="heroP">Delicious Seasonal Fruits</p>
        <h1 className="heroH">Fresh & Organic</h1>
        <div className="btn-container">
          <button className="btn1">blogs</button>
        </div>
      </div>
    </main>
  );
}

export default HeroSection;