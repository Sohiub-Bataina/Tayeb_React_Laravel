import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // تأكد من إضافة هذه المكتبة في مشروعك

const FeaturedSection = () => {
  return (
    <div>
      {/* Featured Section */}
      <div className="feature-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
            <div className="featured-text">
            <h2 className="pb-3" style={{ textAlign: 'center' }}>
  Why <span className="orange-text">Tayeb</span>
</h2>

  <div className="row">
    <div className="col-lg-6 col-md-6 mb-4 mb-md-5">
      <div className="list-box d-flex">
        <div className="list-icon">
          <i className="fas fa-heart"></i>
        </div>
        <div className="content">
          <h3>Save Your Favorite Recipes</h3>
          <p>
            Add your favorite recipes to your personal list of favorites so you can easily find them later.
          </p>
        </div>
      </div>
    </div>

    <div className="col-lg-6 col-md-6 mb-5 mb-md-5">
      <div className="list-box d-flex">
        <div className="list-icon">
          <i className="fas fa-edit"></i>
        </div>
        <div className="content">
          <h3>Create Your Own Blog</h3>
          <p>
            Write and share your own cooking blogs, and enhance them with images to showcase your dishes.
          </p>
        </div>
      </div>
    </div>

    <div className="col-lg-6 col-md-6 mb-5 mb-md-5">
      <div className="list-box d-flex">
        <div className="list-icon">
          <i className="fas fa-image"></i>
        </div>
        <div className="content">
          <h3>Share Beautiful Food Images</h3>
          <p>
            Upload stunning images of your dishes along with your blogs to inspire and share with others.
          </p>
        </div>
      </div>
    </div>

    <div className="col-lg-6 col-md-6">
      <div className="list-box d-flex">
        <div className="list-icon">
          <i className="fas fa-bookmark"></i>
        </div>
        <div className="content">
          <h3>Bookmark Your Favorite Blogs</h3>
          <p>
            Save and easily access your favorite cooking blogs for future reference and inspiration.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Team Section */}
      <div >
      <div className="container">
  <div className="row">
    <div className="col-lg-8 offset-lg-2 text-center">
      <div className="section-title mt-4"> {/* أضفنا الكلاس mt-4 */}
        <h3>
          Our <span className="orange-text">Team</span>
        </h3>
      </div>
    </div> 
  </div>



    <div className="row">
      <div className="col-lg-4 col-md-6">
        <div className="single-team-item">
          <div className="team-bg team-bg-1"></div>
          <img src="/images/Mays Al-khalil2.jpg" alt="Mays Alkhalil" className="team-img" />
          <h4>Mays Alkhalil</h4>
          <ul className="social-link-team">
            <li><a href="https://github.com/your-username" target="_blank"><i className="fab fa-github"></i></a></li>
            <li><a href="mailto:your-email@example.com" target="_blank"><i className="fas fa-envelope"></i></a></li>
            <li><a href="https://www.linkedin.com/in/your-username" target="_blank"><i className="fab fa-linkedin-in"></i></a></li>
          </ul>
        </div>
      </div>

      <div className="col-lg-4 col-md-6">
        <div className="single-team-item">
          <div className="team-bg team-bg-2"></div>
          <img src="/images/Mays Al-khalil2.jpg" alt="Mays Alkhalil" className="team-img" />
          <h4>Razan Alhroub</h4>
          <ul className="social-link-team">
            <li><a href="https://github.com/your-username" target="_blank"><i className="fab fa-github"></i></a></li>
            <li><a href="mailto:your-email@example.com" target="_blank"><i className="fas fa-envelope"></i></a></li>
            <li><a href="https://www.linkedin.com/in/your-username" target="_blank"><i className="fab fa-linkedin-in"></i></a></li>
          </ul>
        </div>
      </div>

      <div className="col-lg-4 col-md-6">
        <div className="single-team-item">
          <div className="team-bg team-bg-3"></div>
          <img src="/images/Mays Al-khalil2.jpg" alt="Mays Alkhalil" className="team-img" />
          <h4>Dina Nafez</h4>
          <ul className="social-link-team">
            <li><a href="https://github.com/your-username" target="_blank"><i className="fab fa-github"></i></a></li>
            <li><a href="mailto:your-email@example.com" target="_blank"><i className="fas fa-envelope"></i></a></li>
            <li><a href="https://www.linkedin.com/in/your-username" target="_blank"><i className="fab fa-linkedin-in"></i></a></li>
          </ul>
        </div>
      </div>
    </div>

    {/* الصف الثاني - 2 صور وتوسيطهما */}
    <div className="row justify-content-center">
      <div className="col-lg-4 col-md-6">
        <div className="single-team-item">
          <div className="team-bg team-bg-3"></div>
          <img src="/images/Mays Al-khalil2.jpg" alt="Mays Alkhalil" className="team-img" />
          <h4>Ahmad Azzam</h4>
          <ul className="social-link-team">
            <li><a href="https://github.com/your-username" target="_blank"><i className="fab fa-github"></i></a></li>
            <li><a href="mailto:your-email@example.com" target="_blank"><i className="fas fa-envelope"></i></a></li>
            <li><a href="https://www.linkedin.com/in/your-username" target="_blank"><i className="fab fa-linkedin-in"></i></a></li>
          </ul>
        </div>
      </div>

      <div className="col-lg-4 col-md-6">
        <div className="single-team-item">
          <div className="team-bg team-bg-3"></div>
          <img src="/images/Mays Al-khalil2.jpg" alt="Mays Alkhalil" className="team-img" />
          <h4>Sohiub Batainah</h4>
          <ul className="social-link-team">
            <li><a href="https://github.com/your-username" target="_blank"><i className="fab fa-github"></i></a></li>
            <li><a href="mailto:your-email@example.com" target="_blank"><i className="fas fa-envelope"></i></a></li>
            <li><a href="https://www.linkedin.com/in/your-username" target="_blank"><i className="fab fa-linkedin-in"></i></a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default FeaturedSection;