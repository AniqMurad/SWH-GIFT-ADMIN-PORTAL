import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {

    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://swhmaah.vercel.app/api/user/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`https://swhmaah.vercel.app/api/admin/delete/${id}`);
            fetchProducts();
            setMessage('Product Deleted successfully!');
        } catch (error) {
            setMessage('Product Not Deleted!');
            console.error(error);
        }
    };

    return (
        <div className='container'>
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

            <h2 className="my-4">Current Products</h2>
            <div className="row">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="col-md-4 mb-4">
                            <div className="card">
                                {/* Render the first image as the main image */}
                                <img src={`https://swhmaah.vercel.app/${product.colors[0].image}`} alt={product.name} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">Price: Rs {product.price}</p>
                                    <p className="card-text"><strong>Category:</strong> {product.category}</p>
                                    <p className="card-text"><strong>Description:</strong> {product.description}</p>
                                    
                                    {/* Render color variations */}
                                    <div className="mb-3">
                                        <strong>Available Colors:</strong>
                                        <div className="d-flex">
                                            {product.colors.map((color) => (
                                                <div key={color._id} className="me-3">
                                                    <img
                                                        src={`https://swhmaah.vercel.app/${color.image}`}
                                                        alt={color.colorName}
                                                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }}
                                                    />
                                                    <p className="text-center">{color.colorName}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <button className="btn btn-danger" onClick={() => deleteProduct(product._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>
        </div>
    );
}

export default Products;
