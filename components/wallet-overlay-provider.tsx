"use client";

import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { createContext, useContext } from "react";

const WalletOverlayContext = createContext<{
  open: () => void;
}>({
  open: () => {},
});

export function WalletOverlayProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setVisible } = useWalletModal();

  return (
    <WalletOverlayContext.Provider value={{ open: () => setVisible(true) }}>
      {children}
    </WalletOverlayContext.Provider>
  );
}

export function useWalletOverlay() {
  return useContext(WalletOverlayContext);
}
