require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.7",
  networks: {
    "optimism-sepolia": {
      url: "https://sepolia.optimism.io",
      chainId:11155420,
      accounts: ["634e09c8e44458a98ff5aeee556fcfdbffe7918e8d8121991ca970ec68f34b93"]
    },
    sepolia: {
      url:
        process.env.INFURA_PROJECT_URL ||
        "https://sepolia.infura.io/v3/45659e58bfd842309ac5e26ecd083106 ",
      accounts: [
        process.env.PRIVATE_KEY ||
          "d17533e7ae67bfc4331bdba4de18dc48ca9568333d3d6566fcc793af7fec2682",
      ],
    },
  },
};
