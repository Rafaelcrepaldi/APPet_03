import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('token'); // Verifica se o token existe no localStorage

  return isAuthenticated ? children : <Navigate to="/auth/login" />;
}

export default PrivateRoute;
