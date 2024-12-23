// src/components/AllProducts.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import 'tailwindcss/tailwind.css';
import SearchBar from './searchbar';
import { useNavigate } from 'react-router-dom';
import Chatbot from './chatBot';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const navigate = useNavigate();

    const handleViewDetails = (product) => {
        // Navigate to the ProductDetails component with product ID
        navigate(`/product/${product._id}`, { state: { product } });
    };

    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
              const token = localStorage.getItem('token'); // Or however you're storing the token
              const response = await axiosInstance.get('/products/view', {
                  headers: {
                      Authorization: `Bearer ${token}`, // Set the Authorization header
                  },
              });
              setProducts(response.data);
            } catch (err) {
                setError('Error fetching products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div className="text-center text-xl font-bold !important">Loading...</div>;
    if (error) return <div className="text-center text-red-500 text-xl font-bold !important">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md !important">

            <h1 className="text-3xl font-bold text-center mb-6 !important">All Products</h1>
            <div className="mb-6">
                <SearchBar />
            </div>
            


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
            {products.map((product) => (
                <div key={product._id} className="bg-white shadow-md rounded-lg p-4 relative">
                {/* Action Buttons */}
                <div className="absolute left-6 top-6 flex flex-col gap-2 z-10">
                    <button className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                    <span>+</span>
                    </button>
                    <button className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
                    <span>🔍</span>
                    </button>
                </div>

                {/* Product Image */}
                <div className="mb-4">
                    <img
                    className="w-full h-48 object-cover rounded-lg"
                    src={`https://secondsway-server.onrender.com${product.images[0]}`}
                    alt={product.name}
                    />
                </div>

                {/* Product Info */}
                <div>
                    <h2 className="text-gray-800 text-base font-medium mb-1">{product.name}</h2>
                    <div className="text-gray-600 text-sm mb-3">
                    {product.currentBid ? (
                        <span>Current Bid: ${product.currentBid}</span>
                    ) : (
                        <span>${product.price}</span>
                    )}
                    </div>

                    {/* Action Buttons Row */}
                    <div className="flex gap-3 mt-4">
                    <button 
                    onClick={() => handleViewDetails(product)}
                    className="flex-1 bg-gray-100 text-gray-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
                        View Details
                    </button>
                    <button 
                    onClick={() => navigate('/order', { state: { product } })}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors">
                        Buy Now
                    </button>
                    </div>
                </div>
                
            
                </div>
            ))}
            </div>
            <Chatbot/>
        </div>
    );
};

export default AllProducts;