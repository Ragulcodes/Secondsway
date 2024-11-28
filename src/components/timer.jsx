import React, { useState, useEffect } from 'react';

const Timer = ({ bidStartsAt, bidDuration, onAuctionStateChange  }) => {
  // State to track time left and auction status
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isAuctionStarted, setIsAuctionStarted] = useState(false);
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);

  useEffect(() => {
    if (!bidStartsAt || !bidDuration) return;

    const calculateTimeLeft = () => {
      const now = new Date(); // Current time
      const startTime = new Date(bidStartsAt); // Auction start time

      // Calculate accurate end time using the duration provided
      const endTime = new Date(
        startTime.getTime() +
        (bidDuration?.days || 0) * 24 * 60 * 60 * 1000 +
        (bidDuration?.hours || 0) * 60 * 60 * 1000 +
        (bidDuration?.minutes || 0) * 60 * 1000
      );

      // If the auction hasn't started yet
      if (now < startTime) {
        setIsAuctionStarted(false);
        onAuctionStateChange(false, false); // Notify parent
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      // If the auction has ended
      if (now >= endTime) {
        setIsAuctionStarted(true);
        setIsAuctionEnded(true);
        onAuctionStateChange(true, true); // Notify parent
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      // Auction is ongoing
      setIsAuctionStarted(true);
      setIsAuctionEnded(false);
      onAuctionStateChange(true, false); // Notify parent

      // Calculate the remaining time
      const difference = endTime - now;
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return { days, hours, minutes, seconds };
    };

    // Update the timer every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [bidStartsAt, bidDuration,onAuctionStateChange]);

  // Handle invalid input or expired timer
  if (!timeLeft) {
    return (
      <div className="text-red-500 font-bold">
        Invalid start time or duration.
      </div>
    );
  }

  if (isAuctionEnded) {
    return (
      <div className="text-green-500 font-bold">
        The bid session has ended.
      </div>
    );
  }

  if (!isAuctionStarted) {
    return (
      <div className="text-yellow-500 font-bold">
        The bid session has not started yet.
      </div>
    );
  }

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

export default Timer;
