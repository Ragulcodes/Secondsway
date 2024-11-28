import React from 'react';
import { useLocation,useNavigate  } from 'react-router-dom';
import { Heart, Share2, ShoppingCart, Tag, Box, User, Truck, Shield } from 'lucide-react';

const ProductDetails = () => {
    const location = useLocation();
    const { product } = location.state;

    const navigate = useNavigate();


    return (
        <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50">
            {/* Breadcrumb */}
            <nav className="mb-8">
                <ol className="flex text-sm text-gray-500">
                    <li className="hover:text-gray-700">
                        <a href="/">Home</a>
                    </li>
                    <li className="mx-2">/</li>
                    <li className="hover:text-gray-700">
                        <a href="/products">Products</a>
                    </li>
                    <li className="mx-2">/</li>
                    <li className="text-gray-900">{product.name}</li>
                </ol>
            </nav>

            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-900">{product.name}</h1>
                
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Image Section */}
                    <div className="relative">
                        <div className="bg-yellow-400 text-black px-4 py-2 absolute top-4 left-4 text-sm font-semibold rounded-md shadow-sm">
                            NO RESERVE
                        </div>
                        
                        {product.isAuctionEnded && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                                <div className="bg-white p-6 rounded-lg text-center shadow-xl">
                                    <p className="font-bold text-xl text-gray-900">Auction Ended</p>
                                </div>
                            </div>
                        )}
                        
                        <img 
                            src={`https://secondsway-server.onrender.com${product.images[0]}`} 
                            alt={product.name}
                            className="w-full h-[500px] rounded-lg object-cover shadow-md"
                        />
                        
                        {/* Image Navigation Dots */}
                        <div className="flex justify-center mt-4 gap-2">
                            {product.images?.map((_, i) => (
                                <button 
                                    key={i} 
                                    className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-blue-600' : 'bg-gray-300'}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col">
                        <div className="flex-grow">
                            {/* Price and Actions */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900">
                                        ${product.price}
                                    </h2>
                                </div>
                                
                                <div className="flex gap-3">
                                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                        <Heart className="w-6 h-6 text-gray-600" />
                                    </button>
                                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                        <Share2 className="w-6 h-6 text-gray-600" />
                                    </button>
                                </div>
                            </div>

                            {/* Product Information Grid */}
                            <div className="grid grid-cols-2 gap-6 mb-8">
                                {/* Category */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                                        <Tag className="w-5 h-5" />
                                        <span className="font-medium">Category</span>
                                    </div>
                                    <p className="text-gray-900">{product.category}</p>
                                </div>

                                {/* Condition */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                                        <Box className="w-5 h-5" />
                                        <span className="font-medium">Condition</span>
                                    </div>
                                    <p className="text-gray-900">{product.condition || 'New'}</p>
                                </div>

                                {/* Seller Information */}
                                <div className="bg-gray-50 p-4 rounded-lg col-span-2">
                                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                                        <User className="w-5 h-5" />
                                        <span className="font-medium">Seller Information</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <p className="text-gray-900 font-medium">{product.user?.name || 'Anonymous'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="prose prose-lg max-w-none mb-8">
                                <h3 className="text-lg font-semibold mb-3">Description</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Shipping and Warranty */}
                            <div className="bg-gray-50 rounded-lg p-6 mb-8">
                                <h3 className="font-semibold text-lg mb-4">Additional Information</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Truck className="w-5 h-5" />
                                        <span>Free Shipping Worldwide</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Shield className="w-5 h-5" />
                                        <span>1 Year Warranty</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button 
                                onClick={() => navigate('/order', { state: { product } })}
                                className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Buy Now
                            </button>
                            <button className="flex-1 border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Info Tabs */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex gap-8 border-b">
                    {['Description', 'Additional Information', 'Reviews', 'Shipping'].map((tab, index) => (
                        <button 
                            key={tab}
                            className={`py-4 px-2 font-medium transition-colors relative ${
                                index === 0 
                                    ? 'text-blue-600' 
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab}
                            {index === 0 && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></span>
                            )}
                        </button>
                    ))}
                </div>
                
                <div className="py-6">
                    <p className="text-gray-600 leading-relaxed">
                        {product.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;