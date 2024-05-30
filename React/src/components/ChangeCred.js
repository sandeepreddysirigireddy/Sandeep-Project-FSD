import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ChangeCred = () => {
    const { userId } = useParams(); // Access the userId URL parameter
    
    useEffect(() => {
        console.log('Component mounted');
        console.log('User ID:', userId); // Print the userId in the console
    }, [userId]);
    
    return (
        <div>
            <h2>Change Credentials</h2>
            <p>User ID: {userId}</p> {/* Print the userId in the component */}
            alert(2);
        </div>
    );
};

export default ChangeCred;
