import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import { Link } from 'react-router-dom'; // لاستعمال رابط
import { useNavigate } from 'react-router-dom';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [favorites, setFavorites] = useState([]); // للاحتفاظ بالمدونات المفضلة
    const [keyword, setKeyword] = useState('');

    // جلب المدونات
    const fetchBlogs = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/blogs');
            if (!res.ok) throw new Error('Failed to fetch blogs');
            const result = await res.json();
            setBlogs(result.data); // تخزين المدونات في الحالة
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };
    const navigate = useNavigate();
    const goToCreate = () => {
        navigate("/create"); // ينقلك إلى صفحة Blogs
      };

    // البحث عن مدونة
    const searchBlogs = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8000/api/blogs?keyword=' + keyword);
            if (!res.ok) throw new Error('Search failed');
            const result = await res.json();
            setBlogs(result.data); // تحديث المدونات بعد البحث
        } catch (error) {
            console.error('Error searching blogs:', error);
        }
    };

    // إعادة ضبط البحث
    const resetSearch = () => {
        fetchBlogs();
        setKeyword('');
    };

    // إضافة مدونة إلى قائمة المفضلة
    const toggleFavorite = async (blog) => {
        const isFavorite = favorites.some((fav) => fav.id === blog.id);
        if (isFavorite) {
            // إذا كانت المدونة موجودة في المفضلة، أزلها
            setFavorites(favorites.filter((fav) => fav.id !== blog.id));
        } else {
            // إذا لم تكن المدونة في المفضلة، أضفها
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
                    <form onSubmit={searchBlogs} className="d-flex">
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
                            onClick={resetSearch}
                            className='btn btn-success'
                        >
                            Reset
                        </button>
                    </form>
                </div>
                <div className="col-lg-6 col-md-4 col-sm-12 d-flex justify-content-end">
                    {/* <Link to="/favorites" state={{ favorites }} className='btn btn-danger me-2'>
                        Favorites
                    </Link> */}
                   
                    <a onClick={goToCreate} className='btn btn-dark'>Create</a>
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
                            isFavorite={favorites.some((fav) => fav.id === blog.id)} // تمرير حالة المفضلة
                            toggleFavorite={toggleFavorite} // تمرير دالة التبديل
                        />
                    ))}
            </div>
        </div>
    );
};

export default Blogs;
