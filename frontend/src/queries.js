import { gql } from "@apollo/client"; // Import gql for defining GraphQL queries

// Define the GraphQL query to fetch batches data
export const GET_BATCHES = gql`
  {
    batches {
      id
      manufacturer
      manufactureDate
      expiryDate
      status
    }
  }
`;

// Define the GraphQL query to fetch temperature events data
export const GET_TEMPERATURE_EVENTS = gql`
  {
    temperatureEvents {
      id
      batchId
      temperature
      timestamp
    }
  }
`;

// Define the GraphQL query to fetch batches by manufacturer
export const GET_BATCHES_BY_MANUFACTURER = gql`
  query getBatchesByManufacturer($manufacturer: String!) {
    batches(where: { manufacturer: $manufacturer }) {
      id
      manufacturer
      manufactureDate
      expiryDate
      status
    }
  }
`;

// Define the GraphQL query to fetch temperature events by batch ID
export const GET_TEMPERATURE_EVENTS_BY_BATCH = gql`
  query getTemperatureEventsByBatch($batchId: String!) {
    temperatureEvents(where: { batchId: $batchId }) {
      id
      batchId
      temperature
      timestamp
    }
  }
`;
