import React from 'react';
import '../styles/style.css';
import user1 from '../assets/user-1.png';
import user2 from '../assets/user-2.png';
import user3 from '../assets/user-3.png';

const Testimonial = () => {
    return (
        <div className="testimonial">
            <div className="small-container">
                <div className="row">
                    <div className="col-3">
                        <i className="fa fa-quote-left"></i>
                        <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                            industry's standard dummy text.</p>
                        <div className="rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                        </div>
                        <img src={user1} alt="User 1" />
                        <h3>Sean Parker</h3>
                    </div>
                    <div className="col-3">
                        <i className="fa fa-quote-left"></i>
                        <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                            industry's standard dummy text.</p>
                        <div className="rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                        </div>
                        <img src={user2} alt="User 2" />
                        <h3>Mike Smith</h3>
                    </div>
                    <div className="col-3">
                        <i className="fa fa-quote-left"></i>
                        <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                            industry's standard dummy text.</p>
                        <div className="rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                        </div>
                        <img src={user3} alt="User 3" />
                        <h3>Mabel Joe</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
