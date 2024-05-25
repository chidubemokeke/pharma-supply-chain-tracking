// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DrugBatch {
    struct Batch {
        uint256 id;
        string manufacturer;
        uint256 manufactureDate;
        uint256 expiryDate;
        string status;
    }

    mapping(uint256 => Batch) public batches;
    uint256 public nextBatchId;

    event BatchCreated(uint256 id, string manufacturer, uint256 manufactureDate, uint256 expiryDate);
    event BatchUpdated(uint256 id, string status);
    event TemperatureExceeded(uint256 id, uint256 temperature);

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

    function recordTemperature(uint256 _batchId, uint256 _temperature) public {
        require(_batchId < nextBatchId, "Batch does not exist");
        if (_temperature > 30) {
            emit TemperatureExceeded(_batchId, _temperature);
        }
    }
}
