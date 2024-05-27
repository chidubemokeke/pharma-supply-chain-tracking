const express = require("express"); // Import Express framework
const SensorSimulator = require("./sensorSimulator"); // Import the sensor simulator
const { ethers,InfuraProvider } = require("ethers"); // Import ethers.js for interacting with the blockchain
require("dotenv").config(); // Load environment variables from .env file
const fs = require("fs"); // Import file system module
const csv = require("csv-parser"); // Import CSV parser module

const app = express(); // Initialize Express app
const port = process.env.PORT || 3000; // Set port from environment variables or default to 3000

app.use(express.json()); // Middleware to parse JSON requests

// In-memory storage for simplicity
const batches = [];

// Function to read CSV data
function loadCsvData(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

// Function to read JSON data
function loadJsonData(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

// Endpoint to load sample data
app.post("/load-sample-data", async (req, res) => {
  try {
    const csvData = await loadCsvData("data/drug_batches.csv");
    const jsonData = await loadJsonData("data/drug_batches.json");

    // Combine data from CSV and JSON (assuming they are structured the same)
    const combinedData = [...csvData, ...jsonData];

    // Store in in-memory storage (or database in real-world scenarios)
    combinedData.forEach((batch) => {
      batches.push(batch);
    });

    res.status(200).send("Sample data loaded successfully");
  } catch (error) {
    console.error("Error loading sample data:", error);
    res.status(500).send("Failed to load sample data");
  }
});

// Endpoint to get all batches
app.get("/batches", (req, res) => {
  res.status(200).json(batches);
});

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
  const provider = new InfuraProvider(
    "sepolia",
    process.env.INFURA_API_KEY
  ); // Connect to Infura
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider); // Create wallet instance from private key
  const contractAddress = process.env.CONTRACT_ADDRESS; // Smart contract address
  const contractABI = require("../sps/abis/DrugBatch.json"); // Import the ABI of the DrugBatch contract
  const contract = new ethers.Contract(contractAddress, contractABI, wallet); // Create contract instance

  return await contract.recordTemperature(batchId, parseInt(temperature.toFixed(1))); // Call smart contract method
}
async function createBatch(manufacturer,manufacture_date,expiry_date){
  const provider = new InfuraProvider("sepolia", process.env.INFURA_API_KEY); // Connect to Infura
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider); // Create wallet instance from private key
  const contractAddress = process.env.CONTRACT_ADDRESS; // Smart contract address
  const contractABI = require("../sps/abis/DrugBatch.json"); // Import the ABI of the DrugBatch contract
  const contract = new ethers.Contract(contractAddress, contractABI, wallet); // Create contract instance
  return await contract.createBatch(manufacturer,manufacture_date,expiry_date);
}
// Start the Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);

  const sensorSimulator = new SensorSimulator(); // Initialize sensor simulator
  sensorSimulator.on("data", async (data) => {
    // Listen for 'data' events from simulator
    //try creating a batch first
    console.log("Simulated sensor data:", data);
    try {
      await recordTemperature(data.batchId, data.temperature); // Record temperature on blockchain
      console.log("Simulated temperature recorded on blockchain");
    } catch (error) {
      console.error("Error recording temperature on blockchain:", error);
    }
  });
});
