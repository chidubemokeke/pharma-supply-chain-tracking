require("@nomiclabs/hardhat-waffle");
require("dotenv").config(); // Load environment variables

module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: process.env.INFURA_PROJECT_URL,
      accounts: [
        process.env
          .d17533e7ae67bfc4331bdba4de18dc48ca9568333d3d6566fcc793af7fec2682,
      ],
    },
  },
};
