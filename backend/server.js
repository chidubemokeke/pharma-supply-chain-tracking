// Import necessary modules
const express = require("express"); // Express framework for creating the server
const SensorSimulator = require("./sensorSimulator"); // Import the sensor simulator

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000; // Set the port from environment variables or default to 3000

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint to receive data from IoT sensors
app.post("/sensor-data", async (req, res) => {
  const data = req.body; // Get the data from the request body
  console.log("Received sensor data:", data);

  // Check if the temperature exceeds the threshold
  if (data.temperature > 30) {
    // Call the function to record temperature on the blockchain
    const tx = await recordTemperature(data.batchId, data.temperature);
    console.log("Temperature exceeded, transaction hash:", tx.hash);
  }

  res.status(200).send("Sensor data processed"); // Send a response back to the client
});

// Function to interact with the smart contract and record temperature
async function recordTemperature(batchId, temperature) {
  const ethers = require("ethers"); // Import ethers.js for interacting with the blockchain
  const provider = new ethers.providers.InfuraProvider(
    "rinkeby",
    process.env.INFURA_PROJECT_ID
  ); // Connect to Infura
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider); // Create a wallet instance from the private key
  const contractAddress = process.env.CONTRACT_ADDRESS; // Smart contract address
  const contractABI = [
    /* Your Contract ABI here */
  ]; // Smart contract ABI
  const contract = new ethers.Contract(contractAddress, contractABI, wallet); // Create a contract instance
  return await contract.recordTemperature(batchId, temperature); // Call the smart contract method
}

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);

  // Initialize the sensor simulator
  const sensorSimulator = new SensorSimulator();
  // Listen for 'data' events from the sensor simulator
  sensorSimulator.on("data", async (data) => {
    console.log("Simulated sensor data:", data);
    try {
      // Record the temperature on the blockchain
      await recordTemperature(data.batchId, data.temperature);
      console.log("Simulated temperature recorded on blockchain");
    } catch (error) {
      console.error("Error recording temperature on blockchain:", error);
    }
  });
});
