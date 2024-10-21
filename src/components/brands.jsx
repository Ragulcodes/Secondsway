import React from 'react';
import '../styles/style.css';
import godrejLogo from '../assets/logo-godrej.png';
import oppoLogo from '../assets/logo-oppo.png';
import cocaColaLogo from '../assets/logo-coca-cola.png';
import paypalLogo from '../assets/logo-paypal.png';
import philipsLogo from '../assets/logo-philips.png';

const Brands = () => {
  return (
    <div className="brands">
      <div className="small-container">
        <div className="row">
          <div className="col-5">
            <img src={godrejLogo} alt="Godrej Logo" />
          </div>
          <div className="col-5">
            <img src={oppoLogo} alt="Oppo Logo" />
          </div>
          <div className="col-5">
            <img src={cocaColaLogo} alt="Coca Cola Logo" />
          </div>
          <div className="col-5">
            <img src={paypalLogo} alt="Paypal Logo" />
          </div>
          <div className="col-5">
            <img src={philipsLogo} alt="Philips Logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;
