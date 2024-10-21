import React from 'react';
import '../styles/style.css';
import Product from './product';
import product5 from '../assets/product-5.jpg';
import product6 from '../assets/product-6.jpg';
import product7 from '../assets/product-7.jpg';
import product8 from '../assets/product-8.jpg';
import product9 from '../assets/product-9.jpg';
import product10 from '../assets/product-10.jpg';
import product11 from '../assets/product-11.jpg';
import product12 from '../assets/product-12.jpg';


const LatestProducts = () => {
  const latestProducts = [
    { imgSrc: product5, title: 'Red Printed T-Shirt', rating: 4, price: 50.00 },
    { imgSrc: product6, title: 'Red Printed T-Shirt', rating: 4, price: 50.00 },
    { imgSrc: product7, title: 'Red Printed T-Shirt', rating: 4, price: 50.00 },
    { imgSrc: product8, title: 'Red Printed T-Shirt', rating: 4, price: 50.00 },
    { imgSrc: product9, title: 'Red Printed T-Shirt', rating: 4, price: 50.00 },
    { imgSrc: product10, title: 'Red Printed T-Shirt', rating: 4, price: 50.00 },
    { imgSrc: product11, title: 'Red Printed T-Shirt', rating: 4, price: 50.00 },
    { imgSrc: product12, title: 'Red Printed T-Shirt', rating: 4, price: 50.00 },
  ];

    return (
        <div className='small-container'>
            <h2 className="title">Latest Products</h2>
            <div className="row">
                {latestProducts.map((product, index) => (
                    <Product
                        key={index}
                        imgSrc={product.imgSrc}
                        title={product.title}
                        rating={product.rating}
                        price={product.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default LatestProducts;
