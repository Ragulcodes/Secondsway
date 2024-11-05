import React, { useState } from 'react';
import '../styles/style.css';
import axiosInstance from '../axiosInstance';
import img1 from '../assets/image1.png'
import homeimg1 from '../assets/homeimg2.png'
import { useNavigate } from 'react-router-dom';

const Account = () => {


    const navigate = useNavigate();

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerRole, setRegisterRole] = useState('buyer'); // Default to 'buyer'


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


    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        if (!loginEmail || !loginPassword) {
            console.error('Email or password cannot be empty');
            return;
        }

        try {
            const response = await axiosInstance.post('/auth/login', {
                email: loginEmail,
                password: loginPassword,
            });
            

            // Assuming response contains username and token
            const { token, user } = response.data;

            login(token, user.name);  // Call login from context
            
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', user.name); // Store username
            alert('Login successful!');
            navigate('/');
            window.location.reload();
        } catch (error) {
            if (error.response) {
                console.error('Login error:', error.response.data.message || 'Invalid login attempt');
            } else {
                console.error('Error during login:', error.message);
            }
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/auth/register', {
                name: registerName,
                email: registerEmail,
                password: registerPassword,
                role: registerRole,
            });
            alert('Registration successful!');
        } catch (error) {
            console.error('Registration error:', error.response?.data?.message || 'Error registering');
        }
    };



    return (
        <div className="account-page">
            <div className="container">
                <div className="row">
                    <div className="col-2 imgcontainer">
                        <img src={homeimg1} width="100%" style={{}} alt="account" />
                    </div>
                    <div className="col-2">
                        <div className="form-container">
                            <div className="form-btn">
                                <span onClick={login}>Login</span>
                                <span onClick={register}>Register</span>
                                <hr id="Indicator" />
                            </div>

                            <form id="LoginForm" onSubmit={handleLoginSubmit}>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    required
                                />
                                <button type="submit" className="btn">Login</button>
                                <a href="/">Forget Password</a>
                            </form>

                            <form id="RegForm" onSubmit={handleRegisterSubmit}>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={registerName}
                                    onChange={(e) => setRegisterName(e.target.value)}
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={registerEmail}
                                    onChange={(e) => setRegisterEmail(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={registerPassword}
                                    onChange={(e) => setRegisterPassword(e.target.value)}
                                    required
                                />

                                <select
                                    value={registerRole}
                                    onChange={(e) => setRegisterRole(e.target.value)}
                                >
                                    <option value="buyer">Buyer</option>
                                    <option value="seller">Seller</option>
                                </select>

                                <button type="submit" className="btn">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
