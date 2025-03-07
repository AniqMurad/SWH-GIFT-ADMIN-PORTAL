import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import PostProduct from "./pages/PostProduct";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Messages from "./pages/Messages";
import AdminLogin from "./pages/AdminLogin";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");

  return (
    <Router>
      {isAdmin && <Navbar onLogout={() => setIsAdmin(false)} />} {/* Show Navbar only when logged in */}
      <div className="container mt-4">
        <Routes>
          <Route path="/admin-login" element={<AdminLogin onLogin={() => setIsAdmin(true)} />} />
          <Route path="/" element={isAdmin ? <h1 className="text-center">Admin Portal</h1> : <Navigate to="/admin-login" />} />
          <Route path="/post-product" element={isAdmin ? <PostProduct /> : <Navigate to="/admin-login" />} />
          <Route path="/products" element={isAdmin ? <Products /> : <Navigate to="/admin-login" />} />
          <Route path="/orders" element={isAdmin ? <Orders /> : <Navigate to="/admin-login" />} />
          <Route path="/users" element={isAdmin ? <Users /> : <Navigate to="/admin-login" />} />
          <Route path="/messages" element={isAdmin ? <Messages /> : <Navigate to="/admin-login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
