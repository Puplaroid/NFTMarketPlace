const { ethers } = require("hardhat");

const TOKEN_ID = 0n; // The token ID we want to buy

async function buyItem() {
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

    // Get the deployed contracts
    const nftMarketplace = await NftMarketplace.attach("0x5FC8d32690cc91D4c39d9d3abcBD16989F875707");
    const basicNft = await BasicNft.attach("0x0165878A594ca255338adfa4d48449f69242Eb8F");

    console.log("Getting listing details...");
    const listing = await nftMarketplace.getListing(await basicNft.getAddress(), TOKEN_ID);
    console.log(`NFT price: ${ethers.formatEther(listing.price)} ETH`);

    console.log("Buying NFT...");
    const tx = await nftMarketplace.connect(buyer1).buyItem(
        await basicNft.getAddress(),
        TOKEN_ID,
        { value: listing.price }
    );
    await tx.wait(1);
    console.log("NFT Bought!");

    const newOwner = await basicNft.ownerOf(TOKEN_ID);
    console.log(
        `New owner of Token ID ${TOKEN_ID} is ${newOwner} with identity of ${IDENTITIES[newOwner]}`
    );
}

buyItem()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }); 