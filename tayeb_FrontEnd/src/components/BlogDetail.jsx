import  { useEffect, useState } from 'react';
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
  <div className="single-article-text">
    {(() => {
      try {
        // Check if description exists and process it
        const processedDescription =
          blog.description
            ? blog.description
                // Split when a character (letters) precedes a dot
                .split(/(?<=[a-zA-Z])\./)
                .filter(sentence => sentence.trim() !== '') // Remove empty sentences
                .map(sentence => sentence.trim() + '.<br/>') // Add a line break after each sentence
                .join('') // Combine all sentences back into a single string
            : 'No description available.';

        // Split description into sentences and wrap each sentence in a <div> with margin
        const sentencesWithMargin = processedDescription
          .split('<br/>')
          .map(sentence => `<div style="margin-bottom: 4px">${sentence}</div>`)
          .join('<br/>');

        return (
          <>
            <div className="blog-meta" style={{ marginTop: '10px' }}>
              <span>
                <i className="fas fa-user"></i> {blog.author}
              </span>
              <br />
              <span style={{ marginTop: '10px', display: 'inline-block' }}>
                <i className="fas fa-calendar"></i> {blog.date}
              </span>
            </div>
            <h2 style={{ marginTop: '10px' }}>{blog.title}</h2>
            <div
              style={{ marginTop: '10px' }}
              dangerouslySetInnerHTML={{
                __html: sentencesWithMargin,
              }}
            />
          </>
        );
      } catch (error) {
        console.error('Error processing description:', error);
        return <p>Error loading description.</p>;
      }
    })()}
  </div>

  {/* Image */}
  {blog.image && (
    <img
      className="article-image"
      src={`http://localhost:8000/uploads/blogs/${blog.image}`}
      alt="blog"
      style={{ marginTop: '10px' }}
    />
  )}
</div>


    </div>
  );
};

export default BlogDetail;
