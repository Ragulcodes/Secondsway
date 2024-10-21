import React from 'react';
import '../styles/style.css';
import offerImg from '../assets/exclusive.png';

const Offer = () => {
    return (
        <div className="offer">
            <div className="small-container">
                <div className="row">
                    <div className="col-2">
                        <img src={offerImg} alt="Exclusive Offer" className="offer-img" />
                    </div>
                    <div className="col-2">
                        <p>Exclusively Available on Secondsway</p>
                        <h1>You can now get accessories too!!</h1>
                        <small>
                        Explore a wide range of accessories, from stylish bags to smart watches, all at Secondsway. Find the perfect piece that fits your style and budget!<br />
                        </small>
                        <a href="products.html" className="btn">Buy Now &#8594;</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Offer;
