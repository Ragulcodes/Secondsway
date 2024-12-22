// import React, { useState } from 'react';
// import axiosInstance from '../axiosInstance';
// import { useLocation } from 'react-router-dom';
// import { CreditCard, MapPin, Package, ChevronRight, ArrowLeft } from 'lucide-react';

// const OrderPage = () => {
//     const location = useLocation();
//     const { product } = location.state;

//     const username = localStorage.getItem('username');
//     const email = localStorage.getItem('email');

//     const [formData, setFormData] = useState({
//         fullName: username || '',
//         email: email || '',
//         address: '',
//         city: '',
//         state: '',
//         zipCode: '',
//         cardNumber: '',
//         expiryDate: '',
//         cvv: ''
//     });

//     console.log(product);



//     const [paymentMethod, setPaymentMethod] = useState('COD'); // Default to Cash on Delivery

//     const handleInputChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         // Construct the order details to match the backend structure
//         const orderDetails = {
//             ...formData,
//             paymentMethod,
//             productId: product._id,
//             price: product.price, // Extract price directly
//             quantity: product.quantity || 1, // Default to 1 if quantity not provided
//         };
        
    
//         console.log(product.price);
//         console.log(product._id);
//         console.log(localStorage.getItem('token'));
        
//         try {
//             const response = await axiosInstance.post('/orders/place-order', orderDetails, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure token is passed for authentication
//                     'Content-Type': 'application/json',
//                 },
//             });
//             console.log('Order placed:', response.data);
//             console.log('Request Headers:', response.config.headers);
//             // Redirect or show confirmation as needed
//         } catch (error) {
//             console.error('Error placing order:', error);
//             // Handle error appropriately (e.g., show error message)
//         }
//     };
    

//     return (
//         <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50">
//             {/* Back Button */}
//             <button 
//                 onClick={() => window.history.back()} 
//                 className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
//             >
//                 <ArrowLeft className="w-5 h-5 mr-2" />
//                 Back to Product
//             </button>

//             <div className="grid md:grid-cols-3 gap-8">
//                 {/* Order Form */}
//                 <div className="md:col-span-2">
//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         {/* Shipping Information */}
//                         <div className="bg-white p-6 rounded-lg shadow-md">
//                             <div className="flex items-center gap-2 mb-4">
//                                 <MapPin className="w-5 h-5 text-blue-600" />
//                                 <h2 className="text-xl font-semibold">Shipping Information</h2>
//                             </div>
//                             <div className="grid grid-cols-2 gap-4">
//                                 {/* Name and Email */}
//                                 <div className="col-span-2">
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Full Name
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="fullName"
//                                         value= {username}
//                                         onChange={handleInputChange}
//                                         className="w-full p-2 border rounded-md"
//                                     />
//                                 </div>
//                                 <div className="col-span-2">
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Email
//                                     </label>
//                                     <input
//                                         type="email"
//                                         name="email"
//                                         value={email}
//                                         onChange={handleInputChange}
//                                         className="w-full p-2 border rounded-md"
//                                     />
//                                 </div>

//                                 {/* Mobile Number */}
//                                 <div className="col-span-2">
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Mobile Number
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="mobileNumber"
//                                         value={formData.mobileNumber}
//                                         onChange={handleInputChange}
//                                         className="w-full p-2 border rounded-md"
//                                         required
//                                     />
//                                 </div>

//                                 {/* Address Fields */}
//                                 <div className="col-span-2">
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Address
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="address"
//                                         value={formData.address}
//                                         onChange={handleInputChange}
//                                         className="w-full p-2 border rounded-md"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         City
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="city"
//                                         value={formData.city}
//                                         onChange={handleInputChange}
//                                         className="w-full p-2 border rounded-md"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         State
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="state"
//                                         value={formData.state}
//                                         onChange={handleInputChange}
//                                         className="w-full p-2 border rounded-md"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         ZIP Code
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="zipCode"
//                                         value={formData.zipCode}
//                                         onChange={handleInputChange}
//                                         className="w-full p-2 border rounded-md"
//                                         required
//                                     />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Payment Method */}
//                         <div className="bg-white p-6 rounded-lg shadow-md">
//                             <div className="flex items-center gap-2 mb-4">
//                                 <CreditCard className="w-5 h-5 text-blue-600" />
//                                 <h2 className="text-xl font-semibold">Payment Method</h2>
//                             </div>
//                             <div className="flex gap-4">
//                                 <label className="flex items-center gap-2">
//                                     <input
//                                         type="radio"
//                                         name="paymentMethod"
//                                         value="COD"
//                                         checked ={paymentMethod === 'COD'}
//                                         onChange={() => setPaymentMethod('COD')}
//                                     />
//                                     <span>Cash on Delivery</span>
//                                 </label>
//                                 <label className="flex items-center gap-2" >
//                                     <input
//                                         type="radio"
//                                         name="paymentMethod"
//                                         value="Razorpay"
//                                         checked={paymentMethod === 'Razorpay'}
//                                         onChange={() => setPaymentMethod('Razorpay')}
//                                         disabled
//                                     />
//                                     <span>Pay with Razorpay</span>
//                                 </label>
//                             </div>
//                         </div>

//                         {/* Razorpay Details (Render only if Razorpay is selected) */}
//                         {paymentMethod === 'Razorpay' && (
//                             <div className="bg-white p-6 rounded-lg shadow-md">
//                                 <div className="grid grid-cols-2 gap-4">
//                                     <div className="col-span-2">
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                                             Card Number
//                                         </label>
//                                         <input
//                                             type="text"
//                                             name="cardNumber"
//                                             value={formData.cardNumber}
//                                             onChange={handleInputChange}
//                                             className="w-full p-2 border rounded-md"
//                                             required
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                                             Expiry Date
//                                         </label>
//                                         <input
//                                             type="text"
//                                             name="expiryDate"
//                                             placeholder="MM/YY"
//                                             value={formData.expiryDate}
//                                             onChange={handleInputChange}
//                                             className="w-full p-2 border rounded-md"
//                                             required
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                                             CVV
//                                         </label>
//                                         <input
//                                             type="text"
//                                             name="cvv"
//                                             value={formData.cvv}
//                                             onChange={handleInputChange}
//                                             className="w-full p-2 border rounded-md"
//                                             required
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </form>
//                 </div>

//                 {/* Order Summary */}
//                 <div className="md:col-span-1">
//                     <div className="bg-white p-6 rounded-lg shadow-md">
//                         <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//                         <div className="space-y-4">
//                             {/* Product Details */}
//                             <div className="flex gap-4">
//                                 <img 
//                                     src={`https://secondsway-server.onrender.com${product.images[0]}`}
//                                     alt={product.name}
//                                     className="w-20 h-20 object-cover rounded-md"
//                                 />
//                                 <div>
//                                     <h3 className="font-medium">{product.name}</h3>
//                                     <p className="text-gray-600">Quantity: 1</p>
//                                     <p className="text-blue-600 font-medium">${product.price}</p>
//                                 </div>
//                             </div>

//                             {/* Price Breakdown */}
//                             <div className="border-t pt-4 space-y-2">
//                                 <div className="flex justify-between text-gray-600">
//                                     <span>Subtotal</span>
//                                     <span>${product.price}</span>
//                                 </div>
//                                 <div className="flex justify-between text-gray-600">
//                                     <span>Shipping</span>
//                                     <span>Free</span>
//                                 </div>
//                                 <div className="flex justify-between font-semibold text-lg pt-2 border-t">
//                                     <span>Total</span>
//                                     <span>${product.price}</span>
//                                 </div>
//                             </div>

//                             {/* Place Order Button */}
//                             <button
//                                 type="submit"
//                                 onClick={handleSubmit}
//                                 className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
//                             >
//                                 Place Order
//                                 <ChevronRight className="w-5 h-5" />
//                             </button>

//                             {/* Shipping Info */}
//                             <div className="flex items-center gap-2 text-gray-600 text-sm mt-4">
//                                 <Package className="w-4 h-4" />
//                                 <span>Free shipping worldwide</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default OrderPage;



import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, Package, ChevronRight, ArrowLeft } from 'lucide-react';

const OrderPage = () => {
    const location = useLocation();
    const { product } = location.state;
    const navigate = useNavigate();

    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    const [formData, setFormData] = useState({
        fullName: username || '',
        email: email || '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('COD'); // Default to Cash on Delivery
    const [orderSuccess, setOrderSuccess] = useState(false); // Track order status

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const orderDetails = {
            ...formData,
            paymentMethod,
            products: [
                {
                    productId: product._id,
                    price: product.price,
                    quantity: product.quantity || 1, // Default to 1 if quantity not provided
                },
            ],
        };

        try {
            const response = await axiosInstance.post('/orders/place-order', orderDetails, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('Order placed:', response.data);
            setOrderSuccess(true); // Set success flag
            setTimeout(() => {
                navigate('/MyOrders'); // Redirect after 2 seconds
            }, 2000);
        } catch (error) {
            console.error('Error placing order:', error);
        }
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
                                {/* Name and Email */}
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={username}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>

                                {/* Mobile Number */}
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Mobile Number
                                    </label>
                                    <input
                                        type="text"
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>

                                {/* Address Fields */}
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

                        {/* Payment Method */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center gap-2 mb-4">
                                <CreditCard className="w-5 h-5 text-blue-600" />
                                <h2 className="text-xl font-semibold">Payment Method</h2>
                            </div>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="COD"
                                        checked={paymentMethod === 'COD'}
                                        onChange={() => setPaymentMethod('COD')}
                                    />
                                    <span>Cash on Delivery</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="Razorpay"
                                        checked={paymentMethod === 'Razorpay'}
                                        onChange={() => setPaymentMethod('Razorpay')}
                                        disabled
                                    />
                                    <span>Pay with Razorpay</span>
                                </label>
                            </div>
                        </div>

                        {/* Razorpay Details (Render only if Razorpay is selected) */}
                        {paymentMethod === 'Razorpay' && (
                            <div className="bg-white p-6 rounded-lg shadow-md">
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
                        )}
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
                            <div className="flex items-center gap-2 mt-6">
                                <MapPin className="w-5 h-5 text-blue-600" />
                                <span>{formData.address}, {formData.city}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Notification */}
            {orderSuccess && (
                <div className="fixed top-0 left-0 right-0 bg-green-500 text-white py-3 text-center">
                    <p>Order placed successfully! Redirecting to My Orders...</p>
                </div>
            )}
        </div>
    );
};

export default OrderPage;


