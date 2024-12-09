import React, { useRef } from "react";
import "./HeroSection.css"; // Adjust the path as needed

function HeroSection() {
  const blogsSectionRef = useRef(null);

  const scrollToBlogs = () => {
    blogsSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="hero-section" style={{ marginTop: '20px' }}>
      <div className="hero-text">
        <p className="heroP">Delicious recipes. Simple cooking. Pure joy.</p>
        <h1 className="heroH">Simple cooking</h1>

        {/* الزر */}
        <div className="btn-container">
          <button
            onClick={scrollToBlogs}
            style={{
              display: "block",
              margin: "0 auto", // لجعل الزر في المنتصف
              backgroundColor: "black", // لون الخلفية أسود
              color: "white", // لون الخط أبيض
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#fbb03b",e.target.style.color = "#000")} // لون عند التمرير
            onMouseLeave={(e) => (e.target.style.backgroundColor = "black",e.target.style.color = "#fff")} // عودة اللون عند الخروج
          >
            Go to Blogs
          </button>
        </div>
      </div>

      {/* قسم البلوغز */}
      <div
        ref={blogsSectionRef}
       
      >
       
      </div>
    </main>
  );
}

export default HeroSection;
