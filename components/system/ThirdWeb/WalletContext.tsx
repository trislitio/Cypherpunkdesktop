// components/system/ThirdWeb/WalletContext.tsx
import type React from "react";
import { createContext, useState, useContext } from "react";
import { type Wallet } from "thirdweb/wallets";

interface WalletContextProps {
  setWallet: (wallet: Wallet | null) => void;
  wallet: Wallet | null;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC = ({ children }) => {
  const [wallet, setWallet] = useState<Wallet | null>(null);

  return (
    <WalletContext.Provider value={{ setWallet, wallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
