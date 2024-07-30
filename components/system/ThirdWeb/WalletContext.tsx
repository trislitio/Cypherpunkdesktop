/* eslint-disable import/no-duplicates */
import type React from "react";
import {
  createContext,
  useState,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { type Wallet } from "thirdweb/wallets";
/* eslint-enable import/no-duplicates */
// Define the interface for the context properties

interface WalletContextProps {
  setWallet: React.Dispatch<React.SetStateAction<Wallet | undefined>>;
  wallet: Wallet | undefined;
}

interface WalletProviderProps {
  children: ReactNode;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [wallet, setWallet] = useState<Wallet | undefined>();

  // Use useMemo to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ setWallet, wallet }), [wallet]);

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextProps => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
