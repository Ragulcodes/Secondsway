import React, { useState, useEffect } from 'react';
import { Clock, Heart, TrendingUp   } from 'lucide-react';
import axiosInstance from '../axiosInstance';
import { Link } from 'react-router-dom';
import Timer from '../components/timer';


const BiddingProducts = () => {
  const [listings, setListings] = useState([]);

  const updateAuctionState = (listingId, isStarted, isEnded) => {
    setListings((prevListings) =>
      prevListings.map((listing) =>
        listing._id === listingId
          ? { ...listing, isAuctionStarted: isStarted, isAuctionEnded: isEnded }
          : listing
      )
    );
  };


  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axiosInstance.get('/biddables/biddableProducts');
        // setListings(response.data);
        setListings(response.data.map((listing) => ({
          ...listing,
          isAuctionStarted: false,
          isAuctionEnded: false,
        })));
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);


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
                src={`https://secondsway-server.onrender.com${listing.image}`}  
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

                <h3 className="text-xl font-semibold mb-4">{listing.title}</h3>

                <div className="space-y-2">
                  <div className="text-gray-600">
                    Base Price: <span className="font-semibold">${listing.basePrice.toLocaleString()}</span>
                  </div>
                  <div className="text-gray-600">
                    {listing.isAuctionEnded ? "Final Bid: " : "Current Bid: "}
                    <span className="font-semibold">${listing.highestBid.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-8 mb-4">
                {listing.isAuctionEnded ? "" :(
                  <>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Flash Sale Ends In</span>
                    </div>
                    
                    <Timer
                        bidStartsAt={listing.bidStartsAt}
                        bidDuration={listing.bidDuration}
                        onAuctionStateChange={(isStarted, isEnded) =>
                          updateAuctionState(listing._id, isStarted, isEnded)
                        }
                    />
                  </>
                )}
                </div>
              </div>
          
              {listing.isAuctionEnded ? (
                <div className="mt-4 text-red-500 font-bold text-center">Bidding has Ended!</div>
              ) : (
              <>
              <button
                  className={`mt-4 inline-flex items-center justify-center gap-2 ${
                    listing.isAuctionEnded || !listing.isAuctionStarted
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  } font-semibold py-2 px-8 rounded-lg transition`}
                  disabled={!listing.isAuctionStarted || listing.isAuctionEnded}
                >
                Bid Now
                <TrendingUp className="w-4 h-4" />
              </button>
              <Link
                to={`/bidProduct/${listing._id}`}
                state={listing}  // Pass product details to the next page via state
                className="mt-4 inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-700 font-semibold py-2 px-8 rounded-lg hover:bg-gray-300 transition"
              >
                View Details
              </Link>
              </>
              )}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default BiddingProducts;
