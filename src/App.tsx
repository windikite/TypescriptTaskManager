import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import TaskManager from './components/Dashboard';
import Login from './components/LogIn';
import { PrivateRoute } from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthProvider';
import { Auth0Provider } from '@auth0/auth0-react';
import Callback from './components/Callback';

const App: React.FC = () => {
  return (
    <Auth0Provider
      domain="dev-mr8lpfwb7850unha.us.auth0.com"
      clientId="G4dCLwSYFVsTWZpTZdmGaO7Rz25V0EtC"
      authorizationParams={{
        redirect_uri: 'http://localhost:3000/callback',
        scope: 'openid profile email',
      }}
    >
      <AuthProvider>
        <Router>
          <Container className="mt-5">
            <Routes>
              <Route path="/" element={<PrivateRoute component={TaskManager} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/callback" element={<Callback />} />
            </Routes>
          </Container>
        </Router>
      </AuthProvider>
    </Auth0Provider>
  );
};

export default App;

