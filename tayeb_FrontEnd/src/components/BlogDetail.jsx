// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';

// const BlogDetail = () => {
//     const [blog, setBlog] = useState([]);
//     const [liked, setLiked] = useState(false); // حالة لتحديد إذا تم النقر على زر المفضلة
//     const params = useParams();

//     const fetchBlog = async () => {
//         const res = await fetch("http://localhost:8000/api/blogs/"+params.id)
//         const result = await res.json();
//         setBlog(result.data);
//     }

//     useEffect(() => {
//         fetchBlog();
//     }, []);

//     const toggleFavorite = () => {
//         setLiked(!liked); // عكس حالة المفضلة عند النقر
//     }

//     return (
//         <div className='container'>
//             <div className="d-flex justify-content-between align-items-center pt-5 mb-4">
//                 {/* زر العودة */}
//                 <a href='/' className='btn btn-dark'>Back to Blogs</a>

//                 {/* زر المفضلة */}
//                 <button className='btn' onClick={toggleFavorite}>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill={liked ? "red" : "gray"} className="bi bi-heart" viewBox="0 0 16 16">
//                         <path d="M8 15s6-4.35 6-7.5C14 5.01 11.74 3 9 3c-1.74 0-3 1.51-3 1.51S4.74 3 3 3C.26 3 0 5.01 0 7.5 0 10.65 8 15 8 15z"/>
//                     </svg>
//                 </button>
//             </div>

//             <div className="row mb-4">
//                 <div className="col-md-8">
//                     {/* تفاصيل المدونة */}
//                     <h2>{blog.title}</h2>
//                     <p className="text-muted">by <strong>{blog.author}</strong> on {blog.date}</p>

//                     {blog.image && <img className='img-fluid mb-4' src={`http://localhost:8000/uploads/blogs/${blog.image}`} alt="Blog" />}

//                     {/* إضافة تنسيق للنص بشكل Inline */}
//                     <div 
//                         className="mt-4" 
//                         style={{
//                             wordWrap: 'break-word',  // لف الكلمات الطويلة
//                             whiteSpace: 'normal',    // التفاف النص بشكل طبيعي
//                             overflowWrap: 'break-word', // التأكد من التفاف النص بشكل صحيح
//                         }} 
//                         dangerouslySetInnerHTML={{ __html: blog.description }} 
//                     />
//                 </div>
//                 <div className="col-md-4">
//                     {/* يمكنك إضافة محتوى إضافي هنا إن أردت */}
//                     <h4>Related Blogs</h4>
//                     <ul>
//                         <li><a href="#">Blog 1</a></li>
//                         <li><a href="#">Blog 2</a></li>
//                         <li><a href="#">Blog 3</a></li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default BlogDetail;


// -------------------------------------------------
// Mays:

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BlogDetails.css';  // تأكد من مسار الملف بشكل صحيح

const BlogDetail = () => {
  const [blog, setBlog] = useState([]);
  const [liked, setLiked] = useState(false);
  const params = useParams();

  const fetchBlog = async () => {
    const res = await fetch(`http://localhost:8000/api/blogs/${params.id}`);
    const result = await res.json();
    setBlog(result.data);
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  const toggleFavorite = () => {
    setLiked(!liked);
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
      <div className="mt-150 mb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="single-article-section">
                <div className="single-article-text">
                  <div className="single-artcile-bg"></div>
                  <p className="blog-meta">
                    <span className="author"><i className="fas fa-user"></i> {blog.author}</span>
                    <span className="date"><i className="fas fa-calendar"></i> {blog.date}</span>
                  </p>
                  <h2>{blog.title}</h2>
                  {blog.image && (
                    <img
                      className="img-fluid mb-4"
                      src={`http://localhost:8000/uploads/blogs/${blog.image}`}
                      alt="blog-image"
                    />
                  )}
                  <div
                    className="mt-4"
                    style={{
                      wordWrap: 'break-word',
                      whiteSpace: 'normal',
                      overflowWrap: 'break-word',
                    }}
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                  />
                </div>

             
              </div>
            </div>

            {/* Sidebar Section */}
            <div className="col-lg-4">
              <div className="sidebar-section">
                <div className="recent-posts">
                  <h4 className='h44'>Related Posts</h4>
                </div>
                <div className="archive-posts">
                  <h4>Archive Posts</h4>
                  <ul>
                    <li><a href="single-news.html">JAN 2019 (5)</a></li>
                    <li><a href="single-news.html">FEB 2019 (3)</a></li>
                    <li><a href="single-news.html">MAY 2019 (4)</a></li>
                    <li><a href="single-news.html">SEP 2019 (4)</a></li>
                    <li><a href="single-news.html">DEC 2019 (3)</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default BlogDetail;