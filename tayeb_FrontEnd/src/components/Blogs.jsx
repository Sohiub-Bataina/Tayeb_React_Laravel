import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import { Link } from 'react-router-dom'; // لاستعمال رابط

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [keyword, setKeyword] = useState('');

    const fetchBlogs = async () => {
        const res = await fetch('http://localhost:8000/api/blogs');
        const result = await res.json();
        setBlogs(result.data);
    };

    const searchBlogs = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:8000/api/blogs?keyword=' + keyword);
        const result = await res.json();
        setBlogs(result.data);
    };

    const resetSearch = () => {
        fetchBlogs();
        setKeyword('');
    };

    // إضافة مدونة إلى قائمة المفضلة
    const addToFavorites = (blog) => {
        if (!favorites.some((fav) => fav.id === blog.id)) {
            setFavorites([...favorites, blog]);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className='container pt-5'>
            {/* الشريط العلوي */}
            <div className="row mb-4 align-items-center">
                <div className="col-lg-6 col-md-8 col-sm-12 mb-3">
                    <form onSubmit={(e) => searchBlogs(e)} className="d-flex">
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className='form-control me-2'
                            placeholder='Search Blogs'
                        />
                        <button className='btn btn-dark me-2'>Search</button>
                        <button
                            type='button'
                            onClick={() => resetSearch()}
                            className='btn btn-success'
                        >
                            Reset
                        </button>
                    </form>
                </div>
                <div className="col-lg-6 col-md-4 col-sm-12 d-flex justify-content-end">
                    <Link to="/favorites" state={{ favorites }} className='btn btn-danger me-2'>
                        Favorites
                    </Link>
                    <a href='/create' className='btn btn-dark'>Create</a>
                </div>
            </div>

            {/* العنوان */}
            <div className="row">
                <div className="col-12">
                    <h4 className="text-center mb-4">Blogs</h4>
                </div>
            </div>

            {/* المدونات */}
            <div className='row'>
                {blogs &&
                    blogs.map((blog) => (
                        <BlogCard
                            blog={blog}
                            key={blog.id}
                            addToFavorites={addToFavorites}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Blogs;
