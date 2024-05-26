// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract DrugBatch is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    struct Batch {
        uint256 id;
        string manufacturer;
        uint256 manufactureDate;
        uint256 expiryDate;
        string status;
    }

    mapping(uint256 => Batch) public batches;
    mapping(bytes32 => uint256) public chainlinkRequestIdToBatchId;
    uint256 public nextBatchId;
    uint256 private temperatureThreshold = 30; // Example threshold value

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    event BatchCreated(uint256 id, string manufacturer, uint256 manufactureDate, uint256 expiryDate);
    event BatchUpdated(uint256 id, string status);
    event TemperatureExceeded(uint256 id, uint256 temperature);

    constructor() {
         _setPublicChainlinkToken();
        oracle = 0x7AFe30cb3E53dba6801aa0ea647A0b1099aBd5e6; // Replace with your oracle address
        jobId = "d5270d1c311941d0b08bead21fea7747"; // Replace with your job ID
        fee = 0.1 * 10 ** 18; // 0.1 LINK
    }

    function createBatch(string memory _manufacturer, uint256 _manufactureDate, uint256 _expiryDate) public {
        batches[nextBatchId] = Batch(nextBatchId, _manufacturer, _manufactureDate, _expiryDate, "Created");
        emit BatchCreated(nextBatchId, _manufacturer, _manufactureDate, _expiryDate);
        nextBatchId++;
    }

    function updateBatch(uint256 _batchId, string memory _status) public {
        require(_batchId < nextBatchId, "Batch does not exist");
        batches[_batchId].status = _status;
        emit BatchUpdated(_batchId, _status);
    }

    function requestTemperatureData(uint256 _batchId) public returns (bytes32 requestId) {
        Chainlink.Request memory request = _buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        request._add("batchId", uint2str(_batchId));
        requestId = _sendChainlinkRequestTo(oracle, request, fee);
        chainlinkRequestIdToBatchId[requestId] = _batchId;
        return requestId;
    }

    function fulfill(bytes32 _requestId, uint256 _temperature) public recordChainlinkFulfillment(_requestId) {
        uint256 batchId = chainlinkRequestIdToBatchId[_requestId];
        if (_temperature > temperatureThreshold) {
            emit TemperatureExceeded(batchId, _temperature);
        }
    }

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
