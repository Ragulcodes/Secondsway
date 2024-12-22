import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId'); // Assuming user ID is stored in local storage after login

    // Fetch order details from the API for a specific user
    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axiosInstance.get(`/orders/MyorderDetails/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                console.log(response.data.orderDetails);

                const mappedOrders = response.data.orderDetails.map((order) => ({
                    orderId: order.orderId, // Extract order ID
                    productId: Array.isArray(order.productId) ? order.productId : [order.productId], // Ensure it's an array
                    productName: Array.isArray(order.productName) ? order.productName : [order.productName], // Ensure it's an array
                    productPrice: Array.isArray(order.productPrice) ? order.productPrice : [order.productPrice], // Ensure it's an array
                    quantity: order.quantity || 0, // Default to 0 if undefined
                    totalPrice: order.totalPrice || 0, // Default to 0 if undefined
                    purchasedAt: order.purchasedAt,
                }));

                console.log("Mapped Orders:", mappedOrders);

                setOrders(mappedOrders);
                setLoading(false);
            } catch (error) {
                setError('Error fetching orders');
                setLoading(false);
            }
        };

        if (userId) {
            fetchOrderDetails();
        } else {
            setError('User not found.');
            setLoading(false);
        }
    }, [userId]);

    // Handle navigation to order details page
    const handleOrderClick = (orderId) => {
        navigate(`/order/${orderId}`);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)} // Navigate back to the previous page
                className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
            </button>

            {/* Order List */}
            <div className="space-y-6">
                {loading ? (
                    <div className="text-center text-gray-500">Loading your orders...</div>
                ) : error ? (
                    <div className="text-center text-red-500">{error}</div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {orders.length === 0 ? (
                            <div className="col-span-full text-center text-gray-600">
                                You have no orders yet.
                            </div>
                        ) : (
                            orders.map((order) => (
                                <div
                                    key={order.orderId}
                                    onClick={() => handleOrderClick(order.orderId)}
                                    className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <h3 className="text-xl font-semibold text-gray-800">Order #{order.orderId}</h3>
                                    </div>
                                    <div className="space-y-4">
                                        {order.productId.map((productId, index) => (
                                            <div key={productId || index} className="space-y-2">
                                                <div className="flex justify-between text-gray-800">
                                                    <span className="font-medium">Product Name:</span>
                                                    <span>{order.productName[index] || 'N/A'}</span>
                                                </div>
                                                <div className="flex justify-between text-gray-800">
                                                    <span className="font-medium">Product Price:</span>
                                                    <span>${order.productPrice[index] || '0.00'}</span>
                                                </div>
                                                <div className="flex justify-between text-gray-800">
                                                    <span className="font-medium">Quantity:</span>
                                                    <span>{order.quantity}</span>
                                                </div>
                                                <div className="flex justify-between text-gray-800">
                                                    <span className="font-medium">Total Price:</span>
                                                    <span>${order.totalPrice}</span>
                                                </div>
                                                <div className="flex justify-between text-gray-800">
                                                    <span className="font-medium">Ordered At:</span>
                                                    <span>{new Date(order.purchasedAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrdersPage;