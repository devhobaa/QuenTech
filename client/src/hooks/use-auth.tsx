import { useState, useEffect } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
      const loginTime = localStorage.getItem('adminLoginTime');
      
      if (isAuthenticated && loginTime) {
        // Check if login is still valid (24 hours)
        const loginDate = new Date(loginTime);
        const now = new Date();
        const hoursDiff = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60);
        
        if (hoursDiff > 24) {
          // Session expired
          logout();
          return;
        }
      }
      
      setAuthState({
        isAuthenticated,
        isLoading: false
      });
    };

    checkAuth();
  }, []);

  const login = () => {
    setAuthState({
      isAuthenticated: true,
      isLoading: false
    });
  };

  const logout = () => {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminLoginTime');
    setAuthState({
      isAuthenticated: false,
      isLoading: false
    });
  };

  return {
    ...authState,
    login,
    logout
  };
}
