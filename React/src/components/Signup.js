import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Signup.css'; // Import CSS file

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [enableSanitize, setEnableSanitize] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnableSanitize(false); // Disable sanitize button initially
        const validatePassword = (password) => {
            const minLength = 8;
            const maxLength = 16;
            const hasUpperCase = /[A-Z]/.test(password);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
            const hasNumber = /\d/.test(password);
            const isValidLength = password.length >= minLength && password.length <= maxLength;
    
            if (!isValidLength) {
                return `Password must be between ${minLength} and ${maxLength} characters long.`;
            }
            if (!hasUpperCase) {
                return 'Password must contain at least one uppercase letter.';
            }
            if (!hasSpecialChar) {
                return 'Password must contain at least one special character.';
            }
            if (!hasNumber) {
                return 'Password must contain at least one number.';
            }
            return null;
        };
    
        
            // Validate password before making the request
            const passwordValidationMessage = validatePassword(formData.password);
            if (passwordValidationMessage) {
                alert(passwordValidationMessage);
                return;
            }


        try {
            const response = await axios.post('/users/register', formData);
            if (response.status === 406) {
                alert("Potential XSS attack detected");
                setEnableSanitize(true); // Enable sanitize button
            } else if (response.status === 200) {
                alert('User registered successfully');
            } else {
                alert('Unexpected response status: ' + response.status);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 406) {
                    alert("Potential XSS attack detected");
                    setEnableSanitize(true); // Enable sanitize button
                } else if (error.response.status === 400) {
                    alert("account aldredy exists with  email id "+formData.email);
                } 
                else if(error.response.status===412)
                    {
                        alert("Account aldready exists with email id "+formData.email);
                    }
                
                else {
                    alert('Error registering user: ' + error.response.status);
                }
            } else {
                alert('Network error or server is not responding');
            }
        }
    };

    const handleSanitize = async () => {
        try {
            const response = await axios.post('/users/register/sanitize', formData);
            if (response.status === 200) {
                alert('User registered successfully after sanitization');
            } 
            else if(response.status===509)
                {
                    alert("User name is empty after sanitization! enter new user name");
                }
            else {
                alert('Unexpected response status: ' + response.status);
            }
        } catch (error) {
             if (error.response.status === 412) {
                alert("account aldredy exists with  email id "+formData.email);
            } 
            if (error.response.status === 509) {
                alert("User name is empty after sanitization! enter new user name");
            } 
            if(error.response.status===417)
                {
                    alert("Password is empty after sanitization! enter new password");
                }
            else  {
                alert('Network error or server is not responding');
            }
        }
    };

    return (
        <div className="container"> {/* Apply container class */}
            <div className="frame"> {/* Apply frame class */}
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
                <button 
                    onClick={handleSanitize} 
                    disabled={!enableSanitize}
                >
                    Sanitize
                </button>
                <p>If you already have an account, <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Signup;
