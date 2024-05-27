extern crate substreams;

use substreams::prelude::*;
use substreams::store::{StoreGet, StoreSet, Store};
use substreams_ethereum::pb::eth::v2::{Block, Log};

#[substreams::handlers::map]
fn map_batches(logs: Vec<Log>) -> Result<BatchEvents, Error> {
    let mut batch_events = BatchEvents::default();

    for log in logs {
        if let Some(event) = decode_batch_created(&log) {
            batch_events.batch_created.push(event);
        } else if let Some(event) = decode_batch_updated(&log) {
            batch_events.batch_updated.push(event);
        } else if let Some(event) = decode_temperature_exceeded(&log) {
            batch_events.temperature_exceeded.push(event);
        }
    }

    Ok(batch_events)
}

fn decode_batch_created(log: &Log) -> Option<BatchCreatedEvent> {
    Some(BatchCreatedEvent {
        id: log.block_index as u64,
        manufacturer: "Example Manufacturer".to_string(),
        manufacture_date: 1625097600,
        expiry_date: 1656633600,
        status: "Created".to_string(),
    })
}

fn decode_batch_updated(log: &Log) -> Option<BatchUpdatedEvent> {
    Some(BatchUpdatedEvent {
        id: log.block_index as u64,
        status: "Updated".to_string(),
    })
}

fn decode_temperature_exceeded(log: &Log) -> Option<TemperatureExceededEvent> {
    Some(TemperatureExceededEvent {
        id: log.block_index as u64,
        batch_id: log.block_index as u64,
        temperature: 30,
        timestamp: 1625097600,
    })
}

#[derive(Default)]
struct BatchEvents {
    batch_created: Vec<BatchCreatedEvent>,
    batch_updated: Vec<BatchUpdatedEvent>,
    temperature_exceeded: Vec<TemperatureExceededEvent>,
}

struct BatchCreatedEvent {
    id: u64,
    manufacturer: String,
    manufacture_date: i64,
    expiry_date: i64,
    status: String,
}

struct BatchUpdatedEvent {
    id: u64,
    status: String,
}

struct TemperatureExceededEvent {
    id: u64,
    batch_id: u64,
    temperature: i32,
    timestamp: i64,
}
