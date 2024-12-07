import React from 'react';
import FeatureSection from './FeatureSection'; // افترض أن هذه المكونات موجودة في نفس الفولدر
import './about.css'; // استيراد ملف الـ CSS
import BreadcrumbSection from './BreadcrumbSection'; // تأكد من المسار الصحيح للمكون

const About = () => {
  return (
    <div>
      <BreadcrumbSection /> 
      <FeatureSection />
      
    </div>
  );
};

export default About;