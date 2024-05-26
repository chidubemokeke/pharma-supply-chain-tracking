# Pharmaceutical Supply Chain Tracker

## Overview

The Pharmaceutical Supply Chain Tracker is a decentralized application (dApp) designed to track pharmaceutical batches and monitor temperature conditions during their supply chain journey. This project leverages blockchain technology, Substreams, The Graph, and Chainlink to ensure data transparency, integrity, and security.

## Table of Contents

1. [Overview](#overview)
2. [Technologies Used](#technologies-used)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Configuration](#configuration)
   - [Deploying the Smart Contract](#deploying-the-smart-contract)
   - [Running the Backend Server](#running-the-backend-server)
   - [Running the Frontend Application](#running-the-frontend-application)
5. [Usage](#usage)
6. [GraphQL Queries](#graphql-queries)

## Technologies Used

- **Solidity**: Smart contract language for Ethereum.
- **Hardhat**: Development environment for Ethereum.
- **Chainlink**: Decentralized oracle network.
- **Substreams**: Real-time data processing.
- **The Graph**: Decentralized querying protocol.
- **Express.js**: Backend server framework.
- **React**: Frontend library for building user interfaces.
- **Apollo Client**: GraphQL client for React.

## Project Structure

```graphql
pharma-supply-chain-tracker
│
├── backend
│   ├── server.js                # Main entry point for the backend server
│   ├── sensorSimulator.js       # Simulates IoT sensor data
│   └── .env                     # Environment variables for backend configuration
│
├── contracts
│   └── DrugBatch.sol            # Smart contract for managing drug batches
│
├── sps                          # Substreams and Subgraph configuration
│   ├── schema.graphql           # GraphQL schema definition
│   ├── substreams.yaml          # Substreams configuration
│   ├── src
│   │   ├── main.rs              # Main Substreams logic
│   │   └── lib.rs               # Library entry point for Substreams
│   ├── abis
│   │   └── DrugBatch.json       # ABI file for the DrugBatch contract
│   ├── mappings
│   │   └── mapping.ts           # Handlers for events emitted by the smart contract
│   └── Cargo.toml               # Rust project configuration file
│
├── frontend
│   ├── src
│   │   ├── apolloClient.js      # Apollo Client setup for GraphQL
│   │   ├── App.js               # Main React application component
│   │   ├── App.css              # Styling for the React application
│   │   ├── index.js             # Entry point for the React application
│   │   └── queries.js           # GraphQL queries for interacting with the subgraph
│   ├── public                   # Public assets for the frontend application
│   ├── package.json             # NPM configuration file for the frontend project
│   └── ...
│
├── scripts
│   └── deploy.js                # Script to deploy the smart contract
│
├── hardhat.config.js            # Hardhat configuration file for deploying and managing smart contracts
└── README.md                    # Project documentation
```

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Hardhat
- Rust and Cargo
- A Web3 wallet (e.g., MetaMask)
- Infura project for Ethereum access

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/pharma-supply-chain-tracker.git
   cd pharma-supply-chain-tracker
   ```

2. Install dependencies for backend and frontend:

   ```sh
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

### Configuration

1. Create a `.env` file in the `backend` folder with the following content:

   ```plaintext
   INFURA_PROJECT_URL=https://rinkeby.infura.io/v3/your_infura_project_id
   PRIVATE_KEY=your_private_key
   CONTRACT_ADDRESS=your_contract_address
   PORT=3000
   ```

2. Update the `hardhat.config.js` file with your Infura project URL and private key.

### Deploying the Smart Contract

1. Compile the smart contract:

   ```sh
   npx hardhat compile
   ```

2. Deploy the smart contract to the Rinkeby testnet:

   ```sh
   npx hardhat run scripts/deploy.js --network rinkeby
   ```

### Running the Backend Server

1. Navigate to the `backend` folder and start the server:

   ```sh
   cd backend
   npm start
   ```

### Running the Frontend Application

1. Navigate to the `frontend` folder and start the React application:

   ```sh
   cd frontend
   npm start
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000` to access the application.
2. The application will display the list of pharmaceutical batches and temperature events.

## GraphQL Queries

### Example Queries

#### Get Batches

```graphql
{
  batches {
    id
    manufacturer
    manufactureDate
    expiryDate
    status
  }
}
```

#### Get Temperature Events

```graphql
{
  temperatureEvents {
    id
    batchId
    temperature
    timestamp
  }
}
```
