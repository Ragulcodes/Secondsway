import React from 'react';

const Contact = () => {
  return (
    <div className="flex flex-col md:flex-row max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-10">
      {/* Contact Information Section */}
      <div className="bg-blue-600 text-white p-6 md:w-1/3 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="material-icons-outlined">location_on</span>
            <p className="ml-2">211 Ullamcorper St.<br />Roseville</p>
          </div>
          <div className="flex items-center">
            <span className="material-icons-outlined">email</span>
            <p className="ml-2">sale@modeltheme.com</p>
          </div>
          <div className="flex items-center">
            <span className="material-icons-outlined">phone</span>
            <p className="ml-2">+40 712 345 678</p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="p-6 md:w-2/3">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Get in Touch</h3>
        <p className="text-gray-600 mb-6">Feel free to drop us a line below!</p>
        <form className="space-y-4">
          <div className="flex flex-col md:flex-row md:space-x-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 md:mb-0"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <textarea
            placeholder="Your Message"
            className="w-full p-3 h-32 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            SEND MESSAGE →
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
