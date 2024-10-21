import React from 'react';
import '../styles/style.css';

const FormContainer = () => {
    const login = () => {
        document.getElementById("RegForm").style.transform = "translatex(300px)";
        document.getElementById("LoginForm").style.transform = "translatex(300px)";
        document.getElementById("Indicator").style.transform = "translate(0px)";
    };

    const register = () => {
        document.getElementById("RegForm").style.transform = "translatex(0px)";
        document.getElementById("LoginForm").style.transform = "translatex(0px)";
        document.getElementById("Indicator").style.transform = "translateX(100px)";
    };

    return (
        <div className="form-container">
            <div className="form-btn">
                <span onClick={login}>Login</span>
                <span onClick={register}>Register</span>
                <hr id="Indicator" />
            </div>

            <form id="LoginForm">
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit" className="btn">Login</button>
                <a href="/">Forget Password</a>
            </form>

            <form id="RegForm">
                <input type="text" placeholder="Username" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit" className="btn">Register</button>
            </form>
        </div>
    );
};

export default FormContainer;
