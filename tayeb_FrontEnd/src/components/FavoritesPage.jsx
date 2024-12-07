// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const FavoritesPage = () => {
//     const [favorites, setFavorites] = useState([]);

//     // جلب المفضلات من السيرفر
//     const fetchFavorites = async () => {
//         try {
//             const response = await fetch('http://localhost:8000/api/favorites'); // عنوان API
//             const result = await response.json();
//             setFavorites(result.data); // قم بتحديث حالة المفضلات
//         } catch (error) {
//             console.error('Error fetching favorites:', error);
//         }
//     };

//     useEffect(() => {
//         fetchFavorites(); // جلب المفضلات عند تحميل الصفحة
//     }, []);

//     return (
//         <div className="container">
//             <div className="d-flex justify-content-between pt-5 mb-4">
//                 <h4>Your Favorites</h4>
//                 <Link to="/" className='btn btn-dark'>Back</Link>
//             </div>
//             {favorites.length > 0 ? (
//                 <ul className="list-unstyled">
//                     {favorites.map((blog) => (
//                         <li key={blog.id} className="mb-3">
//                             <h5>{blog.title}</h5>
//                             <p className="text-muted">by {blog.author}</p>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No favorites yet!</p>
//             )}
//         </div>
//     );
// };

// export default FavoritesPage;
import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard'; // استيراد مكون BlogCard
import { useNavigate } from 'react-router-dom'; // لإعادة التوجيه عند الحاجة

const FavoritesPage = () => {
    const navigate = useNavigate(); // لإعادة التوجيه
    const userId = localStorage.getItem("userId"); // جلب userId من localStorage

    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null); // لتخزين الأخطاء

    useEffect(() => {
        if (!userId) {
            console.warn("No userId found in localStorage. Redirecting to login...");
            navigate("/login"); // إعادة التوجيه إلى تسجيل الدخول إذا لم يتم تسجيل الدخول
        } else {
            fetchFavorites(userId);
        }
    }, [userId]);

    const fetchFavorites = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/favorites?user_id=${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch favorites');
            }
            const data = await response.json();
            setFavorites(data); // تحديث المفضلات المسترجعة في الحالة
        } catch (error) {
            console.error('Error fetching favorites:', error);
            setError(error.message); // تخزين رسالة الخطأ في الحالة
        }
    };

    const toggleFavorite = async (blogId) => {
        try {
            if (!userId) return; // تأكد من وجود userId قبل محاولة الإرسال
            const response = await fetch('http://localhost:8000/api/favorites/toggle', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: userId,
                    blog_id: blogId,
                }),
            });
            const data = await response.json();
            console.log(data.message); // عرض الرسالة المترتبة على التفاعل
            fetchFavorites(userId); // إعادة تحميل المفضلات بعد التغيير
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    return (
        <div>
            <h2>Your Favorites</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* عرض الأخطاء إن وجدت */}
            <div className="row">
                {favorites.length > 0 ? (
                    favorites.map((favorite) => (
                        <BlogCard
                            key={favorite.blog.id}
                            blog={favorite.blog}
                            toggleFavorite={toggleFavorite} // تمرير الدالة للتفاعل مع القلب
                            liked={true} // المدونة تكون مفضلة بالفعل عند عرضها هنا
                        />
                    ))
                ) : (
                    <p>No favorites found</p> // في حال عدم وجود مفضلات
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;








