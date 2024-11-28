import React, { useContext, useState,useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { AuthContext } from '../authContext';
import '../styles/style.css';
import cart from '../assets/cart.png';
import menu from '../assets/menu.png';
import logo from '../assets/logo-nav.png';

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, username, logout } = useContext(AuthContext);
  const [showLogout, setShowLogout] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [navigate]);

    // Track isLoggedIn and username in local state
    const [authState, setAuthState] = useState({ isLoggedIn, username });

    // Sync local state with context changes
    useEffect(() => {
        setAuthState({ isLoggedIn, username });
    }, [isLoggedIn, username]);

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home or login page
  };


  return (
    <div className="navbar">
        <div className="logo">
            <Link to="/"><img src={logo} alt="logo" width="125px" /></Link>
        </div>
        <nav>
            <ul id="MenuItems" style={{ maxHeight: isMenuOpen ? "500px" : "0" }}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/productsCreationForm">Post Form</Link></li>
                <li><Link to="/MyProducts">My Products</Link></li>
                <li><Link to="/bidables">Bid Products</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contactUs">Contact</Link></li>
                {authState.isLoggedIn ? (
                        <li 
                            className="username-container"
                            onMouseEnter={() => setShowLogout(true)} // Show logout on hover
                            onMouseLeave={() => setShowLogout(false)} // Hide logout on mouse leave
                        >
                            <span>{authState.username.toUpperCase()}</span>
                            {showLogout && (
                                <div className="logout-button" onClick={handleLogout}>
                                    Logout
                                </div>
                            )}
                        </li>
                    ) : (
                        <li><Link to="/account">Account</Link></li>
                  )}
            </ul>
        </nav>
        <Link to="/cart"><img src={cart} width="30px" height="30px" alt="cart" /></Link>
        <img src={menu} className="menu-icon" onClick={toggleMenu} alt="menu" />
    </div>
  );
};

export default Navbar;
