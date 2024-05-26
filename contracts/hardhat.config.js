require("@nomiclabs/hardhat-waffle");
require("dotenv").config(); // Import dotenv to load environment variables

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: process.env.INFURA_PROJECT_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
