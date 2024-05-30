// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const Login = () => {
//     const [loginData, setLoginData] = useState({
//         email: '',
//         password: ''
//     });
//     const [enableSanitize, setEnableSanitize] = useState(false);

//     const handleChange = (e) => {
//         setLoginData({
//             ...loginData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setEnableSanitize(false); // Disable sanitize button initially
//         try {
//             const response = await axios.post('/users/login', loginData);
//             if (response.status === 403) {
//                 alert("Potential XSS attack detected");
//                 setEnableSanitize(true); // Enable sanitize button
//             } else if (response.status === 202) {
//                 alert('Login successful');
//             } else {
//                 alert('Unexpected response status: ' + response.status);
//             }
//         } catch (error) {
//             if (error.response) {
//                 if (error.response.status === 403) {
//                     alert("Potential XSS attack detected");
//                     setEnableSanitize(true); // Enable sanitize button
//                 } else if (error.response.status === 400) {
//                     alert("Bad Request: " + (error.response.data.message || "Invalid input"));
//                 } else {
//                     alert('Error logging in: ' + error.response.status);
//                 }
//             } else {
//                 alert('Network error or server is not responding');
//             }
//         }
//     };

//     const handleSanitize = async () => {
//         try {
//             const response = await axios.post('/users/login/sanitize', loginData);
//             if (response.status === 202) {
//                 alert('Login successful after sanitization');
//             } else {
//                 alert('Unexpected response status: ' + response.status);
//             }
//         } catch (error) {
//             if (error.response.status===409) {
//                 alert("no account exists with email id "+loginData.email);
//             } 
//             else if(error.response.status===401){
//                 alert("invalid password ");
//             }
//             else {
//                 alert('Network error or server is not responding');
//             }
//         }
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="email">Email:</label>
//                     <input 
//                         type="email" 
//                         id="email" 
//                         name="email" 
//                         value={loginData.email} 
//                         onChange={handleChange} 
//                         required 
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="password">Password:</label>
//                     <input 
//                         type="password" 
//                         id="password" 
//                         name="password" 
//                         value={loginData.password} 
//                         onChange={handleChange} 
//                         required 
//                     />
//                 </div>
//                 <button type="submit">Login</button>
//             </form>
//             <button 
//                 onClick={handleSanitize} 
//                 disabled={!enableSanitize}
//             >
//                 Sanitize
//             </button>
//             <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
//         </div>
//     );
// };

// export default Login;
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const Login = () => {
//     const [loginData, setLoginData] = useState({
//         email: '',
//         password: ''
//     });
//     const [enableSanitize, setEnableSanitize] = useState(false);
//     const [userData, setUserData] = useState(null);

//     const handleChange = (e) => {
//         setLoginData({
//             ...loginData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setEnableSanitize(false); // Disable sanitize button initially
//         setUserData(null); // Clear previous user data
//         try {
//             const response = await axios.post('/users/login', loginData);
//             if (response.status === 403) {
//                 alert("Potential XSS attack detected");
//                 setEnableSanitize(true); // Enable sanitize button
//             } else if (response.status === 202) {
//                 setUserData(response.data); // Set user data
//                 alert('Login successful');
//             } else {
//                 alert('Unexpected response status: ' + response.status);
//             }
//         } catch (error) {
//             if (error.response) {
//                 if (error.response.status === 403) {
//                     alert("Potential XSS attack detected");
//                     setEnableSanitize(true); // Enable sanitize button
//                 } else if (error.response.status === 400) {
//                     alert("Bad Request: " + (error.response.data.message || "Invalid input"));
//                 } else {
//                     alert('Error logging in: ' + error.response.status);
//                 }
//             } else {
//                 alert('Network error or server is not responding');
//             }
//         }
//     };

//     const handleSanitize = async () => {
//         try {
//             const response = await axios.post('/users/login/sanitize', loginData);
//             if (response.status === 202) {
//                 setUserData(response.data); // Set user data
//                 alert('Login successful after sanitization');
//             } else {
//                 alert('Unexpected response status: ' + response.status);
//             }
//         } catch (error) {
//             if (error.response.status === 409) {
//                 alert("No account exists with email id " + loginData.email);
//             } else if (error.response.status === 401) {
//                 alert("Invalid password");
//             } else {
//                 alert('Network error or server is not responding');
//             }
//         }
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="email">Email:</label>
//                     <input 
//                         type="email" 
//                         id="email" 
//                         name="email" 
//                         value={loginData.email} 
//                         onChange={handleChange} 
//                         required 
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="password">Password:</label>
//                     <input 
//                         type="password" 
//                         id="password" 
//                         name="password" 
//                         value={loginData.password} 
//                         onChange={handleChange} 
//                         required 
//                     />
//                 </div>
//                 <button type="submit">Login</button>
//             </form>
//             <button 
//                 onClick={handleSanitize} 
//                 disabled={!enableSanitize}
//             >
//                 Sanitize
//             </button>
//             {userData && (
//                 <div>
//                     <h3>User Information</h3>
//                     <p>User ID: {userData.id}</p>
//                     <p>Name: {userData.name}</p>
//                     <p>Email:{userData.email}</p>
//                 </div>
//             )}
//             <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
//         </div>
//     );
// };

// export default Login;
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Import CSS file for styling

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [enableSanitize, setEnableSanitize] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnableSanitize(false); // Disable sanitize button initially
        try {
            const response = await axios.post('/users/login', loginData);
            if (response.status === 403) {
                alert("Potential XSS attack detected");
                setEnableSanitize(true); // Enable sanitize button
            } else if (response.status === 202) {
                alert('Login successful');
                navigate('/yourcred', { state: { userData: response.data } });
            } else {
                alert('Unexpected response status: ' + response.status);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 403) {
                    alert("Potential XSS attack detected");
                    setEnableSanitize(true); // Enable sanitize button
                } else if (error.response.status === 400) {
                    alert("Bad Request: " + (error.response.data.message || "Invalid input"));
                } else {
                    alert('Error logging in: ' + error.response.status);
                }
            } else {
                alert('Network error or server is not responding');
            }
        }
    };

    const handleSanitize = async () => {
        try {
            const response = await axios.post('/users/login/sanitize', loginData);
            if (response.status === 202) {
                alert('Login successful after sanitization');
                navigate('/yourcred', { state: { userData: response.data } });
            } else {
                alert('Unexpected response status: ' + response.status);
            }
        } catch (error) {
            if (error.response.status === 409) {
                alert("No account exists with email id " + loginData.email);
            } else if (error.response.status === 401) {
                alert("Invalid password");
            } else {
                alert('Network error or server is not responding');
            }
        }
    };

    return (
        <div className="login-container"> {/* Apply a CSS class to style the container */}
            <div className="login-frame"> {/* Container frame */}
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={loginData.email} 
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
                            value={loginData.password} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <button 
                    onClick={handleSanitize} 
                    disabled={!enableSanitize}
                >
                    Sanitize
                </button>
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
        </div>
    );
};

export default Login;
