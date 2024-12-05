import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { isAuthenticated: auth0IsAuthenticated, loginWithRedirect, logout: auth0Logout, getAccessTokenSilently, isLoading, handleRedirectCallback, error, user } = useAuth0();
  const [token, setToken] = useState<string | null>(sessionStorage.getItem('authToken'));

  const login = () => {
    loginWithRedirect(); 
  };

  const logout = () => {
    auth0Logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
    sessionStorage.removeItem('authToken');
    setToken(null);
  };

  useEffect(() => {
    if (auth0IsAuthenticated) {
      // store the token in sessionStorage
      getAccessTokenSilently().then((fetchedToken) => {
        sessionStorage.setItem('authToken', fetchedToken);
        setToken(fetchedToken);
      });
    } else {
      // clear session storage and reset token if not authenticated
      sessionStorage.removeItem('authToken');
      setToken(null);
    }
  }, [auth0IsAuthenticated, getAccessTokenSilently]);

  return (
    <AuthContext.Provider value={{ isAuthenticated: auth0IsAuthenticated, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the authentication context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
