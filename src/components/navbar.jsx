// import React, { useContext, useState,useEffect } from 'react';
// import { Link, useNavigate  } from 'react-router-dom';
// import { AuthContext } from '../authContext';
// import '../styles/style.css';
// import usericon from '../assets/UserProfileIcon.svg';
// import menu from '../assets/menu.png';
// import logo from '../assets/logo-nav.png';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { isLoggedIn, username, logout } = useContext(AuthContext);
//   const [showLogout, setShowLogout] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   useEffect(() => {
//     setIsMenuOpen(false);
//   }, [navigate]);

//     // Track isLoggedIn and username in local state
//     const [authState, setAuthState] = useState({ isLoggedIn, username });

//     // Sync local state with context changes
//     useEffect(() => {
//         setAuthState({ isLoggedIn, username });
//     }, [isLoggedIn, username]);

//   const handleLogout = () => {
//     logout();
//     navigate('/'); // Redirect to home or login page
//   };


//   return (
//     <div className="navbar">
//         <div className="logo">
//             <Link to="/"><img src={logo} alt="logo" width="125px" /></Link>
//         </div>
//         <nav>
//             <ul id="MenuItems" style={{ maxHeight: isMenuOpen ? "500px" : "0" }}>
//                 <li><Link to="/">Home</Link></li>
//                 <li><Link to="/products">Products</Link></li>
//                 <li><Link to="/productsCreationForm">Post Form</Link></li>
//                 <li><Link to="/MyProducts">My Products</Link></li>
//                 <li><Link to="/bidables">Bid Products</Link></li>
//                 <li><Link to="/about">About</Link></li>
//                 <li><Link to="/contactUs">Contact</Link></li>
//                 {authState.isLoggedIn ? (
//                         <li 
//                             className="username-container"
//                             onMouseEnter={() => setShowLogout(true)} // Show logout on hover
//                             onMouseLeave={() => setShowLogout(false)} // Hide logout on mouse leave
//                         >
//                             <span>{authState.username.toUpperCase()}</span>
//                             {showLogout && (
//                                 <div className="logout-button" onClick={handleLogout}>
//                                     Logout
//                                 </div>
//                             )}
//                         </li>
//                     ) : (
//                         <li> 
//                           <Link to="/account">
//                             <button className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition">
//                               Login
//                             </button>
//                           </Link>
//                         </li>
//                   )}
//             </ul>
//         </nav>
//         <img src={usericon} width="30px" height="30px" alt="cart" />
//         <img src={menu} className="menu-icon" onClick={toggleMenu} alt="menu" />
//     </div>
//   );
// };

// export default Navbar;

import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../authContext';
import '../styles/style.css';
import usericon from '../assets/UserProfileIcon.svg';
import menu from '../assets/menu.png';
import logo from '../assets/logo-nav.png';

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, username, logout } = useContext(AuthContext);
  const [showLogout, setShowLogout] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown menu

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Close menu and dropdown on navigation
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }, [navigate]);

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home or login page
  };

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo" width="125px" />
        </Link>
      </div>
      <nav>
        <ul id="MenuItems" style={{ maxHeight: isMenuOpen ? '500px' : '0' }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/productsCreationForm">Post Form</Link></li>
          <li><Link to="/bidables">Bid Products</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contactUs">Contact</Link></li>
          {!isLoggedIn ? (
            <li>
              <Link to="/account">
                <button className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition">
                  Login
                </button>
              </Link>
            </li>
          ) : null}
        </ul>
      </nav>
      <div className="user-icon-container" ref={dropdownRef}>
        <img
          src={usericon}
          width="30px"
          height="30px"
          alt="user"
          onClick={toggleDropdown}
        />
        {isDropdownOpen && (
          <div className="dropdown-menu" style={{ position: 'absolute', top: '50px', right: '10px', background: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', zIndex: 1000 }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: '10px', width: '200px' }}>

              <li style={{ padding: '10px 15px', cursor: 'pointer', borderBottom: '1px solid #f0f0f0' }}>
                <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>Profile</Link>
              </li>

              <li style={{ padding: '10px 15px', cursor: 'pointer', borderBottom: '1px solid #f0f0f0' }}>
                <Link to="/myOrders" style={{ textDecoration: 'none', color: '#333' }}>My orders</Link>
              </li>

              <li style={{ padding: '10px 15px', cursor: 'pointer', borderBottom: '1px solid #f0f0f0' }}>
                <Link to="/MyBiddings" style={{ textDecoration: 'none', color: '#333' }}>My Biddings</Link>
              </li>
              <li style={{ padding: '10px 15px', cursor: 'pointer', borderBottom: '1px solid #f0f0f0' }}>
                <Link to="/MyProducts" style={{ textDecoration: 'none', color: '#333' }}>My Products</Link>
              </li>
              <li style={{ padding: '10px 15px', cursor: 'pointer', borderBottom: '1px solid #f0f0f0' }}>
                <Link to="/Notifications" style={{ textDecoration: 'none', color: '#333' }}>Notifications</Link>
              </li>

              <li style={{ padding: '10px 15px', cursor: 'pointer',color: 'red' }} onClick={handleLogout}>Logout</li>
            </ul>
          </div>
        )}
      </div>
      <img src={menu} className="menu-icon" onClick={toggleMenu} alt="menu" />
    </div>
  );
};

export default Navbar;
