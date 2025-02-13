import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [gender, setGender] = useState('Male');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !price || !image || !category || !description) {
            setMessage('Please fill in all fields.');
            return;
        }

        const productData = { name, price, image, category, gender, description };

        try {
            await axios.post('https://swhmaah.vercel.app/api/admin/add', productData);
            setMessage('Product added successfully!');

            setName('');
            setPrice('');
            setImage('');
            setCategory('');
            setGender('Male');
            setDescription('');

            //fetchProducts();
        } catch (error) {
            console.error('Error adding product:', error.response);
            setMessage('Error adding product. Please try again.');
        }
    };

    return (
        <div className="container">
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1050 }}>
                {message && (
                    <div
                        className="mt-3 alert alert-info"
                        style={{
                            position: 'fixed',
                            top: '10px',
                            right: '10px',
                            zIndex: 1050,
                            width: 'auto',
                            padding: '10px',
                            borderRadius: '5px',
                        }}
                    >
                        {message}
                    </div>
                )}
            </div>

            <h2 className="my-4">Post Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="name">Product Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter product name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="price">Price</label>
                    <input type="number" className="form-control" id="price" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="image">Image URL</label>
                    <input type="text" className="form-control" id="image" placeholder="Enter image URL" value={image} onChange={(e) => setImage(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="category">Category</label>
                    <input type="text" className="form-control" id="category" placeholder="Enter category" value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                    <label>Gender</label>
                    <select className="form-control" value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" id="description" placeholder="Enter product description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3"></textarea>
                </div>
                <button type="submit" className="btn btn-primary mb-5">Submit</button>
            </form>
        </div>
    );
};

export default PostProduct;