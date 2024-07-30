/* eslint-disable import/no-duplicates */
import type React from "react";
import { createContext, useState, useContext, useMemo } from "react";
import { type Wallet } from "thirdweb/wallets";
/* eslint-enable import/no-duplicates */
// Define the interface for the context properties
interface WalletContextProps {
  setWallet: (wallet: Wallet | null) => void;
  wallet: Wallet | null;
}

// Create the context with an undefined default value
const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC = ({ children }) => {
  // Initialize the wallet state with null by default
  const [wallet, setWallet] = useState<Wallet | null>();

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(() => ({ setWallet, wallet }), [wallet]);

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

// Define the return type for the useWallet hook
export const useWallet = (): WalletContextProps => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
