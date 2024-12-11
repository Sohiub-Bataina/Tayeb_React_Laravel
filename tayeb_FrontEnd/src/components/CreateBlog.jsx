import React, { useEffect, useState } from 'react';
import Editor from 'react-simple-wysiwyg';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateBlog = () => {
    const [html, setHtml] = useState('');
    const [imageId, setImageId] = useState('');
    const [author, setAuthor] = useState(''); // حالة لتخزين اسم المستخدم
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

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

    const fetchAuthor = async () => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            setAuthor("Unknown Author");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8000/api/users/${userId}`);
            setAuthor(response.data.name); // تعيين اسم المؤلف من البيانات المسترجعة
        } catch (error) {
            console.error("Error fetching author data:", error);
            setAuthor("Unknown Author");
        }
    };

    const formSubmit = async (data) => {
        const userId = localStorage.getItem("userId"); // Retrieve user ID from local storage

        const newData = { ...data, "description": html, image_id: imageId, author, create_user_id: userId };

        try {
            const res = await fetch("http://localhost:8000/api/blogs", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newData)
            });

            const result = await res.json();
            console.log(result); // Log the server response

            if (result.status) {
                toast("Blog created successfully.");
                navigate('/');
            } else {
                toast("Failed to create blog: " + result.message);
            }
        } catch (error) {
            console.error("Error creating blog:", error);
            toast("Failed to create blog due to a network or server error.");
        }
    };

    useEffect(() => {
        fetchAuthor(); // استدعاء جلب المؤلف عند تحميل المكون
    }, []);

    return (
        <div className='container mb-5'>
            <div style={{ marginTop: '20px' }} className="d-flex justify-content-between pt-5 mb-4">
                <h4>Create Blog</h4>
                <a href='/' className='btn btn-dark'>Back</a>
            </div>
            <div className='card border-0 shadow-lg'>
                <form onSubmit={handleSubmit(formSubmit)}>
                    <div className='card-body'>
                        <div className="mb-3">
                            <label className='form-label'>Recipe Name</label>
                            <input 
                                { ...register('title', { required: true }) } 
                                type="text" 
                                className={`form-control ${errors.title && 'is-invalid'}`} 
                                placeholder='Recipe Name'
                                maxLength={30} />
                            {errors.title && <p className='invalid-feedback'>Recipe Name field is required</p>}
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Recipe Highlights </label>
                            <textarea 
                                { ...register('shortDesc') } 
                                cols="30" rows="5" className='form-control' maxLength={100}></textarea>
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
                            <label className='form-label'>Image</label><br/>
                            <input onChange={handleFileChange} type="file" />
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Author</label>
                            <input 
                                type="text" 
                                className='form-control' 
                                value={author} // عرض اسم المؤلف فقط
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