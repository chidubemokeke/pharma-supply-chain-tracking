require("@nomiclabs/hardhat-waffle");
require("dotenv").config(); // Load environment variables from .env file

module.exports = {
  solidity: "0.8.0", // Specify the Solidity version
  networks: {
    sepolia: {
      url: process.env.INFURA_PROJECT_URL, // Infura project URL for Sepolia testnet
      accounts: [process.env.PRIVATE_KEY], // Array of private keys for deploying contracts
    },
  },
};
