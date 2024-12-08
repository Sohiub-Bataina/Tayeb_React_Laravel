import React from 'react';
import './about.css'; // استيراد ملف الـ CSS

const BreadcrumbSection = () => {
  return (
    <div className="breadcrumb-section breadcrumb-bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 text-center">
            <div className="breadcrumb-text">
            <p>Delicious recipes and food insights</p>
            <h1>About Us</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BreadcrumbSection;