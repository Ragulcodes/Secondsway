import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';  // Adjust the path to your axios instance
import 'tailwindcss/tailwind.css';
import ToggleButton from '@mui/lab/ToggleButton';
import ToggleButtonGroup from '@mui/lab/ToggleButtonGroup';


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

    const handleConditionChange = (event, newCondition) => {
        if (newCondition !== null) {
            setProductData({ ...productData, condition: newCondition });
        }
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
        <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md !important">
            <h2 className="text-2xl font-bold text-center mb-6 !important">List a New Product</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 !important">
                <div>
                    <label className="block text-sm font-medium text-gray-700 !important">Product Name:</label>
                    <input type="text" name="name" value={productData.name} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md !important" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 !important">Description:</label>
                    <textarea name="description" value={productData.description} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md !important"></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 !important">Price:</label>
                    <input type="number" name="price" value={productData.price} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md !important" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 !important">Category:</label>
                    <input type="text" name="category" value={productData.category} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md !important" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 !important">Condition:</label>
                    <ToggleButtonGroup
                        color="primary"
                        value={productData.condition}
                        exclusive
                        onChange={handleConditionChange}
                        aria-label="Condition"
                        className="mt-1 block w-full"
                    >
                        <ToggleButton value="new">New</ToggleButton>
                        <ToggleButton value="used">Used</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 !important">Upload Image:</label>
                    <input type="file" onChange={(e) => setSelectedImage(e.target.files[0])} className="mt-1 block w-full !important" />
                    <button type="button" onClick={handleImageUpload} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 !important">Upload Image</button>
                    <ul className="mt-2 space-y-2 !important">
                        {productData.images.map((url, index) => (
                            <li key={index}><img src={`http://localhost:5000${url}`} alt="Product" className="w-24 h-24 object-cover rounded-md !important" /></li>
                        ))}
                    </ul>
                </div>
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 !important">List Product</button>
            </form>
            {message && <p className="mt-4 text-center text-red-500 font-bold !important">{message}</p>}
        </div>
    );
};

export default ProductCreationForm;
