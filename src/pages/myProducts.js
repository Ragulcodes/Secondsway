import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance'; // Adjust the path to your axios instance
import 'tailwindcss/tailwind.css';

const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Log the token

    const fetchMyProducts = async () => {
        console.log('Fetching my products...'); // This log will help verify if the function is running
        try {
            const response = await axiosInstance.get('/products/my-products', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log('Fetched Products:', response.data); // Log the response data
            if (Array.isArray(response.data) && response.data.length === 0) {
                setMessage('No products found.');
            } else {
                setProducts(response.data);
            }
        } catch (error) {
            setMessage('Error fetching products');
            console.error(error);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            await axiosInstance.delete(`/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            // Update the state to remove the deleted product
            setProducts(products.filter((product) => product._id !== productId));
            setMessage('Product deleted successfully');
        } catch (error) {
            setMessage('Error deleting product');
            console.error(error);
        }
    };

    useEffect(() => {
        console.log('MyProducts component mounted'); // Log to confirm component mount
        fetchMyProducts();
    }, []);

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md !important">
            <h2 className="text-3xl font-bold text-center mb-6 !important">My Products</h2>
            {message && <p className="text-center text-red-500 text-xl font-bold !important">{message}</p>}



            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
            {products.map((product) => (
                <li key={product._id} className="bg-white rounded-xl shadow-md overflow-hidden relative">

                {/* Product Image */}
                <div className="relative">
                    <img 
                    className="w-full h-48 object-cover" 
                    src={`https://secondsway-server.onrender.com${product.images[0]}`} 
                    alt={product.name} 
                    />
                </div>

                {/* Product Details */}
                <div className="p-4">
                    <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                    <p className="text-lg font-bold text-gray-900">Rs.{product.price}</p>
                    <p className="text-sm text-gray-600">Condition: {product.condition}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                    <button 
                        className="flex-1 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        {/* onClick={() => onEdit(product._id)}  */}
                        Edit
                    </button>
                    <button 
                        onClick={() => deleteProduct(product._id)} 
                        className="flex-1 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Delete
                    </button>
                    </div>
                </div>
                </li>
            ))}
            </ul>
        </div>
    );
};

export default MyProducts;