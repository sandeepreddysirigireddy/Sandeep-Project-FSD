import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Maincred.css';
import './CredentialsTable.css';

const YourCred = () => {
    const location = useLocation();
    const { userData } = location.state || {};
    const [credIdToDelete, setCredIdToDelete] = useState('');
    const [showDeleteInput, setShowDeleteInput] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState('');
    const [message, setMessage] = useState('');


   // const [credentials, setCredentials] = useState([]);
   // const [showCredentials, setShowCredentials] = useState(false);
//    const [sanitizedCredentials, setSanitizedCredentials] = useState([]);
//    const [unsanitizedCredentials, setUnsanitizedCredentials] = useState([]);


    const [credId, setCredId] = useState('');
    const [credName, setCredName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [changeMessage, setChangeMessage] = useState('');
    const [showChangeInput, setShowChangeInput] = useState(false);
    const [showSanitizeButton, setShowSanitizeButton] = useState(false);

    const [storeCredName, setStoreCredName] = useState('');
    const [storeUserName, setStoreUserName] = useState('');
    const [storePassword, setStorePassword] = useState('');
    const [enableSanitize, setEnableSanitize] = useState(false);
    const [showStoreInput, setShowStoreInput] = useState(false);
 // Define setLoading and setCredentials
 const [loading, setLoading] = useState(false);
 const [credentials, setCredentials] = useState([]);
    const handleInputChange = (e, setState) => {
        setState(e.target.value);
    };

    const handleDeleteInputChange = (e) => {
        setCredIdToDelete(e.target.value);
    };
    
    const handleDelete = async () => {
        
            // Check if credIdToDelete is empty
            if (!credIdToDelete) {
                alert('Credential ID entered is empty!');
                return;
            }
        try {
            const parsedUserId = parseInt(userData.id, 10);
            const parsedCredId = parseInt(credIdToDelete, 10);

            const response = await axios.put(`http://localhost:8082/delete/${parsedUserId}/${parsedCredId}`);
            setMessage(response.data);
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response);
                alert(error.response.data);
            } else if (error.request) {
                console.error('Error request:', error.request);
                alert('No response received from server');
            } else {
                console.error('Error message:', error.message);
                alert(error.message);
            }
        }
    };

    const handleChangeCredentials = async () => {
        if (!credId || !credName || !userName || !password) {
            alert('All fields are required');
            return;
        }
        if (isNaN(credId)) {
            alert('Credential ID must be an integer');
            return;
        }

        const parsedCredId = parseInt(credId, 10);
        const userId = userData ? parseInt(userData.id, 10) : null;


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
            const passwordValidationMessage = validatePassword(password);
            if (passwordValidationMessage) {
                alert(passwordValidationMessage);
                return;
            }




        try {
            const response = await axios.post(`http://localhost:8082/changeCred/${userId}/${parsedCredId}`, {
                credName,
                userName,
                password,
            });
            setChangeMessage(response.data);
           // alert(response.data);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    alert('Potential XSS detected. Do you want to sanitize and store input?');
                    setShowSanitizeButton(true);
                } else {
                    console.error('Error response:', error.response);
                    alert(error.response.data);
                }
            } else if (error.request) {
                console.error('Error request:', error.request);
                alert('No response received from server');
            } else {
                console.error('Error message:', error.message);
                alert(error.message);
            }
        }
    };

    const handleSanitize = async () => {
        const parsedCredId = parseInt(credId, 10);
        const userId = userData ? parseInt(userData.id, 10) : null;
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
            const passwordValidationMessage = validatePassword(password);
            if (passwordValidationMessage) {
                alert(passwordValidationMessage);
                return;
            }
        try {
            const response = await axios.post(`http://localhost:8082/changeCred/${userId}/${parsedCredId}/sanitize`, {
                credName,
                userName,
                password,
            });
            setChangeMessage(response.data);
            alert(response.data);
            setShowSanitizeButton(false);
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response);
                alert(error.response.data);
            } else if (error.request) {
                console.error('Error request:', error.request);
                alert('No response received from server');
            } else {
                console.error('Error message:', error.message);
                alert(error.message);
            }
        }
    };

    const handleStoreCredentials = async () => {
        if (!storeCredName || !storeUserName || !storePassword) {
            alert('All fields are required');
            return;
        }

        const userId = userData ? parseInt(userData.id, 10) : null;

        const credData = {
            userId,
            credName: storeCredName,
            userName: storeUserName,
            password: storePassword
        };




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
            const passwordValidationMessage = validatePassword(credData.password);
            if (passwordValidationMessage) {
                alert(passwordValidationMessage);
                return;
            }





        try {
            const response = await axios.post('http://localhost:8082/store', credData);

            if (response.status === 403) {
                const confirmed = window.confirm('Potential XSS attack detected. Do you want to sanitize and store the data?');
                if (confirmed) {
                    setEnableSanitize(true);
                }
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                const confirmed = window.confirm('Potential XSS attack detected. Do you want to sanitize and store the data?');
                if (confirmed) {
                    setEnableSanitize(true);
                }
            } 
            else  if (error.response && error.response.status === 409) {
                alert("Conflict : Credential "+storeCredName+ " aldready exists for user account with user id "+userId);
            }
            else {
                console.error(error);
                alert('Error storing credentials: ' + (error.response.data));
            }
        }
    };

    const handleSanitizeAndStore = async () => {
        const userId = userData ? parseInt(userData.id, 10) : null;

        const credData = {
            userId,
            credName: storeCredName,
            userName: storeUserName,
            password: storePassword
        };

        try {
            const response = await axios.post('http://localhost:8082/store/sanitize', credData);

            alert('Data sent successfully after sanitization: ' + response.data.message);
            setEnableSanitize(false);
        } catch (error) {
            if (error.response && error.response.status === 417) {
                alert(error.response.data);
            } else {
                console.error(error);
                alert('Error sending data after sanitization: ' + (error.response?.data.message || error.message));
            }
        }
    };

    const [errorMessage, setErrorMessage] = useState('');

    const handleClick = async () => {
        setLoading(true);
        try {
            const userId = userData ? userData.id : null;

            const response = await axios.get(`http://localhost:8082/getAllCred/${userId}`);
            if (response.status === 404) {
                setErrorMessage('No records found');
            } else if (response.status === 202) {
                setCredentials(response.data);
            }
        } catch (error) {
            if(error.response.status===404)
                {
                    alert("no records found");
                }
           // console.error('Error:', error);
            //setErrorMessage('Failed to fetch credentials');
        } finally {
            setLoading(false);
        }
    };





    return (
        <div style={styles.container}>
            {/* <h2>Your Credentials</h2> */}
            {userData ? (
            <div>
            <h2>WELCOME <b>{userData.name}</b></h2>
                    <p>User ID: {userData.id}</p>
                    <p>Name: {userData.name}</p>
                    <p>Email: {userData.email}</p>
                    {/* <p>{userData.message}</p> */}
                </div>
            ) : (
                <p>No user data available.</p>
            )}

            <button style={styles.redButton} onClick={() => setShowDeleteInput(true)}>Delete Credentials</button>
            {showDeleteInput && (
                <div>
                    <input 
                        type="text" 
                        value={credIdToDelete} 
                        onChange={handleDeleteInputChange} 
                        placeholder="Enter Credential ID to delete" 
                    />
                    <button onClick={handleDelete}>Delete</button>
                    {deleteMessage && <p>{deleteMessage}</p>}
                </div>
            )}
            <br /><br />
            
       


            <button style={styles.orangeButton} onClick={handleClick}>Fetch Credentials</button>
            {loading && <p>Loading...</p>}
            {errorMessage && <p>{errorMessage}</p>}
            {credentials.length > 0 && (
                            <div className="table-container">

                <table>
                    <thead>
                        <tr>
                            <th>Credential ID</th>
                            <th>Credential Name</th>
                            <th>Username</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {credentials.map((cred, index) => (
                            <tr key={index} >
                                <td>{cred.credId}</td>
                                <td>{cred.credName}</td>
                                <td>{cred.userName}</td>
                                <td>{cred.password}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            )}










            <br></br><br></br>
            <button style={styles.blueButton} onClick={() => setShowChangeInput(true)}>Change Credentials</button>
            {showChangeInput && (
                <div>
                    <input 
                        type="text" 
                        value={credId} 
                        onChange={(e) => handleInputChange(e, setCredId)} 
                        placeholder="Enter Credential ID" 
                    />
                    <input 
                        type="text" 
                        value={credName} 
                        onChange={(e) => handleInputChange(e, setCredName)} 
                        placeholder="Enter Credential Name" 
                    />
                    <input 
                        type="text" 
                        value={userName} 
                        onChange={(e) => handleInputChange(e, setUserName)} 
                        placeholder="Enter Username" 
                    />
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => handleInputChange(e, setPassword)} 
                        placeholder="Enter Password" 
                    />
                    <button onClick={handleChangeCredentials}>Submit</button>
                    {showSanitizeButton && (
                        <button onClick={handleSanitize}>Sanitize</button>
                    )}
                    {changeMessage && <p>{changeMessage}</p>}
                </div>
            )}
            <br /><br />

            {/* <h2>Store Your Credentials</h2> */}
            <button style={styles.greenButton} onClick={() => setShowStoreInput(true)}>Store Credentials</button>
            {showStoreInput && (
                <div>
                    <input 
                        type="text" 
                        value={storeCredName} 
                        onChange={(e) => handleInputChange(e, setStoreCredName)} 
                        placeholder="Enter Credential Name" 
                    />
                    <input 
                        type="text" 
                        value={storeUserName} 
                        onChange={(e) => handleInputChange(e, setStoreUserName)} 
                        placeholder="Enter Username" 
                    />
                    <input 
                        type="password" 
                        value={storePassword} 
                        onChange={(e) => handleInputChange(e, setStorePassword)} 
                        placeholder="Enter Password" 
                    />
                    <button onClick={handleStoreCredentials}>Store Credentials</button>
                    <button onClick={handleSanitizeAndStore} disabled={!enableSanitize}>Sanitize and Store</button>
                </div>
            )}
        </div>
    );
    
};
const styles = {
   
   
        container: {
            backgroundColor: '#f0f0f0',
            border: '3px solid purple',
            borderRadius: '5px',
            padding: '20px',
            maxWidth: '800px', // Increase the maximum width
            width: '60%', // Set a specific width
            margin: 'auto', // Center horizontally
            position: 'absolute', // Position absolutely
            top: '50%', // Move the top edge to the middle
            left: '50%', // Move the left edge to the middle
            transform: 'translate(-50%, -50%)', // Move back half the width and half the height
        },
        redButton: {
            backgroundColor: 'tomato',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            margin: '5px',
            cursor: 'pointer',
        },
        greenButton: {
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            margin: '5px',
            cursor: 'pointer',
        },
        blueButton: {
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            margin: '5px',
            cursor: 'pointer',
        },
        orangeButton:{
            backgroundColor:'orange',
            color:'white',
            border:'none',
            borderRadius:'5px',
            padding:'10px 20px',
            margin:'5px',
            cursor:'pointer',
        }
    
    
    
};

export default YourCred;
