const express = require("express"); // We use Express to handle HTTP requests easily
const { ethers} = require("ethers"); // ethers.js allows us to interact with the Ethereum blockchain
require("dotenv").config(); // Load environment variables from our .env file for secure and flexible configuration
const DrugBatch = require("../contracts/artifacts/contracts/DrugBatch.sol/DrugBatch.json"); // Import the ABI of our compiled smart contract

const app = express(); // Initialize an Express application
const port = process.env.PORT || 3000; // Define the port for the server, defaulting to 3000 if not specified

app.use(express.json()); // Use middleware to parse JSON bodies in incoming requests

// Define a route to handle POST requests at /sensor-data

const provider =new ethers.providers.InfuraProvider(
  "sepolia",
  process.env.INFURA_API_KEY
); // Using Sepolia Infura URL
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider); // Create wallet instance from private key
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, DrugBatch.abi, wallet);
app.post("/sensor-data", async (req, res) => {
  try {
    const { batchId, temperature } = req.body; // Extract batchId and temperature from the request body

    if (!batchId) {
      return res.status(400).send('BatchId is required');
    }

    if (!temperature) {
      return res.status(400).send('Temperature is required');
    }

    // Call the smart contract's function to record temperature data
    const tx = await contract.recordTemperature(batchId, temperature); // This function sends a transaction to record the temperature
    await tx.wait(); // Wait for the transaction to be mined

    res.send(`Sensor data processed with transaction hash: ${tx.hash}`); // Respond with the transaction hash
  } catch (error) {
    console.error(error); // Log any errors for debugging
    res.status(500).send("Error processing sensor data"); // Respond with a 500 status code if something goes wrong
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
module.exports = app;