import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = ({ isOpen, onClose, onSwitchToSignin }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, email, password } = formData;

        if (name && email && password) {
            console.log("User signed up:", formData);
            onClose();               // close modal
            navigate("/dashboard");  // redirect
        } else {
            alert("Please fill all fields");
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={`modal ${isOpen ? 'active' : ''}`}>
            <div className="modal-overlay" onClick={handleOverlayClick}></div>
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>×</button>
                <div className="modal-header">
                    <h2 className="modal-title">Create Account</h2>
                    <p className="modal-subtitle">Start your Kolam journey</p>
                </div>
                <form className="modal-form" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="name"
                        placeholder="Full Name" 
                        className="form-input"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Email address" 
                        className="form-input"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Password" 
                        className="form-input"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit" className="btn-modal">Sign Up</button>
                    <p className="modal-switch">
                        Already have an account?{" "}
                        <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToSignin(); }}>Sign in here</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
