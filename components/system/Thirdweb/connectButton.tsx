import type React from "react";
import { ConnectButton } from "thirdweb/react";
import { client, wallets } from "components/system/Thirdweb/thirdwebClient"; // Import the client and wallets configuration

const CustomConnectButton: React.FC = () => (
  <ConnectButton
    client={client}
    connectModal={{
      showThirdwebBranding: false,
      size: "wide",
    }}
    theme="dark"
    wallets={wallets}
  />
);

export default CustomConnectButton;
