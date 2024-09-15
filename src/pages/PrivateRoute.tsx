import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase';
import Loader from '../components/Loader';

interface PrivateRouteProps {
    children: React.ReactElement; // Use children instead of element
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
            console.log(user);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <Loader />; 
    }

    return user ? children : <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
