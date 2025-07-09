import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Home</h1>
      <nav className="space-x-6">
        <Link to="/about" className="text-blue-600 hover:text-blue-800 font-medium">About</Link>
        <Link to="/head-tail" className="text-blue-600 hover:text-blue-800 font-medium">Head & Tail</Link>
      </nav>
    </div>
  );
}

export default Home;