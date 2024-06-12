import { createThirdwebClient } from "thirdweb";
import { createWallet, walletConnect, inAppWallet } from "thirdweb/wallets";

const secretKey = process.env.THIRDWEB_SECRET_KEY;

if (!secretKey) {
  throw new Error("THIRDWEB_SECRET_KEY is not defined");
}

export const client = createThirdwebClient({
  secretKey,
});

export const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  walletConnect(),
  inAppWallet({
    auth: {
      options: ["email", "google", "apple", "facebook", "phone"],
    },
  }),
];
