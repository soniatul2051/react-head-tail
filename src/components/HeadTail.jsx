import React, { useState } from 'react';

function HeadTail() {
  const [selectedValue, setSelectedValue] = useState('');
  const [hColumn, setHColumn] = useState([]);
  const [tColumn, setTColumn] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedValue) {
      setError('Please select value from dropdown');
      return;
    }
    setError('');
    if (selectedValue === 'H') {
      setHColumn([...hColumn, 'H']);
    } else if (selectedValue === 'T') {
      setTColumn([...tColumn, 'T']);
    }
    setSelectedValue('');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Head & Tail</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex space-x-4">
          <select
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select value</option>
            <option value="H">H</option>
            <option value="T">T</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </form>
      <div className="flex space-x-6">
        <div className="w-1/2">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">H Column</h2>
          <div className="flex flex-col space-y-1">
            {hColumn.map((item, index) => (
              <div key={index} className="p-2 bg-white shadow rounded">{item}</div>
            ))}
          </div>
        </div>
        <div className="w-1/2">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">T Column</h2>
          <div className="flex flex-col space-y-1">
            {tColumn.map((item, index) => (
              <div key={index} className="p-2 bg-white shadow rounded">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeadTail;