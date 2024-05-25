// Main function to deploy the DrugBatch smart contract
async function main() {
  // Get the deployer's account (signer)
  const [deployer] = await ethers.getSigners();

  // Log the deployer's address
  console.log("Deploying contracts with the account:", deployer.address);

  // Get the contract factory for DrugBatch (a factory to create instances of the DrugBatch contract)
  const DrugBatch = await ethers.getContractFactory("DrugBatch");

  // Deploy the contract instance and wait for it to be mined
  const drugBatch = await DrugBatch.deploy();

  // Log the address of the deployed DrugBatch contract
  console.log("DrugBatch contract deployed to:", drugBatch.address);
}

// Execute the main function
main()
  .then(() => process.exit(0)) // On success, exit the process with code 0
  .catch((error) => {
    console.error(error); // On error, log the error
    process.exit(1); // Exit the process with code 1 (indicating an error)
  });
