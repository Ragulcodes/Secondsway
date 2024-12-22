import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './authContext';

import Navbar from './components/navbar';
import Footer from './components/footer';

import HomePg from './pages/homePg';
import ProductsPg from './pages/productsPg';
import ProductDescPg from './pages/productDescPg';
import AccountPg from './pages/accountPg';
import CartPg from './pages/cartPg';
import ProductCreationForm from './pages/productCreationForm';
import MyProducts from './pages/myProducts';
import ContactUs from './pages/contactUs';
import Biddingpd from './pages/biddingproductDs';
import BiddingProducts from './pages/biddingProducts';
import BiddablesPostForm from './pages/biddablesPostForm';

import OrderPage from './pages/order';
import MyOrdersPage from './pages/myOrders';

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <div className="app-container">
        <Navbar />
        
        <div className="page-content">
          <Routes>
            <Route path="/" element={<HomePg />} />

            <Route path="/products" element={<ProductsPg />} />
            <Route path="/product/:id" element={<ProductDescPg />} />

            <Route path="/account" element={<AccountPg />} />
            <Route path="/cart" element={<CartPg />} />
            <Route path="/productsCreationForm" element={<ProductCreationForm />} />
            <Route path="/MyProducts" element={<MyProducts />} />
            <Route path="/contactUs" element={<ContactUs />} />

            <Route path="/bidables" element={<BiddingProducts/>} />     
            <Route path="/bidProduct/:id" element={<Biddingpd />} /> 

            <Route path="/biddablesPostForm" element={<BiddablesPostForm />} />       

            <Route path="/order" element={<OrderPage />} />  
            <Route path="/MyOrders" element={<MyOrdersPage />} />  
            {/* <Route path="/order/:orderId" element={<OrderDetailPage />} /> */}

          </Routes>
        </div>
        
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
};

export default App;
