import React from 'react';
import Product from './product';
import '../styles/style.css';
import ProductsData from '../data/productsData';

const ProductList = () => {
    return (
        <div className="small-container">
            <div className="row row-2">
                <h2>All Products</h2>
                <select>
                    <option>Default Sort</option>
                    <option>Sort By Price</option>
                    <option>Sort By Popularity</option>
                    <option>Sort By Rating</option>
                    <option>Sort By Sale</option>
                </select>
            </div>
            <div className="row">
                {ProductsData.map((product, index) => (
                    <Product
                        key={index}
                        imgSrc={product.imgSrc}
                        title={product.title}
                        rating={product.rating}
                        price={product.price}
                    />
                ))}
            </div>
            <div className="page-btn">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>&#8594;</span>
            </div>
        </div>
    );
};

export default ProductList;

