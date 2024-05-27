extern crate substreams;

use substreams::prelude::*;
use substreams::store::{StoreGet, StoreSet, Store};
use substreams_ethereum::pb::eth::v2::{Block, Log};

// Define a Substreams handler to map batch events
#[substreams::handlers::map]
fn map_batches(logs: Vec<Log>) -> Result<BatchEvents, Error> {
    // Initialize an empty BatchEvents struct to store our decoded events
    let mut batch_events = BatchEvents::default();

    // Iterate over each log entry
    for log in logs {
        // Decode the log entry into the corresponding event type
        if let Some(event) = decode_batch_created(&log) {
            batch_events.batch_created.push(event);
        } else if let Some(event) = decode_batch_updated(&log) {
            batch_events.batch_updated.push(event);
        } else if let Some(event) = decode_temperature_exceeded(&log) {
            batch_events.temperature_exceeded.push(event);
        }
    }

    // Return the populated BatchEvents struct
    Ok(batch_events)
}

// Function to decode a log entry into a BatchCreatedEvent
fn decode_batch_created(log: &Log) -> Option<BatchCreatedEvent> {
    // Implement the decoding logic for the BatchCreated event
    // Placeholder logic:
    Some(BatchCreatedEvent {
        id: log.block_index as u64, // Example data
        manufacturer: "Example Manufacturer".to_string(),
        manufacture_date: 1625097600,
        expiry_date: 1656633600,
        status: "Created".to_string(),
    })
}

// Function to decode a log entry into a BatchUpdatedEvent
fn decode_batch_updated(log: &Log) -> Option<BatchUpdatedEvent> {
    // Implement the decoding logic for the BatchUpdated event
    // Placeholder logic:
    Some(BatchUpdatedEvent {
        id: log.block_index as u64, // Example data
        status: "Updated".to_string(),
    })
}

// Function to decode a log entry into a TemperatureExceededEvent
fn decode_temperature_exceeded(log: &Log) -> Option<TemperatureExceededEvent> {
    // Implement the decoding logic for the TemperatureExceeded event
    // Placeholder logic:
    Some(TemperatureExceededEvent {
        id: log.block_index as u64, // Example data
        batch_id: log.block_index as u64, // Example data
        temperature: 30,
        timestamp: 1625097600,
    })
}

// Define a struct to hold our batch events
#[derive(Default)]
struct BatchEvents {
    batch_created: Vec<BatchCreatedEvent>,
    batch_updated: Vec<BatchUpdatedEvent>,
    temperature_exceeded: Vec<TemperatureExceededEvent>,
}

// Define a struct for the BatchCreatedEvent
struct BatchCreatedEvent {
    id: u64,
    manufacturer: String,
    manufacture_date: i64,
    expiry_date: i64,
    status: String,
}

// Define a struct for the BatchUpdatedEvent
struct BatchUpdatedEvent {
    id: u64,
    status: String,
}

// Define a struct for the TemperatureExceededEvent
struct TemperatureExceededEvent {
    id: u64,
    batch_id: u64,
    temperature: i32,
    timestamp: i64,
}
