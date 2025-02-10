import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Ensure Navbar is imported
import PostProduct from './pages/PostProduct';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Users from './pages/Users';
import Messages from './pages/Messages';

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar will be shown on all pages */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<h1 className="text-center">Admin Portal</h1>} />
          <Route path="/post-product" element={<PostProduct />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/users" element={<Users />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
