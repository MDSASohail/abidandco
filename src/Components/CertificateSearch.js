import React, { useState } from 'react';

const CertificateSearch = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 mb-8">
      <input
        type="text"
        placeholder="Enter Certificate Code"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md w-72 text-center focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
      >
        Search
      </button>
    </form>
  );
};

export default CertificateSearch;
