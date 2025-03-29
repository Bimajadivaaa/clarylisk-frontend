"use client";

import { useState } from "react";
import Image from "next/image";
import { Wallet, ChevronDown, ExternalLink, Copy, Check } from "lucide-react";
import { useDisconnect } from 'wagmi';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CustomConnectButton() {
  const [copied, setCopied] = useState(false);
  const { disconnect } = useDisconnect();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getExplorerLink = (address: string, chainId: number) => {
    // Sepolia explorer base URL
    const explorerBaseUrl = chainId === 11155111 
      ? 'https://sepolia.etherscan.io/address/'
      : `https://blockscan.com/address/`; // Fallback for other chains
    
    return `${explorerBaseUrl}${address}`;
  };

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Wallet
                  </Button>
                );
              }

              return (
                <div className="flex items-center gap-3">
                  <Button
                    onClick={openChainModal}
                    variant="outline"
                    className="border-white/20 hover:bg-white/10"
                  >
                    {chain.hasIcon && (
                      <div
                        className="mr-2"
                        style={{
                          background: chain.iconBackground,
                          width: 16,
                          height: 16,
                          borderRadius: 999,
                          overflow: "hidden",
                        }}
                      >
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            width={16}
                            height={16}
                            style={{ width: '100%', height: '100%' }}
                          />
                        )}
                      </div>
                    )}
                    <p className="text-black">{chain.name}</p>
                    <ChevronDown className="ml-1 w-4 h-4 text-black" />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                        <div className="flex items-center">
                          <span className="mr-2">{account.displayName}</span>
                          <div className="w-2 h-2 rounded-full bg-green-400 mr-1"></div>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-60 bg-gray-800 border border-white/10 text-white shadow-xl">
                      <div className="px-4 py-3">
                        <p className="text-xs text-white/60 mb-1">
                          Connected as
                        </p>
                        <p className="font-bold">{account.displayName}</p>
                        <div className="flex items-center mt-1">
                          <p className="text-sm text-white/60 truncate">
                            {account.address}
                          </p>
                          <button
                            onClick={() => copyToClipboard(account.address)}
                            className="ml-2 p-1 rounded-md hover:bg-white/10"
                          >
                            {copied ? (
                              <Check className="w-3 h-3 text-green-400" />
                            ) : (
                              <Copy className="w-3 h-3 text-white/60" />
                            )}
                          </button>
                        </div>
                      </div>

                      <DropdownMenuSeparator className="bg-white/10" />

                      <DropdownMenuItem
                        onClick={openAccountModal}
                        className="cursor-pointer focus:bg-white/10 px-4 py-2"
                      >
                        <div className="flex justify-between items-center w-full">
                          <span>Account Settings</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </DropdownMenuItem>

                      <DropdownMenuItem 
                        className="cursor-pointer focus:bg-white/10 px-4 py-2"
                        onClick={() => {
                          if (account?.address && chain?.id) {
                            window.open(
                              getExplorerLink(account.address, chain.id),
                              '_blank'
                            );
                          }
                        }}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span>View on Explorer</span>
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </DropdownMenuItem>

                      <DropdownMenuItem 
                        className="cursor-pointer focus:bg-white/10 px-4 py-2"
                        onClick={() => disconnect()}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span>Disconnect</span>
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}