import React, { useState, useRef } from "react";
import axios from "axios";

const PostProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [gender, setGender] = useState("Male");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [colors, setColors] = useState([]);
    const [newColor, setNewColor] = useState('');
    const [newColorImage, setNewColorImage] = useState(null);

    const fileInputRef = useRef(null);

    const handleAddColor = () => {
        if (!newColor || !newColorImage) return;
        setColors([...colors, { color: newColor, image: newColorImage }]);
        setNewColor('');
        setNewColorImage(null);
        fileInputRef.current.value = "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !price || !category || !description || colors.length === 0) {
            setMessage('Please fill in all fields and add at least one color variation.');
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("gender", gender);
        formData.append("description", description);

        colors.forEach((colorObj, index) => {
            formData.append('ProductImages', colorObj.image); 
            formData.append(`colors[${index}][color]`, colorObj.color);
        });

        try {
            await axios.post("https://swhmaah.vercel.app/api/admin/add", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setMessage("Product added successfully!");
            setName("");
            setPrice("");
            setCategory("");
            setGender("Male");
            setDescription("");
            setColors([]);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch (error) {
            console.error("Error adding product:", error.response);
            setMessage("Error adding product. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1050 }}>
                {message && (
                    <div
                        className="alert alert-info"
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
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter product name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        className="form-control"
                        id="category"
                        placeholder="Enter category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
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
                    <textarea
                        className="form-control"
                        id="description"
                        placeholder="Enter product description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="3"
                    ></textarea>
                </div>

                <div className="form-group mb-3">
                    <label>Add Colors</label>
                    <div className="d-flex gap-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter color name (e.g., Red)"
                            value={newColor}
                            onChange={(e) => setNewColor(e.target.value)}
                        />
                        <input
                            type="file"
                            className="form-control"
                            ref={fileInputRef}
                            onChange={(e) => setNewColorImage(e.target.files[0])}
                        />
                        <button type="button" className="btn btn-success" onClick={handleAddColor}>+</button>
                    </div>
                </div>

                {/* Display added color variations */}
                {colors.length > 0 && (
                    <div className="mb-3">
                        <h5>Added Colors</h5>
                        <ul className="list-group">
                            {colors.map((colorObj, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                    {colorObj.color}
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={() => setColors(colors.filter((_, i) => i !== index))}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <button type="submit" className="btn btn-primary mb-5">Submit</button>
            </form>
        </div>
    );
};

export default PostProduct;
