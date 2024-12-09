import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // استيراد useNavigate
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'; // استيراد مكتبة SweetAlert2

const BlogCard = ({ blog, blogs, setBlogs, toggleFavorite, liked }) => {
    const [isLiked, setIsLiked] = useState(liked);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate(); // إنشاء كائن للتنقل

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        setUserId(storedUserId);

        const checkFavoriteStatus = async () => {
            const response = await fetch("http://localhost:8000/api/favorites/check", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    blog_id: blog.id,
                    user_id: storedUserId
                })
            });

            const result = await response.json();
            if (response.ok) {
                setIsLiked(result.isFavorite); // تعيين حالة الإعجاب من الـ API
            }
        };

        if (storedUserId) {
            checkFavoriteStatus();
        }

        // استرجاع حالة الإعجاب من localStorage إذا كانت موجودة
        const storedLikeStatus = localStorage.getItem(`isLiked_${blog.id}`);
        if (storedLikeStatus !== null) {
            setIsLiked(JSON.parse(storedLikeStatus)); // تعيين الحالة من localStorage
        }
    }, [blog.id]);

    const showImage = (img) => {
        return img
            ? 'http://localhost:8000/uploads/blogs/' + img
            : 'https://placehold.co/600x400';
    };

    const deleteBlog = async (id) => {
        // عرض نافذة SweetAlert
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33' ,
            cancelButtonColor:'#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await fetch("http://localhost:8000/api/blogs/" + id, {
                    method: 'DELETE'
                });

                if (res.ok) {
                    const newBlogs = blogs.filter((blog) => blog.id !== id);
                    setBlogs(newBlogs);

                    toast("Blog deleted successfully.");
                } else {
                    toast("Failed to delete blog.");
                }
            }
        });
    };

    const handleLike = async () => {
        const response = await fetch("http://localhost:8000/api/favorites/toggle", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                blog_id: blog.id,
                user_id: userId
            })
        });

        const result = await response.json();
        if (response.ok) {
            // تغيير الحالة المحلية
            setIsLiked(!isLiked);

            // حفظ الحالة في localStorage
            localStorage.setItem(`isLiked_${blog.id}`, !isLiked);

            toast(result.message); // عرض رسالة النجاح
        } else {
            toast("Failed to toggle favorite.");
        }
    };

    return (
        <div className='col-12 col-md-6 col-lg-3 mb-4'>
            <div
                className='card border-0 shadow-lg h-100'
                style={{
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    marginBottom: "20px" // المسافة السفلية

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
                <img
                    src={showImage(blog.image)}
                    className="card-img-top"
                    alt="Blog"
                    style={{
                        width: '100%', // عرض الصورة لتملأ العرض
                        height: '200px', // ارتفاع الصورة الموحد
                        objectFit: 'cover', // اقتصاص الصورة لتناسب الإطار
                        objectPosition: 'center', // موضع الصورة داخل الإطار
                    }}
                />
                <div className='card-body d-flex flex-column'>
                    <h2 className='h5'>{blog.title}</h2>
                    <p className='flex-grow-1'>{blog.shortDesc}</p>
                    <div className='d-flex justify-content-between mt-auto'>
                        {/* التنقل إلى صفحة التفاصيل */}
                        <button
                            className='btn btn-dark'
                            onClick={() => navigate(`/blog/${blog.id}`)}
                        >
                            Details
                        </button>
                        <div>
                            {userId && blog.create_user_id === parseInt(userId) && (
                                <>
                                    <button
                                        className='text-danger btn'
                                        onClick={() => deleteBlog(blog.id)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-trash"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                        </svg>
                                    </button>
                                    <button
                                        className='text-dark btn ms-2'
                                        onClick={() => navigate(`/blog/edit/${blog.id}`)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-pencil"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                        </svg>
                                    </button>
                                </>
                            )}
                            <button className='btn' onClick={handleLike}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="28"
                                    fill={isLiked ? "red" : "gray"} // Heart is filled red when liked
                                    className="bi bi-heart"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8 15s6-4.35 6-7.5C14 5.01 11.74 3 9 3c-1.74 0-3 1.51-3 1.51S4.74 3 3 3C.26 3 0 5.01 0 7.5 0 10.65 8 15 8 15z" />
                                </svg>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
