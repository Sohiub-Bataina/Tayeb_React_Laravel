import React, { useEffect, useState } from 'react';
import Editor from 'react-simple-wysiwyg';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const EditBlog = () => {
    const [blog, setBlog] = useState([]);
    const params = useParams();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [html, setHtml] = useState('');
    const [imageId, setImageId] = useState('');

    const navigate = useNavigate();

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
    }

    const fetchBlog = async () => {
        const res = await fetch("http://localhost:8000/api/blogs/" + params.id);
        const result = await res.json();

        // Log the response to see the data
        console.log("Blog data:", result);

        setBlog(result.data);
        setHtml(result.data.description);
        reset(result.data);
    }

    const formSubmit = async (data) => {
        const userId = localStorage.getItem("userId"); // Retrieve user ID from local storage

        // Check if the user is allowed to edit the blog
        if (blog.create_user_id !== parseInt(userId)) {
            alert("You can't edit this blog.");
            return;
        }

        const newData = { ...data, "description": html, image_id: imageId };

        const res = await fetch("http://localhost:8000/api/blogs/" + params.id, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newData)
        });

        const result = await res.json();

        if (result.status) {
            toast("Blog updated successfully.");
            navigate('/');
        } else {
            toast("Failed to update blog.");
        }
    }

    useEffect(() => {
        fetchBlog();
    }, []);

    return (
        <div className='container mb-5'>
            <div className="d-flex justify-content-between pt-5 mb-4">
                <h4>Edit Blog</h4>
                <a href='/' className='btn btn-dark'>Back</a>
            </div>
            <div className='card border-0 shadow-lg'>
                <form onSubmit={handleSubmit(formSubmit)}>
                    <div className='card-body'>
                        <div className="mb-3">
                            <label className='form-label'>Title</label>
                            <input 
                                { ...register('title', { required: true }) } 
                                type="text" 
                                className={`form-control ${errors.title && 'is-invalid'}`} 
                                placeholder='Title' />
                            {errors.title && <p className='invalid-feedback'>Title field is required</p>}
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Short Description</label>
                            <textarea 
                                { ...register('shortDesc') } 
                                cols="30" rows="5" className='form-control'></textarea>
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Description</label>
                            <Editor value={html} 
                                containerProps={{ style: { height: '700px' } }}
                                onChange={onChange} />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Image</label><br/>
                            <input onChange={handleFileChange} type="file" />
                            <div className='mt-3'>
                                {blog.image && <img className='w-50' src={`http://localhost:8000/uploads/blogs/${blog.image}`} alt="Blog" />}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Author</label>
                            <input 
                                { ...register('author', { required: true }) } 
                                type="text" 
                                className={`form-control ${errors.author && 'is-invalid'}`} 
                                placeholder='Author' />
                            {errors.author && <p className='invalid-feedback'>Author field is required</p>}
                        </div>
                        <button className='btn btn-dark'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditBlog;