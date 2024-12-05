import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const FavoritesPage = () => {
    const location = useLocation();
    const favorites = location.state?.favorites || [];

    return (
        <div className="container">
            <div className="d-flex justify-content-between pt-5 mb-4">
                <h4>Your Favorites</h4>
                <Link to="/" className='btn btn-dark'>Back</Link>
            </div>
            {favorites.length > 0 ? (
                <ul className="list-unstyled">
                    {favorites.map((blog) => (
                        <li key={blog.id} className="mb-3">
                            <h5>{blog.title}</h5>
                            <p className="text-muted">by {blog.author}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No favorites yet!</p>
            )}
        </div>
    );
};

export default FavoritesPage;
