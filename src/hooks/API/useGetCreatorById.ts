// hooks/useCreatorById.ts
import { useState, useEffect } from 'react';

// Define types for the creator data structure
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

export const useCreatorById = (creatorId: number | string) => {
  const [creator, setCreator] = useState<Creator | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch creator by ID
  const fetchCreator = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://backend-clarylisk.vercel.app/creators/${creatorId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch creator with ID ${creatorId}`);
      }

      const data: Creator = await response.json();
      setCreator(data);
      return true;
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch creator when component mounts or creatorId changes
  useEffect(() => {
    if (creatorId) {
      fetchCreator();
    }
  }, [creatorId]);

  // Refresh creator data
  const refreshCreator = () => {
    return fetchCreator();
  };

  return {
    creator,
    isLoading,
    error,
    refreshCreator,
  };
};