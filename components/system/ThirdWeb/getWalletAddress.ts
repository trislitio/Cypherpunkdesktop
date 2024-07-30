// components/system/ThirdWeb/utils.ts
export async function fetchAccountDetails(wallet) {
  if (!wallet) {
    throw new Error("No wallet connected.");
  }

  const walletAddress = await wallet.getAddress?.();
  if (!walletAddress) {
    throw new Error("No wallet address found.");
  }

  return walletAddress;
}
