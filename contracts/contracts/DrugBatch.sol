// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {Chainlink, ChainlinkClient} from "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";

contract DrugBatch is ChainlinkClient{
using Chainlink for Chainlink.Request;
  
   // Structure to represent a batch of drugs
   struct Batch {
        uint256 id;
        string manufacturer;
        uint256 manufactureDate;
        uint256 expiryDate;
        string status;
    }

   // Mappings to store batches and Chainlink request IDs
    mapping(uint256 => Batch) public batches;
    mapping(bytes32 => uint256) public chainlinkRequestIdToBatchId;
    uint256 public nextBatchId;
    uint256 private temperatureThreshold = 30; // Example threshold value

   // Variables for Chainlink oracle, job ID, and fee
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
 
   // Events for logging batch creation, updates, and temperature exceedances
    event BatchCreated(uint256 id, string manufacturer, uint256 manufactureDate, uint256 expiryDate);
    event BatchUpdated(uint256 id, string status);
    event TemperatureExceeded(uint256 id, uint256 temperature);
   
   // Constructor to set the Chainlink token, oracle address, job ID, and fee
    constructor() {
        oracle = 0x7afe30CB3e53dBa6801Aa0EA647A0b1099abd5e6; // Replace with your oracle address
        _setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        _setChainlinkOracle(oracle);
        jobId = "d5270d1c311941d0b08bead21fea7747"; // Replace with your job ID
        fee = 0.1 * 10 ** 18; // 0.1 LINK
    }

   // Function to create a new batch of drugs
    function createBatch(string memory _manufacturer, uint256 _manufactureDate, uint256 _expiryDate) public {
        batches[nextBatchId] = Batch(nextBatchId, _manufacturer, _manufactureDate, _expiryDate, "Created");
        emit BatchCreated(nextBatchId, _manufacturer, _manufactureDate, _expiryDate);
        nextBatchId++;
    }

   // Function to update the status of a batch
    function updateBatch(uint256 _batchId, string memory _status) public {
        require(_batchId < nextBatchId, "Batch does not exist");
        batches[_batchId].status = _status;
        emit BatchUpdated(_batchId, _status);
    }

   // Function to request temperature data using Chainlink
    function requestTemperatureData(uint256 _batchId) public returns (bytes32 requestId) {
        Chainlink.Request memory request = _buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        request._add("batchId", uint2str(_batchId));
        requestId = _sendChainlinkRequestTo(oracle, request, fee);
        chainlinkRequestIdToBatchId[requestId] = _batchId;
        return requestId;
    }
 
   // Function to manually record temperature for a batch   
function recordTemperature(uint256 _batchId, uint256 _temperature) public {
    require(_batchId < nextBatchId, "Batch does not exist");

    // Check if the temperature exceeds the threshold
    if (_temperature > temperatureThreshold) {
        // Trigger the TemperatureExceeded event
        emit TemperatureExceeded(_batchId, _temperature);
        
        // Optionally, update the batch status if temperature is exceeded
        batches[_batchId].status = "Temperature Exceeded";
        emit BatchUpdated(_batchId, "Temperature Exceeded");
    } else {
        // Optionally, update the batch status if temperature is within the threshold
        batches[_batchId].status = "Temperature Normal";
        emit BatchUpdated(_batchId, "Temperature Normal");
    }
}
    // Function to handle the fulfillment of the Chainlink request
    function fulfill(bytes32 _requestId, uint256 _temperature) public recordChainlinkFulfillment(_requestId) {
        uint256 batchId = chainlinkRequestIdToBatchId[_requestId];
        if (_temperature > temperatureThreshold) {
            emit TemperatureExceeded(batchId, _temperature);
        }
    }

    // Utility function to convert uint256 to string
    function uint2str(uint256 _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            bstr[--k] = bytes1(uint8(48 + _i % 10));
            _i /= 10;
        }
        return string(bstr);
    }

}
