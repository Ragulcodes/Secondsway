import React, { useState, useEffect } from 'react';
import { Heart, Share2, Clock, ArrowRight, Lock } from 'lucide-react';
import { MinusCircle, PlusCircle } from 'lucide-react';

// Simple Card Components
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

const BiddingPd = () => {
  // Initial time in seconds (3 months + 17 days + 23 hours + 6 minutes)
  const initialTime = {
    months: 3,
    weeks: 0,
    days: 17,
    hours: 23,
    minutes: 6,
    seconds: 0
  };

  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);
  const [currentBid, setCurrentBid] = useState(270.00);
  const [bidInput, setBidInput] = useState(280.00);

  // Convert the initial time to total seconds for countdown
  const calculateTotalSeconds = (time) => {
    return (
      time.months * 30 * 24 * 60 * 60 +
      time.weeks * 7 * 24 * 60 * 60 +
      time.days * 24 * 60 * 60 +
      time.hours * 60 * 60 +
      time.minutes * 60 +
      time.seconds
    );
  };

  // Convert seconds back to time units
  const calculateTimeUnits = (totalSeconds) => {
    const months = Math.floor(totalSeconds / (30 * 24 * 60 * 60));
    const remainingAfterMonths = totalSeconds % (30 * 24 * 60 * 60);
    
    const weeks = Math.floor(remainingAfterMonths / (7 * 24 * 60 * 60));
    const remainingAfterWeeks = remainingAfterMonths % (7 * 24 * 60 * 60);
    
    const days = Math.floor(remainingAfterWeeks / (24 * 60 * 60));
    const remainingAfterDays = remainingAfterWeeks % (24 * 60 * 60);
    
    const hours = Math.floor(remainingAfterDays / (60 * 60));
    const remainingAfterHours = remainingAfterDays % (60 * 60);
    
    const minutes = Math.floor(remainingAfterHours / 60);
    const seconds = remainingAfterHours % 60;

    return { months, weeks, days, hours, minutes, seconds };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const totalSeconds = calculateTotalSeconds(timeLeft);
      
      if (totalSeconds <= 0) {
        clearInterval(timer);
        setIsAuctionEnded(true);
        return;
      }

      const newTime = calculateTimeUnits(totalSeconds - 1);
      setTimeLeft(newTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleBid = () => {
    if (isAuctionEnded) return;
    
    const newBid = parseFloat(bidInput);
    if (newBid > currentBid) {
      setCurrentBid(newBid);
      setBidInput((newBid + 10).toFixed(2)); // Increment bid input by $10
    }
  };

  const timeUnits = [
    { value: timeLeft.months, label: 'MONTHS' },
    { value: timeLeft.weeks, label: 'WEEKS' },
    { value: timeLeft.days, label: 'DAYS' },
    { value: timeLeft.hours, label: 'HOURS' },
    { value: timeLeft.minutes, label: 'MINUTES' },
    { value: timeLeft.seconds, label: 'SECONDS' }
  ];

  const relatedProducts = [
    {
      id: 1,
      title: 'Classic American Car',
      price: '$800.00',
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      title: 'Porsche Carrera GT',
      price: '$900.00',
      image: '/api/placeholder/300/200'
    },
    {
      id: 3,
      title: 'Vintage Gearbox',
      price: '$524.00',
      image: '/api/placeholder/300/200'
    },
    {
      id: 4,
      title: 'Audi R8 2008',
      price: '$624.00',
      image: '/api/placeholder/300/200'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Main Product Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Auction Vintage Car</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Image Section */}
          <div className="relative">
            <div className="bg-yellow-400 text-black px-2 py-1 absolute top-4 left-4 text-sm">
              NO RESERVE
            </div>
            {isAuctionEnded && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg text-center">
                  <Lock className="mx-auto mb-2" size={24} />
                  <p className="font-bold">Auction Ended</p>
                </div>
              </div>
            )}
            <img 
              src="/api/placeholder/600/400" 
              alt="Vintage Car"
              className="w-full rounded-lg object-cover"
            />
          </div>

          {/* Details Section */}
          <div>
            <p className="text-gray-600 mb-4">
              The Ragdoll is a cat breed with blue eyes and a distinct colorpoint coat. It is a large and muscular semi-longhair cat with a soft and silky coat. Like all long haired cats, Ragdolls need grooming to ensure their fur does not mat.
            </p>

            <div className="mb-6">
              <h2 className="text-xl font-semibold">Current bid: ${currentBid.toFixed(2)}</h2>
              <p className="text-sm text-gray-500">Item condition: New</p>
            </div>

            {/* Timer */}
            <div className="grid grid-cols-6 gap-2 mb-6 border rounded-lg p-4">
              {timeUnits.map((unit, index) => (
                <div key={index} className="text-center">
                  <div className={`text-xl font-bold ${isAuctionEnded ? 'text-red-500' : ''}`}>
                    {String(unit.value).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-gray-500">{unit.label}</div>
                </div>
              ))}
            </div>

            


{/* Bid Section */}
<div className="flex items-center gap-4 mb-6">
      <div className="relative flex items-center justify-between w-40">
        <button
          className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 ${
            isAuctionEnded ? 'cursor-not-allowed' : ''
          }`}
          onClick={() => setBidInput((prevBid) => Math.max(0, prevBid - 1))}
          disabled={isAuctionEnded || bidInput <= 0}
        >
          <MinusCircle size={20} />
        </button>
        <input
          type="text"
          value={`$${bidInput.toFixed(2)}`}
          onChange={(e) => setBidInput(parseFloat(e.target.value.replace('$', '')))}
          className={`border rounded px-3 py-2 w-full pl-10 ${
            isAuctionEnded ? 'bg-gray-100' : ''
          }`}
          disabled={isAuctionEnded}
        />
        <button
          className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 ${
            isAuctionEnded ? 'cursor-not-allowed' : ''
          }`}
          onClick={() => setBidInput((prevBid) => prevBid + 1)}
          disabled={isAuctionEnded}
        >
          <PlusCircle size={20} />
        </button>
      </div>
      <button
        className={`px-4 py-2 rounded ${
          isAuctionEnded
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-orange-500 hover:bg-orange-600'
        } text-white`}
        onClick={handleBid}
        disabled={isAuctionEnded}
      >
        {isAuctionEnded ? 'ENDED' : 'BID'}
      </button>
      <button
        className={`border px-4 py-2 rounded flex items-center gap-2 ${
          isAuctionEnded
            ? 'border-gray-400 text-gray-400 cursor-not-allowed'
            : 'border-orange-500 text-orange-500 hover:bg-orange-50'
        }`}
        disabled={isAuctionEnded}
      >
        Bid now
      </button>
    </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Heart size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b mb-8">
        <div className="flex gap-8 overflow-x-auto">
          {['DESCRIPTION', 'ADDITIONAL INFORMATION', 'AUCTION HISTORY', 'REVIEWS (0)', 'MORE FROM VENDOR'].map((tab, index) => (
            <button 
              key={index}
              className={`py-2 px-4 whitespace-nowrap ${index === 0 ? 'border-b-2 border-orange-500' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-xl font-bold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map((product) => (
            <Card key={product.id}>
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <button className="absolute top-2 right-2 p-1 bg-white rounded-full">
                  <Heart size={16} />
                </button>
              </div>
              <CardContent>
                <h3 className="font-semibold">{product.title}</h3>
                <p className="text-orange-500">{product.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BiddingPd;


