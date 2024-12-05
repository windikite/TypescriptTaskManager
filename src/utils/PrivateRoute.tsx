import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

interface PrivateRouteProps {
  component: React.FC;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Component />;
};
