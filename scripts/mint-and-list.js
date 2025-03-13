const { ethers } = require("hardhat");

const PRICE = ethers.parseEther("0.1");

async function mintAndList() {
    const accounts = await ethers.getSigners();
    const [deployer, owner, buyer1] = accounts;

    const IDENTITIES = {
        [deployer.address]: "DEPLOYER",
        [owner.address]: "OWNER",
        [buyer1.address]: "BUYER_1",
    };

    // Get the contract factories
    const NftMarketplace = await ethers.getContractFactory("NftMarketplace");
    const BasicNft = await ethers.getContractFactory("BasicNft");

    // Deploy the contracts
    console.log("Deploying NFT Marketplace...");
    const nftMarketplace = await NftMarketplace.deploy();
    await nftMarketplace.waitForDeployment();
    console.log("NFT Marketplace deployed to:", await nftMarketplace.getAddress());

    console.log("Deploying Basic NFT...");
    const basicNft = await BasicNft.deploy();
    await basicNft.waitForDeployment();
    console.log("Basic NFT deployed to:", await basicNft.getAddress());

    console.log("Minting NFT...");
    const mintTx = await basicNft.mintNft();
    const mintTxReceipt = await mintTx.wait(1);
    
    // Get the token counter value instead of trying to read from events
    const tokenId = await basicNft.getTokenCounter() - 1n; // Subtract 1 since counter is incremented after mint
    console.log("Token ID:", tokenId);

    console.log("Approving NFT...");
    const approvalTx = await basicNft.approve(await nftMarketplace.getAddress(), tokenId);
    await approvalTx.wait(1);

    console.log("Listing NFT...");
    const tx = await nftMarketplace.listItem(await basicNft.getAddress(), tokenId, PRICE);
    await tx.wait(1);
    console.log("NFT Listed!");

    const listing = await nftMarketplace.getListing(await basicNft.getAddress(), tokenId);
    console.log(`NFT Listed at price: ${ethers.formatEther(listing.price)} ETH`);
}

mintAndList()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }); 