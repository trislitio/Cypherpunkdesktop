/* eslint-disable import/no-duplicates */
import type React from "react";
import { useEffect, useState } from "react";
/* eslint-enable import/no-duplicates */
import { ConnectButton, useActiveWallet } from "thirdweb/react";
import { hasAccess } from "components/system/ThirdWeb/AccessContract";
import { client, wallets } from "components/system/ThirdWeb/thirdWebClient";
import styles from "components/system/ThirdWeb/SplashScreen.module.css";

interface SplashScreenProps {
  onConnect: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onConnect }) => {
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [error, setError] = useState<string | null>();
  const [walletAddress, setWalletAddress] = useState<
    string | null | undefined
  >();
  const wallet = useActiveWallet();

  useEffect(() => {
    const fetchWalletDetails = async (): Promise<void> => {
      setCheckingAccess(true);
      try {
        if (!wallet) {
          throw new Error("No wallet connected.");
        }

        const accountDetails = wallet.getAccount();
        // console.log("Account Details:", accountDetails);

        setWalletAddress(accountDetails.address);
        // console.log("Wallet Address:", accountDetails.address);

        // Assuming hasAccess is a function that checks for required NFTs
        const access = await hasAccess(accountDetails.address);
        if (access) {
          onConnect();
        } else {
          setError("You do not own the required NFT.");
        }
      } catch (error_) {
        console.error("Error checking access:", error_);
        setError(
          (error_ as Error).message ||
            "Failed to verify NFT ownership. Please try again."
        );
      } finally {
        setCheckingAccess(false);
      }
    };

    fetchWalletDetails();
  }, [wallet, onConnect]);

  if (checkingAccess) {
    return <div className={styles.splashScreen}>Checking access...</div>;
  }

  if (error) {
    return (
      <div className={styles.splashScreen}>
        {error}
        <ConnectButton client={client} wallets={wallets} />
      </div>
    );
  }

  return (
    <div className={styles.splashScreen}>
      <ConnectButton client={client} wallets={wallets} />
      <div>
        {walletAddress ? `Connected: ${walletAddress}` : "No wallet connected"}
      </div>
    </div>
  );
};

export default SplashScreen;
