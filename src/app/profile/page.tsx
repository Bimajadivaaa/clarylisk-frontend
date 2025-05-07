"use client";

import { useProfile } from "@/hooks/API/useProfile";
import Image from "next/image";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Copy, 
  Check, 
  Edit,
  RefreshCw,
  User,
  Loader2,
} from "lucide-react";
import { useState, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRegisterCreatorContract } from "@/hooks/smart-contract/write/useRegisterCreatorContract";
import { useGetCreatorContract } from "@/hooks/smart-contract/read/useGetCreatorContract";
import { useGetDonationHistory } from "@/hooks/smart-contract/read/useGetDonationHistory";
import { useGetHistorySaweran } from "@/hooks/smart-contract/read/useGetHistorySaweran";
import { useApproveSaweran } from "@/hooks/smart-contract/write/useApproveSaweran";
import { useBurnSaweran } from "@/hooks/smart-contract/write/useBurnSaweran";
import { useGetContractBalance } from "@/hooks/smart-contract/read/useGetContractBalance";
import IDRXLogo from "../../../public/img/IDRXLogo.jpg";

// Fungsi konversi amount ke IDRX
function formatIDRX(value: string | number) {
  return Number(value).toLocaleString("en-US");
}

// Shorten address utility
const shortAddress = (addr: string) =>
  addr ? `${addr.substring(0, 6)}...${addr.slice(-4)}` : "";

export default function ProfilePage() {
  const { profile, isLoading, error, refreshProfile } = useProfile();
  const [copied, setCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  // Smart contract register hook
  const {
    registerCreator,
    isLoading: isRegisterLoading,
    isSuccess: isRegisterSuccess,
    isError: isRegisterError,
    error: registerError,
    hash: registerHash,
    reset: resetRegister,
  } = useRegisterCreatorContract();

  // Get wallet address from the profile data
  const getWalletAddress = () => {
    if (profile?.walletAddress) {
      return profile.walletAddress;
    }
    if (profile?.wallet && profile.wallet.length > 0) {
      return profile.wallet[0].walletAdress;
    }
    return "";
  };

  // Get creator contract address
  const walletAddress = getWalletAddress();
  const {
    contractAddress,
    isLoading: isContractLoading,
    isError: isContractError,
    error: contractError,
    refetch: refetchContract,
  } = useGetCreatorContract(walletAddress);

  // Donation history (from blockchain)
  const {
    donations,
    isLoading: isHistoryLoading,
    isError: isHistoryError,
    error: historyError,
    refetch: refetchHistory,
  } = useGetHistorySaweran(contractAddress || "");

  // Approve & Burn hooks
  const {
    approveSaweran,
    isLoading: isApproveLoading,
    isSuccess: isApproveSuccess,
    isError: isApproveError,
    error: approveError,
    hash: approveHash,
    reset: resetApprove,
  } = useApproveSaweran(contractAddress || "");
  const {
    burnSaweran,
    isLoading: isBurnLoading,
    isSuccess: isBurnSuccess,
    isError: isBurnError,
    error: burnError,
    hash: burnHash,
    reset: resetBurn,
  } = useBurnSaweran(contractAddress || "");

  // Get contract balances
  const {
    approved: contractApproved,
    pending: contractPending,
    discard: contractDiscard,
    isLoading: isBalanceLoading,
    isError: isBalanceError,
    error: balanceError,
    refetch: refetchBalance,
  } = useGetContractBalance(contractAddress || "");

  // Copy wallet address to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Copy contract address state
  const [copiedContract, setCopiedContract] = useState(false);
  const handleCopyContract = () => {
    if (contractAddress) {
      navigator.clipboard.writeText(contractAddress);
      setCopiedContract(true);
      setTimeout(() => setCopiedContract(false), 1500);
    }
  };

  // Handle refresh profile
  const handleRefresh = async () => {
    setRefreshing(true);
    setShowLoader(true);
    await refreshProfile();
    setRefreshing(false);
    setShowLoader(false);
  };

  // Get first letters of username for avatar fallback
  const getInitials = (name: string) => {
    if (!name) return "CL";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // State untuk filter dan search donation history
  const [donationStatus, setDonationStatus] = useState("all");
  const [donationSearch, setDonationSearch] = useState("");
  const [donationSort, setDonationSort] = useState("desc"); // desc: terbaru, asc: terlama

  // Filter, search, dan sort donations
  const filteredDonations = useMemo(() => {
    let result = [...donations];
    if (donationStatus !== "all") {
      if (donationStatus === "pending") result = result.filter(d => !d.approved && !d.discarded);
      if (donationStatus === "approved") result = result.filter(d => d.approved);
      if (donationStatus === "burned") result = result.filter(d => d.discarded);
    }
    if (donationSearch) {
      result = result.filter(d =>
        d.penyawer.toLowerCase().includes(donationSearch.toLowerCase()) ||
        (d.note && d.note.toLowerCase().includes(donationSearch.toLowerCase()))
      );
    }
    result = result.sort((a, b) => donationSort === "desc" ? b.createdAt - a.createdAt : a.createdAt - b.createdAt);
    return result;
  }, [donations, donationStatus, donationSearch, donationSort]);

  // Loading state with skeletons
  if (isLoading || refreshing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-6 flex items-center justify-center">
        <Card className="w-full max-w-xl bg-black/60 border border-gray-800 backdrop-blur-sm">
          <CardHeader className="flex flex-col items-center space-y-4">
            <Skeleton className="h-24 w-24 rounded-full bg-gray-800/50" />
            <div className="space-y-2 text-center">
              <Skeleton className="h-8 w-40 mx-auto bg-gray-800/50" />
              <Skeleton className="h-4 w-20 mx-auto bg-gray-800/50" />
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Wallet Address Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 bg-gray-800/50" />
              <Skeleton className="h-12 w-full rounded-md bg-gray-800/50" />
            </div>
            
            {/* Description Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 bg-gray-800/50" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-gray-800/50" />
                <Skeleton className="h-4 w-3/4 bg-gray-800/50" />
                <Skeleton className="h-4 w-1/2 bg-gray-800/50" />
              </div>
            </div>
            
            {/* Social Media Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 bg-gray-800/50" />
              <div className="flex space-x-2">
                <Skeleton className="h-8 w-8 rounded-full bg-gray-800/50" />
                <Skeleton className="h-8 w-8 rounded-full bg-gray-800/50" />
                <Skeleton className="h-8 w-8 rounded-full bg-gray-800/50" />
                <Skeleton className="h-8 w-8 rounded-full bg-gray-800/50" />
              </div>
            </div>
            
            {/* Action Buttons Skeleton */}
            <div className="flex justify-between pt-2">
              <Skeleton className="h-8 w-24 bg-gray-800/50" />
              <Skeleton className="h-8 w-40 bg-gray-800/50" />
            </div>
            {/* Blockchain Register Skeleton */}
            <div className="flex justify-center pt-4">
              <Skeleton className="h-10 w-56 bg-gray-800/50" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-6 flex items-center justify-center">
        <Card className="w-full max-w-xl bg-black/60 border border-gray-800 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-red-500 text-xl">
              Error Loading Profile
            </CardTitle>
            <CardDescription className="text-gray-400">{error}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button 
              variant="outline" 
              onClick={() => (window.location.href = "/login")}
              disabled={refreshing}
              className="flex items-center gap-2"
            >
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // No data state - keeping this for backup
  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-6 flex items-center justify-center">
        <Card className="w-full max-w-xl bg-black/60 border border-gray-800 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-gray-300 text-xl">
              No Profile Found
            </CardTitle>
            <CardDescription className="text-gray-400">
              Your profile could not be found. Please make sure you are logged
              in.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center space-x-4">
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </Button>
            <Button 
              variant="default"
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2"
            >
              {refreshing ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Refresh
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Get profile image source - handling the nested structure from the API
  const getProfileImage = () => {
    if (profile?.image && profile.image.length > 0 && profile.image[0].image) {
      return profile.image[0].image;
    }
    return "/1.png"; // Default image
  };

  // Truncate wallet address for display
  const truncateAddress = (address: string) => {
    if (!address || address.length < 10) return address || "-";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-6 flex items-center justify-center relative pt-[8rem]">
      {showLoader && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-white">Refreshing profile...</p>
          </div>
        </div>
      )}
      <Card className="w-full max-w-xl bg-black/60 border border-gray-800 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.07)] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300">
        <CardHeader className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Avatar className="h-24 w-24 border-2 border-primary/50 shadow-glow">
              <AvatarImage src={getProfileImage()} />
              <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary/40 text-white text-xl">
                {getInitials(profile?.username || "")}
              </AvatarFallback>
            </Avatar>
            <Badge 
              className="absolute -bottom-1 -right-1 px-2 py-1 bg-primary text-primary-foreground" 
              variant="default"
            >
              {profile?.role || "User"}
            </Badge>
          </div>
          
          <div className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-white">
              {profile?.username || "User"}
            </CardTitle>
            <CardDescription className="text-gray-400">
              Member since {new Date().getFullYear()}
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Wallet Address */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-300">
                Wallet Address
              </h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-gray-400 hover:text-primary"
                      onClick={() => copyToClipboard(getWalletAddress())}
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy wallet address</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="bg-gray-900/50 rounded-md p-3 border border-gray-800 text-gray-400 text-sm font-mono break-all">
              {truncateAddress(getWalletAddress())}
            </div>
          </div>
          
          {/* Description */}
          {profile?.description && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-300">About</h3>
              <ScrollArea className="max-h-32 rounded-md bg-gray-900/50 border border-gray-800 p-3">
                <p className="text-gray-400 text-sm">{profile.description}</p>
              </ScrollArea>
            </div>
          )}
          
          {/* Social Media */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-300">Social Media</h3>
            <div className="flex flex-wrap gap-2">
              {profile?.facebook && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="bg-gray-900/50 border-gray-800 text-blue-500 hover:text-blue-400 hover:bg-gray-800/50"
                        onClick={() =>
                          window.open(
                            `https://facebook.com/${profile.facebook}`,
                            "_blank",
                          )
                        }
                      >
                        <Facebook size={18} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{profile.facebook}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              
              {profile?.instagram && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="bg-gray-900/50 border-gray-800 text-pink-500 hover:text-pink-400 hover:bg-gray-800/50"
                        onClick={() =>
                          window.open(
                            `https://instagram.com/${profile.instagram}`,
                            "_blank",
                          )
                        }
                      >
                        <Instagram size={18} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{profile.instagram}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              
              {profile?.twitter && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="bg-gray-900/50 border-gray-800 text-blue-400 hover:text-blue-300 hover:bg-gray-800/50"
                        onClick={() =>
                          window.open(
                            `https://twitter.com/${profile.twitter}`,
                            "_blank",
                          )
                        }
                      >
                        <Twitter size={18} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{profile.twitter}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              
              {profile?.youtube && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="bg-gray-900/50 border-gray-800 text-red-500 hover:text-red-400 hover:bg-gray-800/50"
                        onClick={() =>
                          window.open(
                            `https://youtube.com/${profile.youtube}`,
                            "_blank",
                          )
                        }
                      >
                        <Youtube size={18} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{profile.youtube}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              
              {!profile?.facebook &&
                !profile?.instagram && 
                !profile?.twitter && 
                !profile?.youtube && (
                  <p className="text-gray-500 text-sm italic">
                    No social media profiles available
                  </p>
              )}
            </div>
          </div>
          
          <Separator className="bg-gray-800" />
          
          {/* Action Buttons */}
          <div className="flex justify-between pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-gray-400 bg-gray-900/50 border-gray-800 hover:bg-gray-800/50 hover:text-white"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              {refreshing ? (
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Refresh
            </Button>
          </div>
          {/* Blockchain Register Button & Status */}
          <div className="flex flex-col items-start gap-2 pt-4">
            {/* Show contract info if exists, else show register button */}
            {contractAddress &&
            contractAddress !== "0x0000000000000000000000000000000000000000" ? (
              <>
                <div className="text-green-400 text-sm text-left flex flex-col gap-1">
                  <span>Creator Contract:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base text-green-300">{shortAddress(contractAddress)}</span>
                    <button
                      onClick={handleCopyContract}
                      className="p-1 rounded hover:bg-gray-800 transition border border-gray-700"
                      title="Copy address"
                    >
                      {copiedContract ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                    </button>
                    <span className="text-xs text-gray-500 select-none">{copiedContract ? "Copied!" : ""}</span>
                  </div>
                </div>
                {/* Contract Balances - Redesigned */}
                <div className="mt-4 mb-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-lg bg-gradient-to-br from-green-900/40 to-green-800/10 border border-green-700 p-3 sm:p-4 flex flex-col items-center shadow">
                    <span className="text-xs sm:text-xs text-green-300 font-semibold mb-1">Approved</span>
                    <span className="text-xl sm:text-2xl font-bold text-green-400">{isBalanceLoading ? '...' : contractApproved.toLocaleString()} <span className="text-base font-normal"><Image src={IDRXLogo} alt="IDRX" width={20} height={20} className="inline-block rounded-full mb-2" /></span></span>
                  </div>
                  <div className="rounded-lg bg-gradient-to-br from-yellow-900/40 to-yellow-800/10 border border-yellow-700 p-3 sm:p-4 flex flex-col items-center shadow">
                    <span className="text-xs sm:text-xs text-yellow-300 font-semibold mb-1">Pending</span>
                    <span className="text-xl sm:text-2xl font-bold text-yellow-400">{isBalanceLoading ? '...' : contractPending.toLocaleString()} <span className="text-base font-normal"><Image src={IDRXLogo} alt="IDRX" width={20} height={20} className="inline-block rounded-full mb-2" /></span></span>
                  </div>
                  <div className="rounded-lg bg-gradient-to-br from-red-900/40 to-red-800/10 border border-red-700 p-3 sm:p-4 flex flex-col items-center shadow">
                    <span className="text-xs sm:text-xs text-red-300 font-semibold mb-1">Burned</span>
                    <span className="text-xl sm:text-2xl font-bold text-red-400">{isBalanceLoading ? '...' : contractDiscard.toLocaleString()} <span className="text-base font-normal"><Image src={IDRXLogo} alt="IDRX" width={20} height={20} className="inline-block rounded-full mb-2" /></span></span>
                  </div>
                </div>
                {isBalanceError && (
                  <div className="text-red-400 text-xs mb-2">Failed to load balance</div>
                )}
                {/* Donation History */}
                <Separator className="bg-gray-800 my-4" />
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-300 mb-2">
                    Creator Donation History
                  </h3>
                  {/* Filter & Search Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4 overflow-x-auto">
                    <div className="flex gap-1 flex-wrap">
                      <button onClick={() => setDonationStatus("all")} className={`px-3 py-1 rounded text-xs font-semibold border ${donationStatus === "all" ? "bg-primary text-white border-primary" : "bg-gray-900 text-gray-400 border-gray-700 hover:bg-gray-800"}`}>All</button>
                      <button onClick={() => setDonationStatus("pending")} className={`px-3 py-1 rounded text-xs font-semibold border ${donationStatus === "pending" ? "bg-yellow-500 text-black border-yellow-500" : "bg-gray-900 text-yellow-400 border-gray-700 hover:bg-gray-800"}`}>Pending</button>
                      <button onClick={() => setDonationStatus("approved")} className={`px-3 py-1 rounded text-xs font-semibold border ${donationStatus === "approved" ? "bg-green-500 text-black border-green-500" : "bg-gray-900 text-green-400 border-gray-700 hover:bg-gray-800"}`}>Approved</button>
                      <button onClick={() => setDonationStatus("burned")} className={`px-3 py-1 rounded text-xs font-semibold border ${donationStatus === "burned" ? "bg-red-500 text-white border-red-500" : "bg-gray-900 text-red-400 border-gray-700 hover:bg-gray-800"}`}>Burned</button>
                    </div>
                    <input
                      type="text"
                      placeholder="Search notes..."
                      className="px-3 py-1 rounded bg-gray-900 border border-gray-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-primary min-w-0 w-full sm:w-auto"
                      value={donationSearch}
                      onChange={e => setDonationSearch(e.target.value)}
                      style={{ minWidth: 0, maxWidth: 260 }}
                    />
                    <select
                      className="px-2 py-1 rounded bg-gray-900 border border-gray-700 text-sm text-white w-full sm:w-auto"
                      value={donationSort}
                      onChange={e => setDonationSort(e.target.value)}
                    >
                      <option value="desc">Newest</option>
                      <option value="asc">Oldest</option>
                    </select>
                  </div>
                  {isHistoryLoading ? (
                    <div className="text-gray-400 text-xs">
                      Loading donation history...
                    </div>
                  ) : isHistoryError ? (
                    <div className="text-red-400 text-xs">
                      {historyError?.message ||
                        "Failed to load donation history."}
                    </div>
                  ) : filteredDonations.length === 0 ? (
                    <div className="text-gray-500 text-xs">
                      No donations found.
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {filteredDonations.map((donation, idx) => (
                        <div
                          key={donation.penyawer + "-" + donation.createdAt + "-" + idx}
                          className={`bg-gray-800/70 rounded-md p-3 sm:p-4 text-xs sm:text-sm text-gray-200 flex flex-col gap-2 w-full max-w-2xl mx-auto text-left break-all shadow-sm border border-gray-700 ${!(donation.approved || donation.discarded) ? "ring-2 ring-yellow-400/60" : ""}`}
                        >
                          <div className="break-all">
                            <span className="font-semibold">From:</span>{" "}
                            <span className="break-all">{donation.penyawer}</span>
                          </div>
                          <div>
                            <span className="font-semibold">Amount:</span>{" "}
                            {formatIDRX(donation.value)} IDRX <Image src={IDRXLogo} alt="IDRX" width={15} height={15} className="inline-block rounded-full mb-1" />
                          </div>
                          {donation.note && (
                            <div className="break-words">
                              <span className="font-semibold">Note:</span>{" "}
                              {donation.note}
                            </div>
                          )}
                          <div>
                            <span className="font-semibold">Date:</span>{" "}
                            {new Date(
                              donation.createdAt * 1000,
                            ).toLocaleString()}
                          </div>
                          <div>
                            <span className="font-semibold">Status:</span>{" "}
                            <span
                              className={`${donation.approved ? "text-green-400" : donation.discarded ? "text-red-400" : "text-yellow-400"}`}
                            >
                              {donation.approved
                                ? "Approved"
                                : donation.discarded
                                  ? "Burned"
                                  : "Pending"}
                            </span>
                          </div>
                          {/* Tombol aksi jika pending */}
                          {!(donation.approved || donation.discarded) && (
                            <div className="flex flex-col sm:flex-row gap-2 mt-2 sticky bottom-0 z-10">
                              <Button
                                size="sm"
                                className="bg-green-500 hover:bg-green-600 w-full sm:w-auto"
                                disabled={isApproveLoading || isBurnLoading}
                                onClick={() => approveSaweran(idx)}
                              >
                                {isApproveLoading ? "Accepting..." : "Accept"}
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                className="w-full sm:w-auto"
                                disabled={isApproveLoading || isBurnLoading}
                                onClick={() => burnSaweran(idx)}
                              >
                                {isBurnLoading ? "Burning..." : "Burn"}
                              </Button>
                            </div>
                          )}
                          {/* Tampilkan error jika ada */}
                          {isApproveError && (
                            <div className="text-red-400 text-xs">
                              {approveError?.message || "Failed to approve."}
                            </div>
                          )}
                          {isBurnError && (
                            <div className="text-red-400 text-xs">
                              {burnError?.message || "Failed to burn."}
                            </div>
                          )}
                          {isApproveSuccess && (
                            <div className="text-green-400 text-xs">
                              Donation approved!
                            </div>
                          )}
                          {isBurnSuccess && (
                            <div className="text-yellow-400 text-xs">
                              Donation burned!
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
              </div>
              </>
            ) : (
              <Button
                onClick={registerCreator}
                disabled={isRegisterLoading}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white w-56"
              >
                {isRegisterLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Registering...
                  </>
                ) : (
                  "Register On Blockchain"
                )}
              </Button>
            )}
            {isRegisterSuccess && (
              <div className="text-green-500 text-sm mt-5">
                Registration on blockchain successful!
              </div>
            )}
            {isRegisterError && (
              <div className="text-red-500 text-sm">
                {registerError?.message || "Blockchain registration failed."}
              </div>
            )}
            {isContractLoading && (
              <div className="text-blue-400 text-xs flex items-center gap-2">
                <Loader2 className="animate-spin h-4 w-4" />
                Checking contract...
              </div>
            )}
            {isContractError && (
              <div className="text-red-400 text-xs">
                {contractError?.message || "Failed to check contract."}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
