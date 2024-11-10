import React, { useState, useEffect } from 'react';
import { Clock, Heart, TrendingUp   } from 'lucide-react';
import axiosInstance from '../axiosInstance';

const Timer = ({ initialTime }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4">
      <div className="text-center">
        <div className="font-mono text-lg font-bold bg-gray-50 px-3 py-2 rounded-lg shadow-sm">
          {timeLeft.days}
        </div>
        <div className="text-xs text-gray-500 mt-1">Days</div>
      </div>
      <div className="text-center">
        <div className="font-mono text-lg font-bold bg-gray-50 px-3 py-2 rounded-lg shadow-sm">
          {timeLeft.hours.toString().padStart(2, '0')}
        </div>
        <div className="text-xs text-gray-500 mt-1">Hrs</div>
      </div>
      <div className="text-center">
        <div className="font-mono text-lg font-bold bg-gray-50 px-3 py-2 rounded-lg shadow-sm">
          {timeLeft.minutes.toString().padStart(2, '0')}
        </div>
        <div className="text-xs text-gray-500 mt-1">Min</div>
      </div>
      <div className="text-center">
        <div className="font-mono text-lg font-bold bg-gray-50 px-3 py-2 rounded-lg shadow-sm">
          {timeLeft.seconds.toString().padStart(2, '0')}
        </div>
        <div className="text-xs text-gray-500 mt-1">Sec</div>
      </div>
    </div>
  );
};

const BiddingProducts = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axiosInstance.get('/biddables/biddableProducts');
        setListings(response.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  const recentItems = [
    { id: 1, title: "Luxury Sunglasses", price: "$240.00", status: "New Arrival", image: "/api/placeholder/60/60" },
    { id: 2, title: "Designer Scarf", price: "$180.00", status: "Limited Stock", image: "/api/placeholder/60/60" },
    { id: 3, title: "Premium Watch", price: "$899.00", status: "Best Seller", image: "/api/placeholder/60/60" },
    { id: 4, title: "Leather Belt", price: "$120.00", status: "Sale", image: "/api/placeholder/60/60" },
    { id: 5, title: "Designer Wallet", price: "$150.00", status: "Trending", image: "/api/placeholder/60/60" }
  ];

  const categories = [
    "Accessories", "Bags & Wallets", "Clothing", "Dresses", "Footwear", 
    "Jewelry", "Men's Fashion", "Outerwear", "Scarves & Wraps", 
    "Sunglasses", "Watches", "Women's Fashion", "Winter Collection", 
    "Summer Essentials"
  ];

  const tags = ["New Arrivals", "Sale", "Premium", "Trending"];

  return (
    <div className="max-w-7xl mx-auto p-4 bg-gray-50">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
         <div className="w-full lg:w-64 space-y-8">
          
          {/* <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">New Arrivals</h2>
            <div className="space-y-4">
              {recentItems.map((item) => (
                <div key={item.id} className="flex gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover shadow-sm"
                  />
                  <div>
                    <h3 className="text-sm font-medium">{item.title}</h3>
                    <p className="text-xs text-gray-500">{item.status}</p>
                    <p className="text-sm font-semibold">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>  */}

          {/* Product Categories */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm hover:bg-gray-50 block px-2 py-1 rounded transition-colors">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Tags */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Trending Tags</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <a
                  key={tag}
                  href="#"
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-gray-200 shadow-sm transition-colors"
                >
                  {tag}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
        {listings.map((listing) => (
          <div key={listing._id} className="flex flex-col md:flex-row gap-6 bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
            {/* Image container with fixed aspect ratio */}
            <div className="relative w-full md:w-72 aspect-[4/3] rounded-lg overflow-hidden shadow-md">
              <img
                src={`http://localhost:5000${listing.image}`}  
                // https://ibid.modeltheme.com/automotive/wp-content/uploads/2018/09/sport-car2.jpg
                alt={listing.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 space-y-2">
                <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Content container */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-8 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Flash Sale Ends In</span>
                  </div>
                  <Timer initialTime={listing.timeLeft} />
                </div>
                <h3 className="text-xl font-semibold mb-4">{listing.title}</h3>
                <div className="space-y-2">
                  <div className="text-gray-600">
                    Base Price: <span className="font-semibold">${listing.basePrice.toLocaleString()}</span>
                  </div>
                  <div className="text-gray-600">
                    Current Bid: <span className="font-semibold">${listing.currentBid.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <button className="mt-4 inline-flex items-center justify-center gap-2 bg-blue-500 text-white font-semibold py-2 px-8 rounded-lg hover:bg-blue-600 transition">
                <TrendingUp className="w-4 h-4" />
                Bid
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default BiddingProducts;
