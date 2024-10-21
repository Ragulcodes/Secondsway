import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';
import cart from '../assets/cart.png';
import menu from '../assets/menu.png';
import logo from '../assets/logo-nav.png';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/"><img src={logo} alt="logo" width="125px" /></Link>
      </div>
      <nav>
        <ul id="MenuItems">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/account">Account</Link></li>
        </ul>
      </nav>
      <Link to="/cart"> <img src={cart} width="30px" height="30px" alt="cart" /></Link>
      <img src={menu} className="menu-icon" alt="menu"  /> 
      {/* onClick={() => menutoggle()} */}
    </div>
  );
};

export default Navbar;
