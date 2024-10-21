import React from 'react';
import '../styles/style.css';
import FormContainer from './formContainer';
import img1 from '../assets/image1.png'

const Account = () => {
    return (
        <div className="account-page">
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <img src={img1} width="100%" alt="account" />
                    </div>
                    <div className="col-2">
                        <FormContainer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
