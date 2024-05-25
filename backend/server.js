const express = require("express"); // Import Express framework
const SensorSimulator = require("./sensorSimulator"); // Import the sensor simulator
const { ethers } = require("ethers"); // Import ethers.js for interacting with the blockchain
require("dotenv").config(); // Load environment variables from .env file

const app = express(); // Initialize Express app
const port = process.env.PORT || 3000; // Set port from environment variables or default to 3000

app.use(express.json()); // Middleware to parse JSON requests

// Endpoint to receive data from IoT sensors
app.post("/sensor-data", async (req, res) => {
  const data = req.body; // Get data from request body
  console.log("Received sensor data:", data);

  // Check if temperature exceeds threshold
  if (data.temperature > 30) {
    // Call function to record temperature on blockchain
    const tx = await recordTemperature(data.batchId, data.temperature);
    console.log("Temperature exceeded, transaction hash:", tx.hash);
  }

  res.status(200).send("Sensor data processed"); // Send response to client
});

// Function to interact with smart contract and record temperature
async function recordTemperature(batchId, temperature) {
  const provider = new ethers.providers.InfuraProvider(
    "rinkeby",
    process.env.INFURA_PROJECT_URL
  ); // Connect to Infura
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider); // Create wallet instance from private key
  const contractAddress = process.env.CONTRACT_ADDRESS; // Smart contract address
  const contractABI = [
    /* Your Contract ABI here */
  ]; // Smart contract ABI
  const contract = new ethers.Contract(contractAddress, contractABI, wallet); // Create contract instance

  return await contract.recordTemperature(batchId, temperature); // Call smart contract method
}

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);

  const sensorSimulator = new SensorSimulator(); // Initialize sensor simulator
  sensorSimulator.on("data", async (data) => {
    // Listen for 'data' events from simulator
    console.log("Simulated sensor data:", data);
    try {
      await recordTemperature(data.batchId, data.temperature); // Record temperature on blockchain
      console.log("Simulated temperature recorded on blockchain");
    } catch (error) {
      console.error("Error recording temperature on blockchain:", error);
    }
  });
});
