// hooks/useGetCreator.ts
import { CLARYLISK_BACKEND } from '@/config/const';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Define types for the creator data structure based on the API response
interface Wallet {
  walletAdress: string;
}

interface SocialMedia {
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
}

interface Image {
  image: string;
}

interface Creator {
  idUser: number;
  username: string;
  role: string;
  description: string;
  wallet: Wallet[];
  medsos: SocialMedia[];
  image: Image[];
}

interface CreatorsResponse {
  total: number;
  data: Creator[];
}

export type { Creator };
export const useGetCreator = () => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch creators list
  const fetchCreators = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // const token = Cookies.get('token');
      // if (!token) {
      //   throw new Error('No authentication token found');
      // }

      const response = await fetch(`${CLARYLISK_BACKEND}/custom-api/creators`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        },
      });

      const data: CreatorsResponse = await response.json();
      console.log('data', data);

      if (!response.ok) {
        throw new Error('Failed to fetch creators');
      }

      setCreators(data.data);
      setTotal(data.total);
      return true;
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch creators on component mount
  useEffect(() => {
    fetchCreators();
  }, []);

  // Refresh creators list (useful when you need to update the list)
  const refreshCreators = () => {
    return fetchCreators();
  };

  return {
    creators,
    total,
    isLoading,
    error,
    refreshCreators,
  };
};