import React from "react";
import "./HeroSection.css"; // Adjust the path as needed

function HeroSection() {
  return (
    <main 
      className="hero-section" 
      style={{
      
     
      }}
    >
      <div className="hero-text" style={{ textAlign: 'center' }}>
        <p className="heroP" style={{  }}>Delicious recipes. Simple cooking. Pure joy.</p>
        <h1 className="heroH" style={{   }}>My Favorites</h1>
        <div className="btn-container">
          {/* هنا يمكنك إضافة الأزرار إذا أردت */}
        </div>
      </div>
    </main>
  );
}

export default HeroSection;
