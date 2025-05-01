// hooks/useProfile.ts
import { useState, useEffect } from 'react';

interface UserProfile {
  id: string;
  username: string;
  walletAddress: string;
  role: string;
  image?: string;
  description?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  // Add any other profile fields returned by your API
}

interface ProfileResponse {
  user?: UserProfile;
  message?: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user profile
  const fetchProfile = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('https://backend-clarylisk.vercel.app/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data: ProfileResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch profile');
      }

      if (data.user) {
        setProfile(data.user);
        return true;
      } else {
        throw new Error('Profile data not found');
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Automatically fetch profile when the hook is used
  useEffect(() => {
    fetchProfile();
  }, []);

  // Refresh profile data (useful after updates)
  const refreshProfile = () => {
    return fetchProfile();
  };

  return {
    profile,
    isLoading,
    error,
    refreshProfile,
  };
};