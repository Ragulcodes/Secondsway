import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';  // Adjust the path to your axios instance

const ProductCreationForm = () => {
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        condition: 'used',
        images: []
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleImageUpload = async () => {
        if (!selectedImage) return;

        const formData = new FormData();
        formData.append('image', selectedImage);

        try {
            const response = await axiosInstance.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const imageUrl = response.data.imageUrl;
            setProductData({ ...productData, images: [...productData.images, imageUrl] });
            setSelectedImage(null); // Reset selected image after upload
        } catch (error) {
            setMessage('Error uploading image');
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem('token');
        console.log(token);
    
        try {
            const response = await axiosInstance.post('/products/add', productData, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the token here
                }
            });
            
            // Use the product details from the response
            const createdProduct = response.data.product; // This should contain the full product details
    
            setMessage(`Product created successfully: ${createdProduct.name}`); // Display the product name
            setProductData({ name: '', description: '', price: '', category: '', condition: 'used', images: [] });
        } catch (error) {
            setMessage('Error creating product. Please try again.');
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error('Error Data:', error.response.data);
                console.error('Error Status:', error.response.status);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error Request:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error Message:', error.message);
            }
        }
    };    

    return (
        <div>
            <h2>List a New Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name:</label>
                    <input type="text" name="name" value={productData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea name="description" value={productData.description} onChange={handleChange} required></textarea>
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" name="price" value={productData.price} onChange={handleChange} required />
                </div>
                <div>
                    <label>Category:</label>
                    <input type="text" name="category" value={productData.category} onChange={handleChange} required />
                </div>
                <div>
                    <label>Condition:</label>
                    <select name="condition" value={productData.condition} onChange={handleChange} required>
                        <option value="new">New</option>
                        <option value="used">Used</option>
                    </select>
                </div>
                <div>
                    <label>Upload Image:</label>
                    <input type="file" onChange={(e) => setSelectedImage(e.target.files[0])} />
                    <button type="button" onClick={handleImageUpload}>Upload Image</button>
                    <ul>
                        {productData.images.map((url, index) => (
                            <li key={index}><img src={`http://localhost:5000${url}`} alt="Product" width="100" /></li>
                        ))}
                    </ul>
                </div>
                <button type="submit">List Product</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ProductCreationForm;
