import React, { useState } from 'react';
import axios from 'axios';

const StoreCred = () => {
    const [credData, setCredData] = useState({
        userId: '',
        credName: '',
        userName: '',
        password: ''
    });
    const [enableSanitize, setEnableSanitize] = useState(false);

    const handleChange = (e) => {
        setCredData({
            ...credData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/store', credData);
            if (response.status === 403) {
                const confirmed = window.confirm('Potential XSS attack detected. Do you want to sanitize and store the data?');
                if (confirmed) {
                    setEnableSanitize(true);
                }
            } else {
                
                alert(response.data.message);
            }
        } catch (error) {
            if(error.response.status===403)

                {
                    const confirmed = window.confirm('Potential XSS attack detected. Do you want to sanitize and store the data?');
                    if (confirmed) {
                        setEnableSanitize(true);
                    }  
                }
                else{
            console.error(error);
            
            alert('Error storing credentials: ' + (error.response?.data.message || error.message));
        }}
    };

    const handleSanitize = async () => {
        try {
            const response = await axios.post('http://localhost:8081/store/sanitize', credData);
            alert('Data sent successfully after sanitization '+response.data.message);
            window.location.href = '/store/sanitize'; // Redirect to another page
        } catch (error) {
            if(error.response.status===417)
                {
                    alert(error.response.data);
                }
                else{
            console.error(error);
            alert('Error sending data after sanitization: ' + (error.response?.data.message || error.message));
        }}
    };

    return (
        <div>
            <h2>Store Your Credentials</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="userId">User ID:</label>
                    <input 
                        type="text" 
                        id="userId" 
                        name="userId" 
                        value={credData.userId} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="credName">Credential Name:</label>
                    <input 
                        type="text" 
                        id="credName" 
                        name="credName" 
                        value={credData.credName} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="userName">Username:</label>
                    <input 
                        type="text" 
                        id="userName" 
                        name="userName" 
                        value={credData.userName} 
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
                        value={credData.password} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type="submit">Store Credentials</button>
            </form>
            <button onClick={handleSanitize} disabled={!enableSanitize}>
                Sanitize and Store
            </button>
        </div>
    );
};

export default StoreCred;
