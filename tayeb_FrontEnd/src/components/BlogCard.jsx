import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const BlogCard = ({ blog, blogs, setBlogs }) => {
    const [liked, setLiked] = useState(false); // حالة لتتبع ما إذا كانت المدونة مفضلة
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Retrieve user ID from local storage
        const storedUserId = localStorage.getItem("userId");
        setUserId(storedUserId);
    }, []);

    const showImage = (img) => {
        return (img) ? 'http://localhost:8000/uploads/blogs/' + img : 'https://placehold.co/600x400';
    }

    const deleteBlog = async (id) => {
        if (confirm("Are you sure you want to delete?")) {
            const res = await fetch("http://localhost:8000/api/blogs/" + id, {
                method: 'DELETE'
            });

            if (res.ok) {
                const newBlogs = blogs.filter((blog) => blog.id !== id);
                setBlogs(newBlogs);

                toast("Blog deleted successfully.");
                window.location.reload(); // Reload the page after deletion
            } else {
                toast("Failed to delete blog.");
            }
        }
    }

    const toggleLike = () => {
        setLiked(!liked); // تحديث حالة الإعجاب عند الضغط
        toast(liked ? "Removed from favorites." : "Added to favorites.");
    }

    return (
        <div className='col-12 col-md-6 col-lg-3 mb-4'>
            <div
                className='card border-0 shadow-lg h-100'
                style={{
                    transition: "transform 0.3s ease, box-shadow 0.3s ease"
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                }}
            >
                <img src={showImage(blog.image)} className='card-img-top' alt="Blog" />
                <div className='card-body d-flex flex-column'>
                    <h2 className='h5'>{blog.title}</h2>
                    <p className='flex-grow-1'>{blog.shortDesc}</p>
                    <div className='d-flex justify-content-between mt-auto'>
                        <a href={`/blog/${blog.id}`} className='btn btn-dark'>Details</a>
                        <div>
                            {userId && blog.create_user_id === parseInt(userId) && (
                                <>
                                    <a href='#' className='text-danger' onClick={() => deleteBlog(blog.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                        </svg>
                                    </a>
                                    <a href={`/blog/edit/${blog.id}`} className='text-dark ms-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                        </svg>
                                    </a>
                                </>
                            )}
                            <button className='btn' onClick={toggleLike}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="28" fill={liked ? "red" : "gray"} className="bi bi-heart" viewBox="0 0 16 16">
                                    <path d="M8 15s6-4.35 6-7.5C14 5.01 11.74 3 9 3c-1.74 0-3 1.51-3 1.51S4.74 3 3 3C.26 3 0 5.01 0 7.5 0 10.65 8 15 8 15z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogCard;