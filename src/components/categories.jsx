import React from 'react';
import '../styles/style.css';
import category1 from '../assets/category-1.jpg';
import category2 from '../assets/category-2.jpg';
import category3 from '../assets/category-3.jpg';

const Categories = () => {
  return (
    <div className="categories">
      <div className="small-container">
        <div className="row">
          <div className="col-3">
            <img src={category1} alt="category 1" />
          </div>
          <div className="col-3">
            <img src={category2} alt="category 2" />
          </div>
          <div className="col-3">
            <img src={category3} alt="category 3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
