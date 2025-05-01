'use client';

import React from "react";
import { Config, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { XellarKitProvider, defaultConfig, darkTheme } from "@xellar/kit";
import { liskSepolia } from "viem/chains";

const config = defaultConfig({
  appName: "Xellar",
  // Required for WalletConnect
  walletConnectProjectId: 'fe575b36234dc9b54e34a40e332d7f92',

  // Required for Xellar Passport
  xellarAppId: 'db10403c-8583-4708-a126-62a799d4f1f6',
  xellarEnv: "sandbox",
  ssr: false, // Changed to false since we're not using Next.js App Router
  chains: [liskSepolia], // Added chain configuration
}) as Config;

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <XellarKitProvider
          theme={darkTheme}
        >
          {children}
        </XellarKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};