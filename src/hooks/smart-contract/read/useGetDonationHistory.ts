// hooks/useGetSaweransByPenyawer.ts
import { useState } from 'react';
import { CLARYLISK_CONTRACT, CLARYLISK_ABI } from "@/config/const";
import { useReadContract } from "wagmi";

// Type definitons for saweran data
export interface Saweran {
  creator: `0x${string}`;
  penyawer: `0x${string}`;
  value: bigint;
  note: string;
  createdAt: number;
  approved: boolean;
  discarded: boolean;
}

export interface SaweranResult {
  result: Saweran[];
  total: bigint;
}

export interface UseGetSaweransByPenyawerParams {
  penyawer: `0x${string}` | undefined;
  offset?: bigint | number;
  limit?: bigint | number;
  enabled?: boolean;
}

export const useGetSaweransByPenyawer = ({
  penyawer,
  offset = BigInt(0),
  limit = BigInt(10),
  enabled = true
}: UseGetSaweransByPenyawerParams) => {
  // Convert number types to bigint if needed
  const offsetBigInt = typeof offset === 'number' ? BigInt(offset) : offset;
  const limitBigInt = typeof limit === 'number' ? BigInt(limit) : limit;

  // Track pagination state
  const [currentOffset, setCurrentOffset] = useState<bigint>(offsetBigInt);
  const [currentLimit, setCurrentLimit] = useState<bigint>(limitBigInt);

  // Use wagmi's useReadContract to read from the smart contract
  const { 
    data, 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = useReadContract({
    address: CLARYLISK_CONTRACT,
    abi: CLARYLISK_ABI,
    functionName: 'getSaweransByPenyawer',
    args: [penyawer, currentOffset, currentLimit],
    query: {
      enabled: !!penyawer && enabled,
    }
  });

  // Process the response
  const sawerans: Saweran[] = Array.isArray(data) ? data[0] || [] : [];
  const total: bigint = Array.isArray(data) ? data[1] || BigInt(0) : BigInt(0);

  // Pagination handlers
  const nextPage = () => {
    const newOffset = currentOffset + currentLimit;
    setCurrentOffset(newOffset);
    return refetch();
  };

  const previousPage = () => {
    if (currentOffset >= currentLimit) {
      const newOffset = currentOffset - currentLimit;
      setCurrentOffset(newOffset);
      return refetch();
    }
    return Promise.resolve();
  };

  const goToPage = (page: number) => {
    const newOffset = BigInt(page - 1) * currentLimit;
    setCurrentOffset(newOffset);
    return refetch();
  };

  const changeLimit = (newLimit: number) => {
    setCurrentLimit(BigInt(newLimit));
    setCurrentOffset(BigInt(0)); // Reset to first page
    return refetch();
  };

  // Calculate pagination info
  const pageInfo = {
    currentPage: currentOffset / currentLimit + BigInt(1),
    totalPages: total > BigInt(0) ? (total + currentLimit - BigInt(1)) / currentLimit : BigInt(1),
    hasNextPage: currentOffset + currentLimit < total,
    hasPreviousPage: currentOffset > BigInt(0),
  };

  return {
    sawerans,
    total,
    isLoading,
    isError,
    error,
    refetch,
    pagination: {
      offset: currentOffset,
      limit: currentLimit,
      nextPage,
      previousPage,
      goToPage,
      changeLimit,
      ...pageInfo,
    },
  };
};