// hooks/useCreators.ts
import { useState, useEffect } from 'react';

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

export const useCreators = () => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch creators list
  const fetchCreators = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://backend-clarylisk.vercel.app/creators', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data: CreatorsResponse = await response.json();

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