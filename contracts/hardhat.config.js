require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: process.env.INFURA_PROJECT_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
