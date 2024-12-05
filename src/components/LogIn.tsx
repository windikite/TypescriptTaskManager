import React from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const Login: React.FC = () => {
  const { loginWithRedirect, error } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <div>
      <h2>Log In</h2>
      {error && <Alert variant="danger">{error.message}</Alert>}

      <Button variant="primary" onClick={handleLogin}>
        Log In
      </Button>
    </div>
  );
};

export default Login;
