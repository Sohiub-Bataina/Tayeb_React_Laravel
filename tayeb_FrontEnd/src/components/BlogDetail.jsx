import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BlogDetails.css';

const BlogDetail = () => {
  const [blog, setBlog] = useState([]);
  const params = useParams();

  const fetchBlog = async () => {
    const res = await fetch(`http://localhost:8000/api/blogs/${params.id}`);
    const result = await res.json();
    setBlog(result.data);
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div>
      {/* Breadcrumb Section */}
      <div className="breadcrumb-section breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <p>Read the Details</p>
                <h1>Single Article</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Single Article Section */}
      <div className="single-article-section">
        {/* النصوص */}
        <div className="single-article-text">
          <div className="blog-meta">
            <span>
              <i className="fas fa-user"></i> {blog.author}
            </span>
            <br />
            <span>
              <i className="fas fa-calendar"></i> {blog.date}
            </span>
          </div>
          <h2>{blog.title}</h2>
          <div
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />
        </div>

        {/* الصورة */}
        {blog.image && (
          <img
            className="article-image"
            src={`http://localhost:8000/uploads/blogs/${blog.image}`}
            alt="blog"
          />
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
