import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Blogs from './components/Blogs';
import Navbar from './components/Navbar';
import CreateBlog from './components/CreateBlog';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogDetail from './components/BlogDetail';
import EditBlog from './components/EditBlog';
import FavoritesPage from './components/FavoritesPage';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AuthForm from './components/AuthForm';
import Profile from './components/Profile';
import UserProfile from './components/UserProfile';

function App() {
  const [favorites, setFavorites] = useState([]);
  const userId = localStorage.getItem("userId"); // جلب userId من localStorage

  // التحقق من وجود userId
  if (!userId) {
    console.warn("No userId found in localStorage. Redirecting to login...");
    // يمكن تنفيذ إعادة توجيه إلى صفحة تسجيل الدخول هنا إذا لزم الأمر
  }

  // جلب المفضلات من الخادم
  const fetchFavorites = async () => {
    try {
      if (!userId) return; // تأكد من وجود userId قبل محاولة الجلب
      const response = await fetch(`http://localhost:8000/api/favorites?user_id=${userId}`);
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  // تحديث حالة المفضلة
  const toggleFavorite = async (blog) => {
    try {
      if (!userId) return; // تأكد من وجود userId قبل محاولة الإرسال
      const response = await fetch('http://localhost:8000/api/favorites/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, blog_id: blog.id }),
      });
      const data = await response.json();
      console.log(data.message);
      fetchFavorites(); // تحديث المفضلات
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [userId]);

  return (
    <>
      <Navbar />
      <HeroSection />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/blog/:id" element={<BlogDetail onToggleFavorite={toggleFavorite} />} />
        <Route path="/blog/edit/:id" element={<EditBlog />} />
        <Route path="/favorites" element={<FavoritesPage favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>

      <ToastContainer />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
