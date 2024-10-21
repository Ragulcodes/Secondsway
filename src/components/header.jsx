import React from 'react';
import '../styles/style.css';
import image1 from '../assets/image1.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="row">
          <div className="col-2">
            <h1>Give Your Pre-Loved Items <br /> A New Home!</h1>
            <p>At Secondsway, we make it easy for you to sell and buy quality used clothes and products. Join our community and give your items a second chance to shine!</p>
            <Link to="/products" className="btn">Explore Now &#8594;</Link>
          </div>
          <div className="col-2">
            <img src={image1} alt="Exchange picture" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
