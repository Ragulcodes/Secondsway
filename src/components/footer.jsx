import React from 'react';
import '../styles/style.css';
// import playStore from '../assets/play-store.png';
// import appstore from '../assets/app-store.png';
import logowhite from '../assets/logo.png';

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    {/* <div className="footer-col-1">
                        <h3>Download Our App</h3>
                        <p>Download App for Android and iOS mobile phones.</p>
                        <div className="app-logo">
                            <img src={playStore} alt="Play Store" />
                            <img src={appstore} alt="App Store" />
                        </div>
                    </div> */}
                    <div className="footer-col-2">
                        <img src={logowhite} alt="white logo" />
                        <p>Where second chances meet new beginnings.</p>
                    </div>
                    <div className="footer-col-3">
                        <h3>Useful Links</h3>
                        <ul>
                            <li>Coupons</li>
                            <li>Blog Post</li>
                            <li>Return Policy</li>
                            <li>Join Affiliate</li>
                        </ul>
                    </div>
                    <div className="footer-col-4">
                        <h3>Follow Us</h3>
                        <ul>
                            <li>Facebook</li>
                            <li>Twitter</li>
                            <li>Instagram</li>
                            <li>Youtube</li>
                        </ul>
                    </div>
                </div>
                <hr />
                <p className="copyright">Copyright @Secondsway 2024</p>
            </div>
        </div>
    );
};

export default Footer;
