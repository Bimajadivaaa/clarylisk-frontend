// hooks/useLogin.ts
import { useState, ChangeEvent } from 'react';

interface LoginCredentials {
  walletAddress: string;
  password: string;
}

interface LoginResponse {
  token?: string;
  user?: any;
  message?: string;
}

export const useLogin = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    walletAddress: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Submit login
  const login = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://backend-clarylisk.vercel.app/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token in localStorage if needed
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    credentials,
    isLoading,
    error,
    isAuthenticated,
    handleChange,
    login,
  };
};