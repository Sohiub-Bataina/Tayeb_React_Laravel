import React, { useState } from 'react';
import './Profile.css'; // Import custom styles

const Profile = () => {
  // Define the user information state
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    gender: "Male",
    profilePicture: "https://www.w3schools.com/w3images/avatar2.png", // Example profile picture URL
  });

  // Handle input change for editable fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle save action
  const handleSave = () => {
    alert('Profile information updated successfully!');
    // You can add an API call here to save the changes on the backend
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-picture">
            <img
              src={user.profilePicture || 'https://www.w3schools.com/w3images/avatar2.png'}
              alt="Profile"
            />
          </div>
          <h1 className="profile-name">
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              className="profile-editable"
            />
          </h1>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <h3>Email</h3>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className="profile-editable"
            />
          </div>

          <div className="detail-item">
            <h3>Gender</h3>
            <select
              name="gender"
              value={user.gender}
              onChange={handleInputChange}
              className="profile-editable"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="profile-footer">
          <button onClick={handleSave} className="save-button">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
