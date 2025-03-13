const { ethers } = require("hardhat");

async function main() {
  // Deploy NFT Marketplace
  const NftMarketplace = await ethers.getContractFactory("NftMarketplace");
  console.log("Deploying NFT Marketplace...");
  const nftMarketplace = await NftMarketplace.deploy();
  await nftMarketplace.waitForDeployment();
  console.log("NFT Marketplace deployed to:", await nftMarketplace.getAddress());

  // Deploy Basic NFT
  const BasicNft = await ethers.getContractFactory("BasicNft");
  console.log("Deploying Basic NFT...");
  const basicNft = await BasicNft.deploy();
  await basicNft.waitForDeployment();
  console.log("Basic NFT deployed to:", await basicNft.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 