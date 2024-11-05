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
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 !important">
                {products.map((product) => (
                    <li key={product._id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col !important">
                        <div className="flex-grow">
                            <img className="w-full h-40 object-contain rounded-md mb-2 !important" src={`http://localhost:5000${product.images[0]}`} alt={product.name} />
                            <h3 className="text-xl font-bold mb-2 !important">{product.name}</h3>
                            <p className="text-gray-700 mb-2 !important">{product.description}</p>
                            <p className="text-gray-700 mb-2 font-bold !important">Rs.{product.price}</p>
                            <p className="text-gray-700 mb-2 !important">Condition: {product.condition}</p>
                        </div>
                        <button onClick={() => deleteProduct(product._id)} className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 !important">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyProducts;