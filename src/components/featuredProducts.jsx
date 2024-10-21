import React from 'react';
import '../styles/style.css';
import product1 from '../assets/product-1.jpg';
import product2 from '../assets/product-2.jpg';
import product3 from '../assets/product-3.jpg';
import product4 from '../assets/product-4.jpg';

const Product = ({ image, title, price }) => (
  <div className="col-4">
    <img src={image} alt={title} />
    <h4>{title}</h4>
    <div className="rating">
      <i className="fa fa-star"></i>
      <i className="fa fa-star"></i>
      <i className="fa fa-star"></i>
      <i className="fa fa-star"></i>
      <i className="fa fa-star-o"></i>
    </div>
    <p>{price}</p>
  </div>
);

const FeaturedProducts = () => {
  return (
    <div className="small-container">
      <h2 className="title">Featured Products</h2>
      <div className="row">
        <Product image={product1} title="Red Printed T-Shirt" price="$50.00" />
        <Product image={product2} title="Red Printed T-Shirt" price="$50.00" />
        <Product image={product3} title="Red Printed T-Shirt" price="$50.00" />
        <Product image={product4} title="Red Printed T-Shirt" price="$50.00" />
      </div>
    </div>
  );
};

export default FeaturedProducts;
