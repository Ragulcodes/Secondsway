import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CreditCard, MapPin, Package, ChevronRight, ArrowLeft } from 'lucide-react';

const OrderPage = () => {
    const location = useLocation();
    const { product } = location.state;
    
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle order submission logic here
        console.log('Order placed:', formData);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50">
            {/* Back Button */}
            <button 
                onClick={() => window.history.back()} 
                className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Product
            </button>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Order Form */}
                <div className="md:col-span-2">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Shipping Information */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center gap-2 mb-4">
                                <MapPin className="w-5 h-5 text-blue-600" />
                                <h2 className="text-xl font-semibold">Shipping Information</h2>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        State
                                    </label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        ZIP Code
                                    </label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Information */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center gap-2 mb-4">
                                <CreditCard className="w-5 h-5 text-blue-600" />
                                <h2 className="text-xl font-semibold">Payment Information</h2>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Card Number
                                    </label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={formData.cardNumber}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Expiry Date
                                    </label>
                                    <input
                                        type="text"
                                        name="expiryDate"
                                        placeholder="MM/YY"
                                        value={formData.expiryDate}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        CVV
                                    </label>
                                    <input
                                        type="text"
                                        name="cvv"
                                        value={formData.cvv}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="md:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        <div className="space-y-4">
                            {/* Product Details */}
                            <div className="flex gap-4">
                                <img 
                                    src={`https://secondsway-server.onrender.com${product.images[0]}`}
                                    alt={product.name}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                                <div>
                                    <h3 className="font-medium">{product.name}</h3>
                                    <p className="text-gray-600">Quantity: 1</p>
                                    <p className="text-blue-600 font-medium">${product.price}</p>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${product.price}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                                    <span>Total</span>
                                    <span>${product.price}</span>
                                </div>
                            </div>

                            {/* Place Order Button */}
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                            >
                                Place Order
                                <ChevronRight className="w-5 h-5" />
                            </button>

                            {/* Shipping Info */}
                            <div className="flex items-center gap-2 text-gray-600 text-sm mt-4">
                                <Package className="w-4 h-4" />
                                <span>Free shipping worldwide</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;