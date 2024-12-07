import React from "react";
import "../styles/AboutUs.css"; // لاستيراد التنسيقات الخاصة

const teamMembers = [
  {
    name: "Razan",
    linkedin: "https://linkedin.com/in/member1",
    image: "https://via.placeholder.com/150", // استبدل هذه الصورة بصورة حقيقية
  },
  {
    name: "Dina",
    linkedin: "https://linkedin.com/in/member2",
    image: "https://via.placeholder.com/150", // استبدل هذه الصورة بصورة حقيقية
  },
  {
    name: "Mays",
    linkedin: "https://linkedin.com/in/member3",
    image: "https://via.placeholder.com/150", // استبدل هذه الصورة بصورة حقيقية
  },
  {
    name: "Mays",
    linkedin: "https://linkedin.com/in/member3",
    image: "https://via.placeholder.com/150", // استبدل هذه الصورة بصورة حقيقية
  },
  {
    name: "Mays",
    linkedin: "https://linkedin.com/in/member3",
    image: "https://via.placeholder.com/150", // استبدل هذه الصورة بصورة حقيقية
  },
];

const AboutUs = () => {
  return (
    <div className="about-us-container">
      {/* خلفية تغطي الشاشة مع صورة على الجنب */}
      <div className="hero-section">
      <h1 className="hero-top">About Us</h1>
        <div className="hero-content">
          <h1>Welcome to Our Platform</h1>
          <p>Discover amazing food recipes and much more!</p>
        </div>
        <div className="hero-image-container">
          <img
            src="https://img.freepik.com/free-photo/top-view-yummy-cutlets-with-onion-rings-grey-desk-dish-meat-meal-cuisine_140725-47074.jpg?ga=GA1.1.1643396337.1727782725&semt=ais_hybrid"
            alt="Delicious Food"
            className="hero-image"
          />
        </div>
      </div>

      {/* عرض أعضاء الفريق */}
      <h1 className="about-us-title">Meet Our Team</h1>
      <p className="about-us-description">
        We are passionate about delivering the best food recipes. Get to know our amazing team:
      </p>

      <div className="team-cards">
        {teamMembers.map((member, index) => (
          <div className="card" key={index}>
            <div className="card-image">
              <img
                src={member.image}
                alt={member.name}
                className="card-profile-image"
              />
            </div>
            <div className="card-content">
              <h2>{member.name}</h2>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin-btn"
              >
                View LinkedIn
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
