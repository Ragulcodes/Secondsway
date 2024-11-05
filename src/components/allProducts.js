// src/components/AllProducts.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import 'tailwindcss/tailwind.css';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 !important">
                {products.map((product) => (
                    <div key={product._id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col !important">
                        <img className="w-full h-48 object-contain rounded-md mb-4 !important" src={`http://localhost:5000${product.images[0]}`} alt={product.name} />
                        <h2 className="text-xl font-bold mb-2 !important">{product.name}</h2>
                        <p className="text-gray-700 mb-2 !important">{product.description}</p>
                        <p className="text-gray-700 mb-2 font-bold !important">Price: ${product.price}</p>
                        <p className="text-gray-700 mb-2 !important">Category: {product.category}</p>
                        <p className="text-gray-700 mb-2 !important">Condition: {product.condition}</p>
                        {product.user && <p className="text-gray-700 !important">Seller: {product.user.name}</p>}
                        <button className="mt-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 !important">View Details</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;