import React from 'react';
import '../styles/style.css';

const Product = ({ imgSrc, title, rating, price }) => {
    return (
        <div className="col-4">
            <img src={imgSrc} alt={title} />
            <h4>{title}</h4>
            <div className="rating">
                {Array(rating).fill().map((_, i) => (
                    <i key={i} className="fa fa-star" />
                ))}
                {Array(5 - rating).fill().map((_, i) => (
                    <i key={i} className="fa fa-star-o" />
                ))}
            </div>
            <p>${price}</p>
        </div>
    );
};

export default Product;
