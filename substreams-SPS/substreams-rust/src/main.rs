extern crate substreams;

use substreams::prelude::*;
use substreams::store::{StoreGet, StoreSet, Store};
use substreams_ethereum::pb::eth::v2::Block;
use substreams::errors::Error;
use substreams_ethereum::pb::eth::v2::Event;
use substreams_ethereum::pb::eth::v2::Transaction;
use substreams_ethereum::pb::eth::v2::Log;

#[substreams::handlers::map]
fn extract_batch_created(log: Log) -> Result<BatchCreatedEvent, Error> {
    let event = decode_batch_created(log)?;
    Ok(event)
}

#[substreams::handlers::map]
fn extract_batch_updated(log: Log) -> Result<BatchUpdatedEvent, Error> {
    let event = decode_batch_updated(log)?;
    Ok(event)
}

#[substreams::handlers::map]
fn extract_temperature_exceeded(log: Log) -> Result<TemperatureExceededEvent, Error> {
    let event = decode_temperature_exceeded(log)?;
    Ok(event)
}

fn decode_batch_created(log: Log) -> Result<BatchCreatedEvent, Error> {
    // Implement the decoding logic for BatchCreated event
}

fn decode_batch_updated(log: Log) -> Result<BatchUpdatedEvent, Error> {
    // Implement the decoding logic for BatchUpdated event
}

fn decode_temperature_exceeded(log: Log) -> Result<TemperatureExceededEvent, Error> {
    // Implement the decoding logic for TemperatureExceeded event
}
