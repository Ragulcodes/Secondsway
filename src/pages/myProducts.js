import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance'; // Adjust the path to your axios instance

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
        <div>
            <h2>My Products</h2>
            {message && <p>{message}</p>}
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <p>Condition: {product.condition}</p>
                        <img src={`http://localhost:5000${product.images[0]}`} alt={product.name} width="100" />
                        <button onClick={() => deleteProduct(product._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyProducts;
