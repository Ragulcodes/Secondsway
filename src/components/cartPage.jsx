import React from 'react';
import CartItem from './cartItem';
import CartTotal from './cartTotal';
import '../styles/style.css';
import buy1 from '../assets/buy-1.jpg';
import buy2 from '../assets/buy-2.jpg';
import buy3 from '../assets/buy-3.jpg';

const CartPage = () => {
    return (
        <div className="small-container cart-page">
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    <CartItem 
                        imgSrc={buy1}
                        name="Red Printed T-Shirt"
                        price="$50.00"
                        quantity="1"
                        subtotal="$50.00"
                    />
                    <CartItem 
                        imgSrc={buy2}
                        name="Red Printed T-Shirt"
                        price="$50.00"
                        quantity="1"
                        subtotal="$50.00"
                    />
                    <CartItem 
                        imgSrc={buy3}
                        name="Red Printed T-Shirt"
                        price="$50.00"
                        quantity="1"
                        subtotal="$50.00"
                    />
                </tbody>
            </table>
            
            <CartTotal subtotal="$200.00" tax="$35.00" total="$230.00" />
        </div>
    );
};

export default CartPage;
