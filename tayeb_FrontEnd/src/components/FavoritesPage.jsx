import  { useState, useEffect } from 'react';
import BlogCard from './BlogCard'; // استيراد مكون BlogCard
import { useNavigate } from 'react-router-dom'; // لإعادة التوجيه عند الحاجة
import HeroFavorite from "./HeroFavorite";

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
        <div className="container-fluid" style={{ padding: 0, margin: 0, width: '100%' }}>
            {/* إضافة قسم Hero Favorite */}
            <HeroFavorite />

            {/* إضافة هامش بين الهيرو والكروت */}
            <div className="row px-3 mt-5" style={{ padding: 0, margin: 0 }}>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* عرض الأخطاء إن وجدت */}

                {favorites.length > 0 ? (
                    favorites.map((favorite) => (
                        <BlogCard
                            key={favorite.blog.id}
                            blog={favorite.blog}
                            toggleFavorite={toggleFavorite}
                            liked={true} // المدونة تكون مفضلة بالفعل عند عرضها هنا
                        />
                    ))
                ) : (
                    <p style={{ color: 'black' }}>No favorites found</p>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;
