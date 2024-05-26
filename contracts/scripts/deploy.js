async function main() {
  const [deployer] = await ethers.getSigners(); // Get the deployer's wallet address
  console.log("Deploying contracts with the account:", deployer.address);

  const DrugBatch = await ethers.getContractFactory("DrugBatch"); // Get the contract factory for DrugBatch
  const drugBatch = await DrugBatch.deploy(); // Deploy the contract
  await drugBatch.deployed(); // Wait for the deployment to complete

  console.log("DrugBatch contract deployed to:", drugBatch.address); // Log the contract address
}

main()
  .then(() => process.exit(0)) // Exit the process if successful
  .catch((error) => {
    console.error(error); // Log any errors
    process.exit(1); // Exit the process with an error code
  });
