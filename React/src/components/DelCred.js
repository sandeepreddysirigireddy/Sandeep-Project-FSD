import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const DelCred = ({ userId }) => {
    const location=useLocation();
    const [credId, setCredId] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setCredId(e.target.value);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        const parsedCredId = parseInt(credId, 10);
        if (isNaN(parsedCredId)) {
            setMessage('Invalid Credential ID. Please enter a valid integer.');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8081/delete/${parsedCredId}`);
            setMessage(response.data);
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response);
                setMessage(error.response.data);
            } else if (error.request) {
                console.error('Error request:', error.request);
                setMessage('No response received from server');
            } else {
                console.error('Error message:', error.message);
                setMessage(error.message);
            }
        }
    };

    return (
        <div>
            <h2>Delete Credential</h2>
            <p>User ID: {userId}</p>
            <form onSubmit={handleDelete}>
                <div>
                    <label htmlFor="credId">Enter Credential ID to Delete:</label>
                    <input 
                        type="text" 
                        id="credId" 
                        name="credId" 
                        value={credId} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type="submit">Delete</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default DelCred;
