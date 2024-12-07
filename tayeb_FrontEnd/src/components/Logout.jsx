
import { Navigate } from 'react-router-dom';
const handleLogout = async () => {
    try {
        await axiosInstance.post('/logout');
        // Remove token from local storage
        localStorage.removeItem('authToken');
        alert('Logout successful!');
        window.location.href = '/login'; // Redirect to login page
    } catch (error) {
        console.error('Error during logout:', error);
        alert('Logout failed. Please try again.');
    }
};


const ProtectedRoute = ({ children }) => {
   const token = localStorage.getItem('authToken');
   return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
