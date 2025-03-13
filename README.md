# NFT Marketplace

A decentralized NFT marketplace built with Hardhat and Solidity. This project allows users to list their NFTs for sale, buy NFTs, update listing prices, and manage their proceeds from sales.

## Features

- List NFTs for sale
- Buy NFTs
- Update listing prices
- Cancel listings
- Withdraw proceeds from sales
- Basic NFT contract for testing

## Technology Stack

- Solidity ^0.8.7
- Hardhat
- OpenZeppelin Contracts
- Ethers.js

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```
PRIVATE_KEY=""
ETHERSCAN_API_KEY=""
COINMARKETCAP_API_KEY=""
```

## Usage

1. Start a local Hardhat node:
```bash
npx hardhat node
```

2. Deploy the contracts:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

3. Mint and list an NFT:
```bash
npx hardhat run scripts/mint-and-list.js --network localhost
```

4. Buy a listed NFT:
```bash
npx hardhat run scripts/buy-item.js --network localhost
```

## Contract Addresses (Local Network)

- NFT Marketplace: 0x5FC8d32690cc91D4c39d9d3abcBD16989F875707
- Basic NFT: 0x0165878A594ca255338adfa4d48449f69242Eb8F

## Smart Contracts

### NftMarketplace.sol
The main marketplace contract that handles:
- Listing NFTs
- Buying NFTs
- Updating listings
- Canceling listings
- Managing proceeds

### BasicNft.sol
A simple ERC721 contract for testing the marketplace with:
- Minting functionality
- Fixed token URI
- Token counter

## Scripts

- `deploy.js`: Deploys both the marketplace and NFT contracts
- `mint-and-list.js`: Mints a new NFT and lists it on the marketplace
- `buy-item.js`: Purchases a listed NFT

## Testing

Run the tests with:
```bash
npx hardhat test
```

## License

MIT 