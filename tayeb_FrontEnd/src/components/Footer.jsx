// import React from 'react';

// function Footer() {
//   return (
//     <footer className="bg-dark text-white pt-5 pb-3">
//       <div className="container">
//         <div className="row">
//           {/* First Section */}
//           <div className="col-md-4 text-center text-md-start mb-4">
//             <h5 className="text-uppercase fw-bold">
//               <i className="fas fa-utensils me-2"></i> Food Blog
//             </h5>
//             <p className="small">
//               Discover the best recipes, restaurant reviews, and food tips all in one place. Share your love for food with us!
//             </p>
//           </div>

//           {/* Second Section */}
//           <div className="col-md-4 text-center mb-4">
//             <h5 className="text-uppercase fw-bold">Quick Links</h5>
//             <ul className="list-unstyled small">
//               <li><a href="/" className="text-white text-decoration-none">Home</a></li>
//               <li><a href="/create" className="text-white text-decoration-none">Create Blog</a></li>
//               <li><a href="/favorites" className="text-white text-decoration-none">Favorites</a></li>
//               <li><a href="/about" className="text-white text-decoration-none">About Us</a></li>
//             </ul>
//           </div>

//           {/* Third Section */}
//           <div className="col-md-4 text-center text-md-end">
//             <h5 className="text-uppercase fw-bold">Follow Us</h5>
//             <p className="small">Connect with us on social media:</p>
//             <div>
//               <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm rounded-circle mx-1">
//                 <i className="fab fa-facebook-f"></i>
//               </a>
//               <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm rounded-circle mx-1">
//                 <i className="fab fa-instagram"></i>
//               </a>
//               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm rounded-circle mx-1">
//                 <i className="fab fa-twitter"></i>
//               </a>
//               <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm rounded-circle mx-1">
//                 <i className="fab fa-youtube"></i>
//               </a>
//             </div>
//           </div>
//         </div>

//         <hr className="my-4 text-secondary" />

//         <div className="text-center small">
//           © {new Date().getFullYear()} Food Blog | All Rights Reserved | Designed with ❤️ by <a href="/" className="text-white text-decoration-underline">Tayeb Group</a>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;


// -----------------------------------
// Mays 

import React from 'react';
import './Footer.css';  // تأكد من مسار الملف بشكل صحيح
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <>
      {/* Footer Area */}
      <div className="footer-area">
  <div className="container">
    <div className="row">
      {/* About Us Section */}
      <div className="col-lg-4 col-md-6 mb-4">
        <div className="footer-box about-widget">
          <h2 className="widget-title">About Us</h2>
          <p>We share delicious recipes, cooking tips, and food reviews to inspire your culinary journey. Join us for the best food content!</p>
        </div>
      </div>

      {/* Get in Touch Section */}
      <div className="col-lg-4 col-md-6 mb-4">
        <div className="footer-box get-in-touch">
          <h2 className="widget-title">Get in Touch</h2>
          <ul>
            <li>123 Food St., Amman City</li>
            <li>Tayeb@foodblog.com</li>
            <li>+00 123 456 7890</li>
          </ul>
        </div>
      </div>

      {/* Pages Section */}
      <div className="col-lg-4 col-md-6 mb-4">
        <div className="footer-box pages">
          <h2 className="widget-title">Quick Links</h2>
          <ul>
  <li><Link to="/">Home</Link></li>
  <li><Link to="/about">About Us</Link></li>
  <li><Link to="/create">Create Blog</Link></li>
  <li><Link to="/favorites">Favorites</Link></li>
</ul>
        </div>
      </div>

      {/* Subscribe Section */}
    </div>
  </div> 
</div>

      {/* End Footer Area */}

      {/* Copyright Section */}
      <div className="copyright">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <p>&copy; {new Date().getFullYear()} Food Blog | All Rights Reserved.</p>
            </div>
            <div className="col-lg-6 text-right col-md-12">
              <div className="social-icons">
                <ul>
                  <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                  <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                  <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                  <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a></li>
                  <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Copyright Section */}
    </>
  );
}

export default Footer;