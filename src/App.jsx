import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import HeadTail from './components/HeadTail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/head-tail" element={<HeadTail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
