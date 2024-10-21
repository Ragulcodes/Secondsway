import React from 'react';
import '../styles/style.css';
import { Link } from 'react-router-dom';

const CartItem = ({ imgSrc, name, price, quantity, subtotal }) => {
    return (
        <tr>
            <td>
                <div className="cart-info">
                    <img src={imgSrc} alt={name} />
                    <div>
                        <p>{name}</p>
                        <small>Price: {price}</small>
                        <br />
                        <Link to="/cart">Remove</Link>
                    </div>
                </div>
            </td>
            <td><input type="number" defaultValue={quantity} /></td>
            <td>{subtotal}</td>
        </tr>
    );
};

export default CartItem;
