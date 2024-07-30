import React, { useEffect, useState } from "react";
import { ConnectButton, useActiveWallet } from "thirdweb/react";
import { hasAccess } from "components/system/ThirdWeb/AccessContract";
import { client, wallets } from "components/system/ThirdWeb/thirdWebClient";
import styles from "components/system/ThirdWeb/SplashScreen.module.css";

const SplashScreen = ({ onConnect }) => {
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [error, setError] = useState<string | null>();
  const [walletAddress, setWalletAddress] = useState<string | null>();
  const wallet = useActiveWallet();

  useEffect(() => {
    const fetchWalletDetails = async () => {
      setCheckingAccess(true);
      try {
        if (!wallet) {
          throw new Error("No wallet connected.");
        }

        const accountDetails = await wallet.getAccount();
        // console.log("Account Details:", accountDetails);

        setWalletAddress(accountDetails.address);
        // console.log("Wallet Address:", accountDetails.address);

        const access = await hasAccess(accountDetails.address);
        if (access) {
          onConnect();
        } else {
          setError("You do not own the required NFT.");
        }
      } catch (error) {
        // console.error("Error checking access:", error);
        setError(
          error.message || "Failed to verify NFT ownership. Please try again."
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
