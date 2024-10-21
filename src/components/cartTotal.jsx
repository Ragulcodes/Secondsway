import React from 'react';
import '../styles/style.css';

const CartTotal = ({ subtotal, tax, total }) => {
    return (
        <div className="total-price">
            <table>
                <tbody>
                    <tr>
                        <td>Subtotal</td>
                        <td>{subtotal}</td>
                    </tr>
                    <tr>
                        <td>Tax</td>
                        <td>{tax}</td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td>{total}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CartTotal;
