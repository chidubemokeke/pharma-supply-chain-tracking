# Pharmaceutical Supply Chain Tracker

## Overview

MediChain is a decentralized application (dApp) designed to track pharmaceutical batches and monitor temperature conditions during their supply chain journey. This project leverages blockchain technology, The Graph, Substreams, and Chainlink to ensure data transparency, integrity, and security.

## Table of Contents

1. [Overview](#overview)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Configuration](#configuration)
   - [Deploying the Smart Contract](#deploying-the-smart-contract)
   - [Running the Backend Server](#running-the-backend-server)
   - [Running the Frontend Application](#running-the-frontend-application)
4. [Usage](#usage)
5. [GraphQL Queries](#graphql-queries)

## Technologies Used

- **Solidity**: Smart contract language for Ethereum.
- **Hardhat**: Development environment for Ethereum.
- **Chainlink**: Decentralized oracle network.
- **The Graph**: Decentralized querying protocol.
- **Express.js**: Backend server framework.
- **React**: Frontend library for building user interfaces.
- **Apollo Client**: GraphQL client for React.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Hardhat
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
cd ../subgraph
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

2. Create a .env file in the frontend folder with the following content:

```sh
REACT_APP_SUBGRAPH_URL=https://api.thegraph.com/subgraphs/name/yourusername/medi-chain

```

### Deploying the Smart Contract

1. Compile the smart contract:

   ```sh
   npx hardhat compile
   ```

2. Deploy the smart contract to the Sepolia testnet:

   ```sh
   npx hardhat run scripts/deploy.js --network sepolia

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
   $env:NODE_OPTIONS = "--openssl-legacy-provider"
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

#### Get Batches By Manufacturer

```graphql
{
  batches(where: { manufacturer: $manufacturer }) {
    id
    manufacturer
    manufactureDate
    expiryDate
    status
  }
}
```

#### Get Temperature Events By Batch ID

```graphql
{
  temperatureEvents(where: { batchId: $batchId }) {
    id
    batchId
    temperature
    timestamp
  }
}
```
