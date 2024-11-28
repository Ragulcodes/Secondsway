import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import { Heart, Share2, Clock, ArrowRight, User, Star, Shield, MapPin, Phone, Mail } from 'lucide-react';

const BiddingPd = () => {
  const location = useLocation();

  const productId = location.state?._id;
  const [product, setProduct] = useState({});
  const [bidDuration, setBidDuration] = useState({ days: 0, hours: 0, minutes: 0 });
  const [bidStartsAt, setBidStartsAt] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isAuctionStarted, setIsAuctionStarted] = useState(false);
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);
  const [currentBid, setCurrentBid] = useState(0);
  const [bidInput, setBidInput] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [biddingHistory, setBiddingHistory] = useState([]);

  console.log(timeLeft,"timeLeft");
  console.log(bidStartsAt,"bidStartsAt");
  console.log(bidDuration,"bidDuration");
  

  const [activeTab, setActiveTab] = useState('About Product');
  const tabs = ['About Product', 'Bid History', 'Seller Info'];

  const userID = localStorage.getItem('userId');
  
  useEffect(() => {
    // Fetch product details based on ID
    const fetchProductDetails = async () => {
      try {
        const response = await axiosInstance.get(`/biddables/bidProductDetails/${productId}`);
        const fetchedProduct = response.data;
        setProduct(fetchedProduct);
        setBidDuration(fetchedProduct.bidDuration);
        setBidStartsAt(new Date(fetchedProduct.bidStartsAt));
        setIsAuctionEnded(fetchedProduct.endedBid);
        setCurrentBid(fetchedProduct.highestBid || 0);
        setBidInput(fetchedProduct.highestBid ? fetchedProduct.highestBid + 10 : fetchedProduct.basePrice + 10);
        setBiddingHistory(fetchedProduct.biddingHistory || []);

        const now = new Date();

        const bidStartTime = new Date(fetchedProduct.bidStartsAt);
        console.log(bidStartTime,"bidStartTime")
        const bidEndTime = new Date(
          bidStartTime.getTime() +
            fetchedProduct.bidDuration.days * 24 * 60 * 60 * 1000 +
            fetchedProduct.bidDuration.hours * 60 * 60 * 1000 +
            fetchedProduct.bidDuration.minutes * 60 * 1000
        );

        setIsAuctionStarted(now >= bidStartTime);
        setIsAuctionEnded(now >= bidEndTime);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (productId) fetchProductDetails();
  }, [productId]);



  useEffect(() => {
    if (!bidStartsAt || !bidDuration) return;
  
    const calculateTimeLeft = () => {
      const now = new Date(); // Current time
      const startTime = new Date(bidStartsAt); // Auction start time
  
      // Calculate accurate end time using the duration provided
      const endTime = new Date(
        startTime.getTime() +
        (bidDuration.days || 0) * 24 * 60 * 60 * 1000 +
        (bidDuration.hours || 0) * 60 * 60 * 1000 +
        (bidDuration.minutes || 0) * 60 * 1000
      );

      console.log(endTime, "endTime")
  
      // If the auction hasn't started yet
      if (now < startTime) {
        setIsAuctionStarted(false);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
  
      // If the auction has ended
      if (now >= endTime) {
        setIsAuctionStarted(true);
        setIsAuctionEnded(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
  
      // Auction is ongoing
      setIsAuctionStarted(true);
      setIsAuctionEnded(false);
  
      // Calculate the remaining time
      const difference = endTime - now;
  
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
  
      return { days, hours, minutes, seconds };
    };
  
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
      console.log(timeLeft,"timeLeft");
      console.log(isAuctionEnded,"isAuctionEnded");
      console.log(isAuctionStarted,"isAuctionStarted");
    }, 1000);
  
    return () => clearInterval(timer);
  }, [bidStartsAt, bidDuration]);
  
  
  
  

  const handleBid = async () => {

    setError(null);
    setIsLoading(true);

    const bidAmount = parseFloat(bidInput);

    if (isAuctionEnded || bidAmount <= currentBid || isNaN(bidAmount)) {
      setError("Invalid bid amount or auction has ended.");
      setIsLoading(false);
      return;
    }
  
    console.log("Product ID in handleBid:", productId); // Debugging
  
    try {
      const response = await axiosInstance.put(`/biddables/biddableProducts/bid/${productId}`, {
        userId: userID, 
        amount: bidAmount, 
      });
  
      if (response.data.success) {
        setCurrentBid(bidAmount);
        setBidInput(bidAmount + 10);
        setBiddingHistory(response.data.product.biddingHistory);
        alert("Bid placed successfully!");
        window.location.reload();
      }
    }catch (error) {
      console.error("Error details:", error.response || error);
      setError(
        error.response?.data?.message || 
        "Failed to place bid. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };



  // related product fetch
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axiosInstance.get('/biddables/biddableProducts');
        setRelatedProducts(response.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchRelatedProducts();
  }, []);


  // Add a component to display bidding history
  const BiddingHistory = () => {
    return (
      <div className="w-full">
        {biddingHistory.length > 0 ? (
          <div className="space-y-3">
            {biddingHistory.map((bid, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-lg hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">
                      {bid.userId.name.toUpperCase() || 'Anonymous'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date().toLocaleDateString()} {/* Replace with actual bid timestamp */}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="px-4 py-2 bg-green-50 rounded-lg">
                    <span className="text-sm font-bold text-green-600">
                      ${bid.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No Bids Yet</h3>
            <p className="text-gray-500">Be the first one to place a bid!</p>
          </div>
        )}
      </div>
    );
  };




  const SellerCard = () => {
    return (
      <div className="bg-gray-50 p-4 rounded-lg col-span-2">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
              <User className="w-5 h-5" />
              <span className="font-medium">Seller</span>
          </div>
          <div className="flex items-center gap-4">
              <div>
                  <p className="text-gray-900 font-medium">{product.user?.name.toUpperCase() || 'Anonymous'}</p>
              </div>
          </div>
      </div>
    );
  };
  

  return (
    <div className="max-w-6xl mx-auto p-2">
      
      {/* Breadcrumb */}
      <nav className="mb-8">
          <ol className="flex text-sm text-gray-500">
              <li className="hover:text-gray-700">
                  <a href="/">Home</a>
              </li>
              <li className="mx-2">/</li>
              <li className="hover:text-gray-700">
                  <a href="/bidables">Biddables</a>
              </li>
              <li className="mx-2">/</li>
              <li className="text-gray-900">{product.title}</li>
          </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Images */}
        <div className="space-y-4">
          <div className="relative">
            <img
              src={`https://secondsway-server.onrender.com${product.image}`}
              alt={product.title}
              className="w-full rounded-lg"
              onError={(e) => (e.target.src = '/default-image.jpg')} 
            />
            {!isAuctionEnded && (
              <div className="absolute top-4 left-4 bg-yellow-400 px-2 py-1 text-sm">
                {isAuctionStarted ? 'BIDDING ACTIVE' : 'UPCOMING'}
              </div>
            )}
            {isAuctionEnded && (
              <div className="absolute top-4 left-4 bg-yellow-400 px-2 py-1 text-sm">
                BIDDING ENDED
              </div>
            )}
          </div>

          
          {/* Timer */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {isAuctionEnded ? "AUCTION ENDED" : "BIDDING ENDS IN"}
            </div>
            {!isAuctionEnded  ? (
              <div className="grid grid-cols-4 gap-4 text-center">
                {Object.entries(timeLeft).map(([key, value]) => (
                  <div key={key} className="bg-white p-2 rounded shadow-sm">
                    <div className="text-xl font-bold">{value}</div>
                    <div className="text-xs text-gray-500">{key.toUpperCase()}</div>
                  </div>
                ))}
              </div>
            ):(
              <div className="text-xl font-semibold text-red-500">Auction has ended.</div>
            )}
          </div>
          
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <h1 className="text-2xl font-bold mb-6">{product.title}</h1>
          <p className="text-gray-600">{product.description}</p>

          <SellerCard />
          
          <div className="border-t border-b py-4">
            <p className="text-lg">
              Base Price: <span className="font-bold">${product.basePrice?.toLocaleString()}</span>
            </p>
            <p className="text-lg">
              Current bid: <span className="font-bold">${product.highestBid?.toLocaleString()}</span>
            </p>
          </div>


          {/* Bid Input and Button */}
          {!isAuctionStarted ? (
              <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg text-center">
                <span>Bidding Not Yet Started</span>
              </div>
            ) : isAuctionEnded ? (
              <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center">
                <span>Auction Has Ended</span>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="number"
                    className="border rounded-lg p-2 w-full"
                    value={bidInput}
                    onChange={(e) => setBidInput(e.target.value)}
                    disabled={isLoading || isAuctionEnded}
                  />
                  <button
                    onClick={handleBid}
                    className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
                    disabled={isLoading || isAuctionEnded}
                  >
                    {isLoading ? "Placing..." : "Place Bid"}
                  </button>
                </div>
                {error && <div className="text-red-500 text-sm">{error}</div>}
              </div>
            )}

        </div>

      </div>

      {/* Additional Info Tabs */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex gap-8 border-b">
          {tabs.map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-2 font-medium transition-colors relative ${
                activeTab === tab ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></span>
              )}
            </button>
          ))}
        </div>
        <div className="py-6">
          {activeTab === 'About Product' && <p className="text-gray-600 leading-relaxed">{product.description}</p>}
          {activeTab === 'Bid History' && <BiddingHistory />}
          {activeTab === 'Seller Info' && <p>Seller info content goes here.</p>}
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md">
              <img src={`https://secondsway-server.onrender.com${item.image}`} alt={item.title} className="w-full h-48 object-cover rounded-t-lg" onError={(e) => (e.target.src = '/default-image.jpg')}  />
              <div className="p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-orange-500"> ${item.basePrice.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BiddingPd;