import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BlogDetails.css';  // تأكد من مسار الملف بشكل صحيح
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

  // Inline Styles
  const breadcrumbSectionStyle = {
    backgroundColor: '#f4f4f4',
    padding: '40px 0',
    textAlign: 'center',
  };

  const breadcrumbTextStyle = {
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
  };

  const articleSectionStyle = {
    marginTop: '40px',
    marginBottom: '80px',
    padding: '20px',
  };

  const articleContainerStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '20px',
  };

  const textContainerStyle = {
    flex: '1',
    lineHeight: '1.8',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const metaStyle = {
    fontSize: '14px',
    color: '#666',
    marginBottom: '15px',
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#222',
    marginBottom: '20px',
  };

  const imageStyle = {
    width: '400px',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

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
      <div style={articleSectionStyle}>
        <div style={articleContainerStyle}>
          {/* النصوص على اليسار */}
          <div style={textContainerStyle}>
            <div style={metaStyle}>
              <span>
                <i className="fas fa-user"></i> {blog.author}
              </span>
              <br />
              <span>
                <i className="fas fa-calendar"></i> {blog.date}
              </span>
            </div>
            <h2 style={titleStyle}>{blog.title}</h2>
            <div
              style={{
                wordWrap: 'break-word',
                whiteSpace: 'normal',
                overflowWrap: 'break-word',
                padding: '10px',
                // backgroundColor: '#fafafa',
                borderRadius: '5px',
                color: '#000', // لون النص الأسود
              }}
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />
          </div>

          {/* الصورة على اليمين */}
          {blog.image && (
            <img
              style={imageStyle}
              src={`http://localhost:8000/uploads/blogs/${blog.image}`}
              alt="blog"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
