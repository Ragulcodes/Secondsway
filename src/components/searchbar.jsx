import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const SearchBar = () => {
  const [category, setCategory] = useState('Category');
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const categories = [
    'Category',
    'Electronics',
    'Fashion',
    'Home',
    'Sports',
    'Books'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search:', search, 'Category:', category);
  };

  const handleCategorySelect = (cat) => {
    setCategory(cat);
    setIsOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="max-w-4xl mx-auto px-4">
  <form onSubmit={handleSubmit} className="flex items-center">
    {/* Dropdown */}
    <div className="relative flex-shrink-0" style={{ width: '160px' }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-12 px-4 bg-white border-y border-l rounded-l-full border-gray-200 text-gray-600 text-sm focus:outline-none hover:bg-gray-50 focus:border-gray-300 transition-all duration-200 w-full text-left flex items-center"
      >
        <span className="truncate mr-6">{category}</span>
        <ChevronDown 
          size={16} 
          className={`text-gray-400 transition-transform duration-200 absolute right-3 ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategorySelect(cat)}
                className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors duration-150
                  ${category === cat ? 'bg-gray-50 text-gray-900' : 'text-gray-600'} truncate`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* Search Input */}
    <div className="flex-grow relative">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full h-12 px-6 text-sm border-y border-r border-gray-200 focus:outline-none hover:bg-gray-50 focus:border-gray-300 transition-all duration-200 border-l"
        style={{
          borderLeftWidth: '1px', // Separation line between dropdown and input
          borderRadius: '0', // Remove rounded corners
        }}
      />
    </div>

    {/* Search Button */}
    <button
      type="submit"
      onMouseEnter={() => setIsButtonHovered(true)}
      onMouseLeave={() => setIsButtonHovered(false)}
      className="h-12 w-12 flex items-center justify-center bg-gray-700 hover:bg-gray-800 text-white rounded-full -ml-6 focus:outline-none transition-all duration-300 relative z-10 hover:shadow-lg hover:scale-105"
      aria-label="Search"
    >
      <Search size={20} />
    </button>
  </form>
</div>

    </div>
  );
};

export default SearchBar;