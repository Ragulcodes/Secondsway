// src/components/AllProducts.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>All Products</h1>
            <div className="products-container">
                {products.map((product) => (
                    <div key={product._id} className="product-card">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <p>Category: {product.category}</p>
                        <p>Condition: {product.condition}</p>
                        <img style={{ width: '200px', height: '160px' }} src={`http://localhost:5000${product.images[0]}`}/>
                        {product.user && <p>Seller: {product.user.name}</p>} {/* Display seller name if populated */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
