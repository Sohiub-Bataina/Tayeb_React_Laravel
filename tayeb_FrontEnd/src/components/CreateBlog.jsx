import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-wysiwyg';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // استيراد axios

const CreateBlog = () => {
    const [html, setHtml] = useState('');
    const [imageId, setImageId] = useState('');
    const [author, setAuthor] = useState(''); // حالة لتخزين اسم المستخدم
    const navigate = useNavigate();

    // جلب اسم المستخدم عند تحميل المكون
    useEffect(() => {
        const userId = localStorage.getItem("userId"); // افترض أن userId موجود في localStorage
        if (!userId) {
            setAuthor("Unknown Author");
            return;
        }

        const fetchAuthor = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer YOUR_ACCESS_TOKEN`, // ضع التوكن إذا كان مطلوبًا
                    },
                });
                setAuthor(response.data.name); // تعيين اسم المؤلف من البيانات المسترجعة
            } catch (error) {
                console.error("Error fetching author data:", error);
                setAuthor("Unknown Author");
            }
        };

        fetchAuthor();
    }, []);

    function onChange(e) {
        setHtml(e.target.value);
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch("http://localhost:8000/api/save-temp-image/", {
            method: 'POST',
            body: formData
        });

        const result = await res.json();

        if (result.status === false) {
            alert(result.errors.image);
            e.target.value = null;
        } else {
            setImageId(result.image.id);
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const formSubmit = async (data) => {
        const newData = { ...data, "description": html, image_id: imageId, author };

        const res = await fetch("http://localhost:8000/api/blogs", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newData)
        });

        toast("Blog added successfully.");
        navigate('/');
    };

    return (
        <div className='container mb-5'>
            <div className="d-flex justify-content-between pt-5 mb-4" style={{ marginTop: '20px' }}>
            <h4 >Create Blog</h4>
                <a href='/' className='btn btn-dark'>Back</a>
            </div>
            <div className='card border-0 shadow-lg'>
                <form onSubmit={handleSubmit(formSubmit)}>
                    <div className='card-body'>
                        <div className="mb-3">
                            <label className='form-label'>Recipe Name</label>
                            <input
                                {...register('title', { required: true })}
                                type="text"
                                className={`form-control ${errors.title && 'is-invalid'}`}
                                placeholder='Recipe Name'
                                maxLength={30}
                            />
                            {errors.title && <p className='invalid-feedback'>Recipe Name field is required</p>}
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Recipe Highlights </label>
                            <textarea
                                {...register('shortDesc')}
                                cols="30"
                                rows="5"
                                className='form-control'
                                maxLength={100}
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <div
                                style={{
                                    height: '200px',
                                    minHeight: '100px',
                                    maxHeight: '500px',
                                    resize: 'vertical',
                                    overflow: 'auto',
                                    border: '1px solid #ddd',
                                    padding: '10px',
                                    borderRadius: '5px',
                                }}
                            >
                                <Editor
                                    value={html}
                                    containerProps={{ style: { height: '100%' } }}
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Image</label><br />
                            <input onChange={handleFileChange} type="file" />
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Author</label>
                            <input
                                type="text"
                                className='form-control'
                                value={author} // عرض اسم المؤلف هنا
                                readOnly 
                            />
                        </div>
                        <button className='btn btn-dark'>Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBlog;