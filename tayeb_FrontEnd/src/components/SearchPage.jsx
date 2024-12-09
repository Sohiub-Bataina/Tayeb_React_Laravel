import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`); // توجيه إلى صفحة البحث مع المعلمات
      setSearchQuery(""); // إعادة ضبط الحقل بعد البحث
    }
  };

  // Extract the search query from the URL

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/api/blogs/search?query=${query}`);
        const results = await response.json();
        if (response.ok) {
          setSearchResults(results);
        } else {
          console.error("Failed to fetch search results");
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <div className="container">
      <h1>Search Results for: "{query}"</h1>
      {loading ? (
        <p>Loading...</p>
      ) : searchResults.length > 0 ? (
        <div className="row">
          {searchResults.map((blog) => (
            <div className="col-md-4" key={blog.id}>
              {/* Blog Card */}
              <div className="card">
                <img
                  src={
                    blog.image
                      ? `http://localhost:8000/uploads/blogs/${blog.image}`
                      : "http://localhost:8000/uploads/blogs/placeholder.jpg"
                  }
                  alt={blog.title}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text">
                    {blog.shortDesc || "No description available."}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found for "{query}".</p>
      )}
    </div>
  );
};

export default SearchPage;
