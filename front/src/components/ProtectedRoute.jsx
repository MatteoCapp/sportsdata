import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    // lettura del token
    const { token } = useSelector((state) => state.auth);

    // se non c'è il token bisogna loggarsi
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // se c'è, renderizza il componente figlio, dashboard nel caso
    return children;
};

export default ProtectedRoute;