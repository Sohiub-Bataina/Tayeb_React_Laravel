import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row">
          {/* First Section */}
          <div className="col-md-4 text-center text-md-start mb-4">
            <h5 className="text-uppercase fw-bold">
              <i className="fas fa-utensils me-2"></i> Food Blog
            </h5>
            <p className="small">
              Discover the best recipes, restaurant reviews, and food tips all in one place. Share your love for food with us!
            </p>
          </div>

          {/* Second Section */}
          <div className="col-md-4 text-center mb-4">
            <h5 className="text-uppercase fw-bold">Quick Links</h5>
            <ul className="list-unstyled small">
              <li><a href="/" className="text-white text-decoration-none">Home</a></li>
              <li><a href="/create" className="text-white text-decoration-none">Create Blog</a></li>
              <li><a href="/favorites" className="text-white text-decoration-none">Favorites</a></li>
              <li><a href="/about" className="text-white text-decoration-none">About Us</a></li>
            </ul>
          </div>

          {/* Third Section */}
          <div className="col-md-4 text-center text-md-end">
            <h5 className="text-uppercase fw-bold">Follow Us</h5>
            <p className="small">Connect with us on social media:</p>
            <div>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm rounded-circle mx-1">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm rounded-circle mx-1">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm rounded-circle mx-1">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm rounded-circle mx-1">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        <hr className="my-4 text-secondary" />

        <div className="text-center small">
          © {new Date().getFullYear()} Food Blog | All Rights Reserved | Designed with ❤️ by <a href="/" className="text-white text-decoration-underline">Tayeb Group</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
