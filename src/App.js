import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar';
import Footer from './components/footer';

import HomePg from './pages/homePg';
import ProductsPg from './pages/productsPg';
import AccountPg from './pages/accountPg';
import CartPg from './pages/cartPg';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        
        <div className="page-content">
          <Routes>
            <Route path="/" element={<HomePg />} />
            <Route path="/products" element={<ProductsPg />} />
            <Route path="/account" element={<AccountPg />} />
            <Route path="/cart" element={<CartPg />} />
          </Routes>
        </div>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;
