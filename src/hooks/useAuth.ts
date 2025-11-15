import { useState } from 'react';
import { authService } from '@/lib/auth';
import type { LoginCredentials } from '@/types/api';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authService.login(credentials);
      setIsLoading(false);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Login failed';
      setError(errorMessage);
      setIsLoading(false);
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    authService.logout();
  };

  const isAuthenticated = () => {
    return authService.isAuthenticated();
  };

  const getUser = () => {
    return authService.getUser();
  };

  return {
    login,
    logout,
    isAuthenticated,
    getUser,
    isLoading,
    error,
  };
}


