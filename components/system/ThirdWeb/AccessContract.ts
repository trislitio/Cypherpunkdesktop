import { Alchemy, Network } from "alchemy-sdk";

const alchemy = new Alchemy({
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.BASE_MAINNET, // Specify the correct network
});

const specificContractAddress = "0x36E65b252a1Ac8d15B68A1CA92f3c7a26285A334"; // Your NFT contract address

export async function hasAccess(walletAddress: string): Promise<boolean> {
  try {
    //  console.log("Checking NFT ownership for address:", walletAddress);

    // Fetch NFTs owned by the wallet
    const nfts = await alchemy.nft.getNftsForOwner(walletAddress);
    // console.log("Owned NFTs:", nfts);

    // Check if any of the owned NFTs are from the specific contract
    return nfts.ownedNfts.some(
      (nft) =>
        nft.contract.address.toLowerCase() ===
        specificContractAddress.toLowerCase()
    );
  } catch (error) {
    console.error("Error checking NFT ownership:", error);
    throw new Error("Failed to verify NFT ownership. Please try again.");
  }
}
