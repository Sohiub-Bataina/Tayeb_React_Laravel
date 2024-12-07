import { useState } from 'react';
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

import Footer from './components/Footer'; // استيراد الفوتر
import '@fortawesome/fontawesome-free/css/all.min.css';

import AuthForm from './components/AuthForm';
import Profile from './components/Profile';
import UserProfile from './components/UserProfile';

function App() {
  const [favorites, setFavorites] = useState([]); 
  const toggleFavorite = (blog) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.find((item) => item.id === blog.id)) {
        return prevFavorites.filter((item) => item.id !== blog.id);
      } else {
        return [...prevFavorites, blog];
      }
    });
  };

  const userId = localStorage.getItem('userId');
  console.log(userId);

  return (
    <>
      <Navbar />
      <HeroSection />

      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/blog/:id" element={<BlogDetail onToggleFavorite={toggleFavorite} />} />
        <Route path="/blog/edit/:id" element={<EditBlog />} />
        <Route path="/favorites" element={<FavoritesPage favorites={favorites} />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>

      <ToastContainer />

      <Footer />
    </>
  );
}

export default App;
