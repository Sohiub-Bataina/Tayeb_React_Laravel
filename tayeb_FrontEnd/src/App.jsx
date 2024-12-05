import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, Link } from 'react-router-dom';
import Blogs from './components/Blogs';
import CreateBlog from './components/CreateBlog';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogDetail from './components/BlogDetail';
import EditBlog from './components/EditBlog';
import FavoritesPage from './components/FavoritesPage'; // صفحة المفضلة

function App() {
    const [favorites, setFavorites] = useState([]); // قائمة المفضلة

    // دالة لإضافة/إزالة المدونات من المفضلة
    const toggleFavorite = (blog) => {
        setFavorites((prevFavorites) => {
            if (prevFavorites.find((item) => item.id === blog.id)) {
                return prevFavorites.filter((item) => item.id !== blog.id);
            } else {
                return [...prevFavorites, blog];
            }
        });
    };

    return (
        <>
            {/* الشريط العلوي */}
            <div className="bg-dark text-center py-2 shadow-lg">
                <h1 className="text-white">React & Laravel Blog App</h1>
              
            </div>

            {/* التوجيه بين الصفحات */}
            <Routes>
                <Route path="/" element={<Blogs />} />
                <Route path="/create" element={<CreateBlog />} />
                
                <Route path="/blog/:id" element={<BlogDetail onToggleFavorite={toggleFavorite} />} />
                <Route path="/blog/edit/:id" element={<EditBlog />} />
                <Route path="/favorites" element={<FavoritesPage favorites={favorites} />} />
            </Routes>

            <ToastContainer />
        </>
    );
}

export default App;
