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
