"use client";

import { SolanaWalletProvider } from "@/components/wallet-provider";
import { WalletOverlayProvider } from "@/components/wallet-overlay-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SolanaWalletProvider>
      <WalletOverlayProvider>{children}</WalletOverlayProvider>
    </SolanaWalletProvider>
  );
}
