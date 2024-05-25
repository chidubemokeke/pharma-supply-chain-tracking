extern crate substreams;

use substreams::prelude::*;  // Import the Substreams prelude
use substreams::store::{StoreGet, StoreSet, Store};  // Import store traits for handling data
use substreams_ethereum::pb::eth::v2::Block;  // Import Ethereum block type
use substreams::errors::Error;  // Import Substreams error handling
use substreams_ethereum::pb::eth::v2::Event;  // Import Ethereum event type
use substreams_ethereum::pb::eth::v2::Transaction;  // Import Ethereum transaction type
use substreams_ethereum::pb::eth::v2::Log;  // Import Ethereum log type

#[substreams::handlers::map]  // Define a map handler for Substreams
fn extract_batch_created(log: Log) -> Result<BatchCreatedEvent, Error> {
    let event = decode_batch_created(log)?;  // Decode the log to a BatchCreatedEvent
    Ok(event)  // Return the event
}

#[substreams::handlers::map]  // Define another map handler for Substreams
fn extract_batch_updated(log: Log) -> Result<BatchUpdatedEvent, Error> {
    let event = decode_batch_updated(log)?;  // Decode the log to a BatchUpdatedEvent
    Ok(event)  // Return the event
}

#[substreams::handlers::map]  // Define a third map handler for Substreams
fn extract_temperature_exceeded(log: Log) -> Result<TemperatureExceededEvent, Error> {
    let event = decode_temperature_exceeded(log)?;  // Decode the log to a TemperatureExceededEvent
    Ok(event)  // Return the event
}

// Function to decode BatchCreated logs
fn decode_batch_created(log: Log) -> Result<BatchCreatedEvent, Error> {
    // Implement the decoding logic for BatchCreated event
}

// Function to decode BatchUpdated logs
fn decode_batch_updated(log: Log) -> Result<BatchUpdatedEvent, Error> {
    // Implement the decoding logic for BatchUpdated event
}

// Function to decode TemperatureExceeded logs
fn decode_temperature_exceeded(log: Log) -> Result<TemperatureExceededEvent, Error> {
    // Implement the decoding logic for TemperatureExceeded event
}
