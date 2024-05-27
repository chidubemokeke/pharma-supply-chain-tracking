import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  BatchCreated,
  BatchUpdated,
  ChainlinkCancelled,
  ChainlinkFulfilled,
  ChainlinkRequested,
  TemperatureExceeded
} from "../generated/Contract/Contract"

export function createBatchCreatedEvent(
  id: BigInt,
  manufacturer: string,
  manufactureDate: BigInt,
  expiryDate: BigInt
): BatchCreated {
  let batchCreatedEvent = changetype<BatchCreated>(newMockEvent())

  batchCreatedEvent.parameters = new Array()

  batchCreatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  batchCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "manufacturer",
      ethereum.Value.fromString(manufacturer)
    )
  )
  batchCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "manufactureDate",
      ethereum.Value.fromUnsignedBigInt(manufactureDate)
    )
  )
  batchCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "expiryDate",
      ethereum.Value.fromUnsignedBigInt(expiryDate)
    )
  )

  return batchCreatedEvent
}

export function createBatchUpdatedEvent(
  id: BigInt,
  status: string
): BatchUpdated {
  let batchUpdatedEvent = changetype<BatchUpdated>(newMockEvent())

  batchUpdatedEvent.parameters = new Array()

  batchUpdatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  batchUpdatedEvent.parameters.push(
    new ethereum.EventParam("status", ethereum.Value.fromString(status))
  )

  return batchUpdatedEvent
}

export function createChainlinkCancelledEvent(id: Bytes): ChainlinkCancelled {
  let chainlinkCancelledEvent = changetype<ChainlinkCancelled>(newMockEvent())

  chainlinkCancelledEvent.parameters = new Array()

  chainlinkCancelledEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  )

  return chainlinkCancelledEvent
}

export function createChainlinkFulfilledEvent(id: Bytes): ChainlinkFulfilled {
  let chainlinkFulfilledEvent = changetype<ChainlinkFulfilled>(newMockEvent())

  chainlinkFulfilledEvent.parameters = new Array()

  chainlinkFulfilledEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  )

  return chainlinkFulfilledEvent
}

export function createChainlinkRequestedEvent(id: Bytes): ChainlinkRequested {
  let chainlinkRequestedEvent = changetype<ChainlinkRequested>(newMockEvent())

  chainlinkRequestedEvent.parameters = new Array()

  chainlinkRequestedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  )

  return chainlinkRequestedEvent
}

export function createTemperatureExceededEvent(
  id: BigInt,
  temperature: BigInt
): TemperatureExceeded {
  let temperatureExceededEvent = changetype<TemperatureExceeded>(newMockEvent())

  temperatureExceededEvent.parameters = new Array()

  temperatureExceededEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  temperatureExceededEvent.parameters.push(
    new ethereum.EventParam(
      "temperature",
      ethereum.Value.fromUnsignedBigInt(temperature)
    )
  )

  return temperatureExceededEvent
}
