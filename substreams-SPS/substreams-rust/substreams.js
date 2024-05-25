const { ethers } = require("ethers"); // Import ethers.js for interacting with Ethereum
require("dotenv").config(); // Load environment variables from a .env file

// Create an Infura provider connected to the Rinkeby testnet
const provider = new ethers.providers.InfuraProvider(
  "rinkeby",
  process.env.INFURA_PROJECT_ID
);

// Create a wallet instance from a private key and connect it to the provider
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Contract address and ABI
const contractAddress = process.env.CONTRACT_ADDRESS; // Address of the deployed DrugBatch contract
const contractABI = [
  /* Your Contract ABI here */
]; // ABI of the DrugBatch contract

// Create a contract instance
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Function to handle incoming sensor data
async function handleSensorData(data) {
  console.log("Processing sensor data:", data); // Log the received sensor data

  // Check if the temperature exceeds the threshold
  if (data.temperature > 30) {
    // Call the recordTemperature function on the smart contract
    const tx = await contract.recordTemperature(data.batchId, data.temperature);
    console.log("Temperature exceeded: Transaction hash:", tx.hash);

    // Optional: Update the subgraph with new data (not implemented here)
    // updateSubgraph(data);
  }
}

// Placeholder function to simulate receiving sensor data
function getSensorDataStream() {
  // Simulate a real-time data stream using EventEmitter
  const EventEmitter = require("events");
  const eventEmitter = new EventEmitter();

  // Generate random sensor data every second
  setInterval(() => {
    const data = {
      batchId: Math.floor(Math.random() * 1000), // Random batch ID
      temperature: Math.random() * 100, // Random temperature between 0 and 100
      humidity: Math.random() * 100, // Random humidity between 0 and 100
      timestamp: Date.now(), // Current timestamp
    };
    eventEmitter.emit("data", data); // Emit the sensor data
  }, 1000);

  return eventEmitter;
}

// Function to listen to the sensor data stream
function listenToSensorDataStream() {
  const sensorDataStream = getSensorDataStream(); // Get the sensor data stream
  sensorDataStream.on("data", handleSensorData); // Handle each data event
}

// Start listening to the sensor data stream
listenToSensorDataStream();
