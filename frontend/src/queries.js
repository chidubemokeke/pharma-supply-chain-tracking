import { gql } from "@apollo/client";

// Query to get all batches
export const GET_BATCHES = gql`
  query GetBatches {
    batches {
      id
      manufacturer
      manufactureDate
      expiryDate
      status
    }
  }
`;

// Query to get batch details by ID
export const GET_BATCH_DETAILS = gql`
  query GetBatchDetails($id: ID!) {
    batch(id: $id) {
      id
      manufacturer
      manufactureDate
      expiryDate
      status
      temperatureEvents {
        id
        temperature
        timestamp
      }
    }
  }
`;

// Query to get all temperature events
export const GET_TEMPERATURE_EVENTS = gql`
  query GetTemperatureEvents {
    temperatureEvents {
      id
      batchId
      temperature
      timestamp
    }
  }
`;
