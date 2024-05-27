const { ethers } = require("ethers"); // ethers.js allows us to interact with the Ethereum blockchain
require("dotenv").config(); // Load environment variables from our .env file for secure and flexible configuration
const DrugBatch = require("../contracts/artifacts/contracts/DrugBatch.sol/DrugBatch.json"); // Import the ABI of our compiled smart contract
const provider = new ethers.providers.InfuraProvider(
  "sepolia",
  process.env.INFURA_API_KEY
); // Using Sepolia Infura URL
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider); // Create wallet instance from private key
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, DrugBatch.abi, wallet);
try {
let data = [
  {
    batch_id: 1,
    manufacturer: "Pharma Inc",
    manufacture_date: 1625097600,
    expiry_date: 1656633600,
    status: "Created",
    temperature: 22,
    timestamp: 1625184000,
    distribution_point: "Warehouse A",
  },
  {
    batch_id: 2,
    manufacturer: "HealthCorp",
    manufacture_date: 1625184000,
    expiry_date: 1656710400,
    status: "Created",
    temperature: 23,
    timestamp: 1625270400,
    distribution_point: "Warehouse B",
  },
  {
    batch_id: 3,
    manufacturer: "Wellness Ltd",
    manufacture_date: 1625270400,
    expiry_date: 1656787200,
    status: "Created",
    temperature: 24,
    timestamp: 1625356800,
    distribution_point: "Warehouse C",
  },
  {
    batch_id: 4,
    manufacturer: "Pharma Inc",
    manufacture_date: 1625364000,
    expiry_date: 1656870400,
    status: "In Transit",
    temperature: 25,
    timestamp: 1625450400,
    distribution_point: "Warehouse A",
  },
  {
    batch_id: 5,
    manufacturer: "HealthCorp",
    manufacture_date: 1625450400,
    expiry_date: 1656956800,
    status: "Delivered",
    temperature: 26,
    timestamp: 1625536800,
    distribution_point: "Pharmacy X",
  },
  {
    batch_id: 6,
    manufacturer: "Wellness Ltd",
    manufacture_date: 1625536800,
    expiry_date: 1657043200,
    status: "Returned",
    temperature: 27,
    timestamp: 1625623200,
    distribution_point: "Warehouse C",
  },
  {
    batch_id: 7,
    manufacturer: "Pharma Inc",
    manufacture_date: 1625610400,
    expiry_date: 1657130400,
    status: "Created",
    temperature: 28,
    timestamp: 1625696800,
    distribution_point: "Warehouse A",
  },
  {
    batch_id: 8,
    manufacturer: "HealthCorp",
    manufacture_date: 1625700400,
    expiry_date: 1657210400,
    status: "In Transit",
    temperature: 29,
    timestamp: 1625786800,
    distribution_point: "Warehouse B",
  },
  {
    batch_id: 9,
    manufacturer: "Wellness Ltd",
    manufacture_date: 1625790400,
    expiry_date: 1657290400,
    status: "Delivered",
    temperature: 30,
    timestamp: 1625876800,
    distribution_point: "Warehouse C",
  },
  {
    batch_id: 10,
    manufacturer: "Pharma Inc",
    manufacture_date: 1625880400,
    expiry_date: 1657370400,
    status: "Returned",
    temperature: 31,
    timestamp: 1625966800,
    distribution_point: "Warehouse A",
  },
  {
    batch_id: 11,
    manufacturer: "HealthCorp",
    manufacture_date: 1625970400,
    expiry_date: 1657450400,
    status: "Created",
    temperature: 32,
    timestamp: 1626056800,
    distribution_point: "Warehouse B",
  },
  {
    batch_id: 12,
    manufacturer: "Wellness Ltd",
    manufacture_date: 1626060400,
    expiry_date: 1657530400,
    status: "In Transit",
    temperature: 33,
    timestamp: 1626146800,
    distribution_point: "Warehouse C",
  },
];

for(let i=0;i<data.length;i++){
    let run = async ()=>{
    const tx = await contract.createBatch(data[i].manufacturer,data[i].manufacture_date,data[i].expiry_date);
    await tx.wait();
    console.log(tx.hash);
    }
    run();
}
} catch (error) {
  console.error(error); // Log any errors for debugging
  res.status(500).send("Error processing sensor data"); // Respond with a 500 status code if something goes wrong
}
