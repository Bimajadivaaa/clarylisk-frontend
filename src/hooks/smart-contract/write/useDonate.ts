import { useState, useEffect } from 'react';
import { 
  useWriteContract, 
  useWaitForTransactionReceipt,
} from 'wagmi';
import { IDRX_CONTRACT, IDRX_ABI, CREATOR_HUB_CONTRACT, CREATOR_HUB_ABI } from "@/config/const";
import { parseEther } from 'viem';

interface DonateResult {
  isLoading: boolean;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
  approveHash: `0x${string}` | null;
  donateHash: `0x${string}` | null;
  approveReceipt: any | null;
  donateReceipt: any | null;
  donate: (creatorAddress: string, amount: string, note: string) => void;
  reset: () => void;
  currentStep: 'idle' | 'approving' | 'approved' | 'donating' | 'completed' | 'error';
}

/**
 * Hook for donating to a creator contract
 * First approves IDRX token spending, then calls the sawer function
 * @returns Object containing donation state and functions
 */
export const useDonate = (): DonateResult => {
  const [approveHash, setApproveHash] = useState<`0x${string}` | null>(null);
  const [donateHash, setDonateHash] = useState<`0x${string}` | null>(null);
  const [approvedAmount, setApprovedAmount] = useState<string | null>(null);
  const [targetCreator, setTargetCreator] = useState<string | null>(null);
  const [donationNote, setDonationNote] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<'idle' | 'approving' | 'approved' | 'donating' | 'completed' | 'error'>('idle');
  
  // Use wagmi's useWriteContract hook for token approval
  const { 
    writeContract: writeApprove, 
    isPending: isApprovePending, 
    isSuccess: isApproveSuccess,
    isError: isApproveError,
    error: approveError,
    reset: resetApprove
  } = useWriteContract();
  
  // Use wagmi's useWriteContract hook for donation
  const { 
    writeContract: writeDonate, 
    isPending: isDonatingPending, 
    isSuccess: isDonatingSuccess,
    isError: isDonatingError,
    error: donatingError,
    reset: resetDonate
  } = useWriteContract();
  
  // Use wagmi's useWaitForTransactionReceipt to track approval confirmation
  const { 
    data: approveReceipt, 
    isLoading: isApproveLoading,
    isSuccess: isApproveReceiptSuccess,
    isError: isApproveReceiptError,
  } = useWaitForTransactionReceipt({
    hash: approveHash || undefined,
  });
  
  // Use wagmi's useWaitForTransactionReceipt to track donation confirmation
  const { 
    data: donateReceipt, 
    isLoading: isDonateLoading,
    isSuccess: isDonateReceiptSuccess,
    isError: isDonateReceiptError,
  } = useWaitForTransactionReceipt({
    hash: donateHash || undefined,
  });
  
  // Effect to handle state transitions
  useEffect(() => {
    if (isApproveReceiptSuccess && currentStep === 'approving') {
      setCurrentStep('approved');
    }
    
    if (isDonateReceiptSuccess && currentStep === 'donating') {
      setCurrentStep('completed');
    }
    
    if ((isApproveReceiptError && currentStep === 'approving') || 
        (isDonateReceiptError && currentStep === 'donating')) {
      setCurrentStep('error');
    }
  }, [
    isApproveReceiptSuccess, 
    isDonateReceiptSuccess, 
    isApproveReceiptError, 
    isDonateReceiptError, 
    currentStep
  ]);
  
  // This effect handles the donation after approval is completed
  useEffect(() => {
    const executeDonation = async () => {
      if (currentStep === 'approved' && approvedAmount && targetCreator && donationNote) {
        setCurrentStep('donating');
        
        writeDonate(
          {
            address: targetCreator as `0x${string}`,
            abi: CREATOR_HUB_ABI,
            functionName: 'sawer',
            args: [approvedAmount, donationNote],
          },
          {
            onSuccess: (hash) => {
              setDonateHash(hash);
              // The state will transition to 'completed' once the receipt is confirmed
            },
            onError: () => {
              setCurrentStep('error');
            }
          }
        );
      }
    };
    
    executeDonation();
  }, [currentStep, approvedAmount, targetCreator, donationNote, writeDonate]);
  
  // Execute the donation process (approval then sawer)
  const donate = (creatorAddress: string, amount: string, note: string) => {
    // Reset any previous state
    resetApprove();
    resetDonate();
    setApproveHash(null);
    setDonateHash(null);
    setCurrentStep('approving');
    
    try {
      // Parse the amount as uint256 with 18 decimal places
      // For example, if amount is "1", this will be converted to 1 * 10^18
      const amountInWei = amount.toString();
      
      // Store the values for later use after approval
      setApprovedAmount(amountInWei);
      setTargetCreator(creatorAddress);
      setDonationNote(note);
      
      // Step 1: Approve IDRX token spending
      writeApprove(
        {
          address: IDRX_CONTRACT,
          abi: IDRX_ABI,
          functionName: 'approve',
          args: [creatorAddress, amountInWei],
        },
        {
          onSuccess: (hash) => {
            setApproveHash(hash);
            // The state will transition to 'approved' once the receipt is confirmed
          },
          onError: (error) => {
            console.error("Approval error:", error);
            setCurrentStep('error');
          }
        }
      );
    } catch (error) {
      console.error("Error processing donation:", error);
      setCurrentStep('error');
    }
  };
  
  // Reset function to clear state
  const reset = () => {
    resetApprove();
    resetDonate();
    setApproveHash(null);
    setDonateHash(null);
    setApprovedAmount(null);
    setTargetCreator(null);
    setDonationNote(null);
    setCurrentStep('idle');
  };
  
  // Combine states from both hooks for simpler external usage
  const isLoading = isApprovePending || isApproveLoading || isDonatingPending || isDonateLoading;
  const isPending = isApprovePending || isDonatingPending;
  const isSuccess = currentStep === 'completed';
  const isError = isApproveError || isApproveReceiptError || isDonatingError || isDonateReceiptError;
  const error = approveError || donatingError;
  
  return {
    isLoading,
    isPending,
    isSuccess,
    isError,
    error,
    approveHash,
    donateHash,
    approveReceipt,
    donateReceipt,
    donate,
    reset,
    currentStep
  };
};

export default useDonate;