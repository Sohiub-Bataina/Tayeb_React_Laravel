import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route } from "react-router-dom";
import Blogs from "./components/Blogs";
import Navbar from "./components/Navbar";
import CreateBlog from "./components/CreateBlog";
import BlogDetail from "./components/BlogDetail";
import EditBlog from "./components/EditBlog";
import FavoritesPage from "./components/FavoritesPage";
import HeroSection from "./components/HeroSection";
import AuthForm from "./components/AuthForm";
import Profile from "./components/Profile";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import UserProfile from "./components/UserProfile";
import Footer from "./components/Footer";
import About from "./components/about/About";

function App() {
  const [favorites, setFavorites] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchFavorites = async () => {
    try {
      if (!userId) return;
      const response = await fetch(
        `http://localhost:8000/api/favorites?user_id=${userId}`
      );
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const toggleFavorite = async (blog) => {
    try {
      if (!userId) return;
      const response = await fetch("http://localhost:8000/api/favorites/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, blog_id: blog.id }),
      });
      const data = await response.json();
      console.log(data.message);
      fetchFavorites();
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [userId]);

  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <>
                <HeroSection />
                <Blogs />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreateBlog />
            </PrivateRoute>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <PrivateRoute>
              <BlogDetail onToggleFavorite={toggleFavorite} />
            </PrivateRoute>
          }
        />
        <Route
          path="/blog/edit/:id"
          element={
            <PrivateRoute>
              <EditBlog />
            </PrivateRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <FavoritesPage
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
      <Footer /> 
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;