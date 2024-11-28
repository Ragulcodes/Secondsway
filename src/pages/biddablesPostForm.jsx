import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';

function BiddablesPostForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    basePrice: '',
    currentBid: '',
    // timeLeft: { days: '', hours: '', minutes: '', seconds: '' },
    bidStartsAt: '',
    bidDuration: { days: '', hours: '', minutes: '' },
    startBid: true,
    endedBid: false,
  });
  
  // Separate state for image file
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (name.includes("timeLeft") || name.includes("bidDuration")) {
      const [field, key] = name.split(".");
      setFormData({
        ...formData,
        [field]: { ...formData[field], [key]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let imageUrl = '';
      
      // First, upload the image if one is selected
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        
        const imageUploadResponse = await axiosInstance.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        imageUrl = imageUploadResponse.data.imageUrl;
      }
      
      // Prepare the form data to be sent to the backend
      const payload = {
        title: formData.title,
        description: formData.description,
        image: imageUrl, // Use the uploaded image URL
        basePrice: Number(formData.basePrice),
        currentBid: Number(formData.currentBid),
        // timeLeft: {
        //   days: Number(formData.timeLeft.days),
        //   hours: Number(formData.timeLeft.hours),
        //   minutes: Number(formData.timeLeft.minutes),
        //   seconds: Number(formData.timeLeft.seconds),
        // },
        bidStartsAt: new Date(formData.bidStartsAt),
        bidDuration: {
          days: Number(formData.bidDuration.days),
          hours: Number(formData.bidDuration.hours),
          minutes: Number(formData.bidDuration.minutes),
        },
        startBid: true,
        endedBid: false,
      };
      
      // Send the biddable data
      const response = await axiosInstance.post('biddables/biddableProducts', payload);
      console.log('Biddable created successfully:', response.data);
      
      // Clear the form
      setFormData({
        title: '',
        description: '',
        basePrice: '',
        currentBid: '',
        // timeLeft: { days: '', hours: '', minutes: '', seconds: '' },
        bidStartsAt: '',
        bidDuration: { days: '', hours: '', minutes: '' },
        startBid: true,
        endedBid: false,
      });
      setImageFile(null);
      setImagePreview('');
      
    } catch (error) {
      console.error('Error creating biddable:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Create a New Biddable Listing</h2>
      
      {/* Image Upload Section */}
      <div className="space-y-2">
        <label className="block text-gray-700">Product Image</label>
        <input 
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
        />
        {imagePreview && (
          <div className="mt-2">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="w-full max-h-48 object-contain rounded"
            />
          </div>
        )}
      </div>
      
      <div>
        <label className="block text-gray-700">Title</label>
        <input 
          type="text" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          className="w-full p-2 border rounded" 
          required
        />
      </div>
      
      <div>
        <label className="block text-gray-700">Description</label>
        <textarea 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
          rows="4"
          required
        ></textarea>
      </div>

      <div>
        <label className="block text-gray-700">Base Price</label>
        <input 
          type="number" 
          name="basePrice" 
          value={formData.basePrice} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
          required
          min="0"
        />
      </div>

      <div>
        <label className="block text-gray-700">Current Bid</label>
        <input 
          type="number" 
          name="currentBid" 
          value={formData.currentBid} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
          required
          min="0"
        />
      </div>

      {/* <div className="grid grid-cols-4 gap-2">
        <div>
          <label className="block text-gray-700">Days Left</label>
          <input 
            type="number" 
            name="timeLeft.days" 
            value={formData.timeLeft.days} 
            onChange={handleChange} 
            className="w-full p-2 border rounded"
            required
            min="0"
          />
        </div>
        <div>
          <label className="block text-gray-700">Hours Left</label>
          <input 
            type="number" 
            name="timeLeft.hours" 
            value={formData.timeLeft.hours} 
            onChange={handleChange} 
            className="w-full p-2 border rounded"
            required
            min="0"
            max="23"
          />
        </div>
        <div>
          <label className="block text-gray-700">Minutes Left</label>
          <input 
            type="number" 
            name="timeLeft.minutes" 
            value={formData.timeLeft.minutes} 
            onChange={handleChange} 
            className="w-full p-2 border rounded"
            required
            min="0"
            max="59"
          />
        </div>
        <div>
          <label className="block text-gray-700">Seconds Left</label>
          <input 
            type="number" 
            name="timeLeft.seconds" 
            value={formData.timeLeft.seconds} 
            onChange={handleChange} 
            className="w-full p-2 border rounded"
            required
            min="0"
            max="59"
          />
        </div>
      </div> */}

      <div>
        <label className="block text-gray-700">Bid Starts At</label>
        <input 
          type="datetime-local" 
          name="bidStartsAt" 
          value={formData.bidStartsAt} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="block text-gray-700">Bid Duration (Days)</label>
          <input 
            type="number" 
            name="bidDuration.days" 
            value={formData.bidDuration.days} 
            onChange={handleChange} 
            className="w-full p-2 border rounded"
            required
            min="0"
          />
        </div>
        <div>
          <label className="block text-gray-700">Hours</label>
          <input 
            type="number" 
            name="bidDuration.hours" 
            value={formData.bidDuration.hours} 
            onChange={handleChange} 
            className="w-full p-2 border rounded"
            required
            min="0"
            max="23"
          />
        </div>
        <div>
          <label className="block text-gray-700">Minutes</label>
          <input 
            type="number" 
            name="bidDuration.minutes" 
            value={formData.bidDuration.minutes} 
            onChange={handleChange} 
            className="w-full p-2 border rounded"
            required
            min="0"
            max="59"
          />
        </div>
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
        Submit Listing
      </button>
    </form>
  );
}

export default BiddablesPostForm;