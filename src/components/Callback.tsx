import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Callback: React.FC = () => {
  const { isLoading, handleRedirectCallback, error, isAuthenticated } = useAuth0();
  const navigate = useNavigate(); 

  useEffect(() => {
    const completeLogin = async () => {
      try {
        if (window.location.search.includes('code=')) {
          await handleRedirectCallback(); 
        }
        // If authenticated, redirect to dashboard
        if (isAuthenticated) {
          navigate('/');
        } else {
          navigate('/login'); // If not authenticated, redirect to login
        }
      } catch (err) {
        console.error('Error logging in', err);
        navigate('/login'); // If error, redirect to login page
      }
    };

    // Only complete login when the useEffect is triggered and loading is false
    if (!isLoading) {
      completeLogin();
    }
  }, [isLoading, handleRedirectCallback, isAuthenticated, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return null;
};

export default Callback;
