import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
    const [isValidToken, setIsValidToken] = useState(null);

    useEffect(() => {
        const validateToken = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                setIsValidToken(false);
                return;
            }

            try {
                await axios.get('http://localhost:5000/api/auth/validate-token', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setIsValidToken(true);
            } catch (error) {
                console.error('Token validation failed:', error);
                setIsValidToken(false);
            }
        };

        validateToken();
    }, []);

    if (isValidToken === null) {
        return <div>Loading...</div>;
    }

    return isValidToken ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
