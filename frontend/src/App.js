import React, { useEffect, useState } from "react"; // Import necessary React hooks
import { gql, useQuery } from "@apollo/client"; // Import gql for defining GraphQL queries and useQuery for fetching data
import client from "./apolloClient"; // Import Apollo Client instance

// Define the GraphQL query to fetch batches data
const GET_BATCHES = gql`
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
const GET_TEMPERATURE_EVENTS = gql`
  {
    temperatureEvents {
      id
      batchId
      temperature
      timestamp
    }
  }
`;

function App() {
  // Fetch batches data using the GET_BATCHES query
  const {
    loading: batchesLoading,
    error: batchesError,
    data: batchesData,
  } = useQuery(GET_BATCHES);
  // Fetch temperature events data using the GET_TEMPERATURE_EVENTS query
  const {
    loading: tempEventsLoading,
    error: tempEventsError,
    data: tempEventsData,
  } = useQuery(GET_TEMPERATURE_EVENTS);

  // Show loading message if either query is loading
  if (batchesLoading || tempEventsLoading) return <p>Loading...</p>;
  // Show error message if there is an error in fetching batches data
  if (batchesError) return <p>Error loading batches: {batchesError.message}</p>;
  // Show error message if there is an error in fetching temperature events data
  if (tempEventsError)
    return <p>Error loading temperature events: {tempEventsError.message}</p>;

  return (
    <div>
      <h1>Pharmaceutical Supply Chain Tracker</h1>
      <h2>Batches</h2>
      <ul>
        {batchesData.batches.map((batch) => (
          <li key={batch.id}>
            <p>Batch ID: {batch.id}</p>
            <p>Manufacturer: {batch.manufacturer}</p>
            <p>
              Manufacture Date:{" "}
              {new Date(parseInt(batch.manufactureDate)).toLocaleDateString()}
            </p>
            <p>
              Expiry Date:{" "}
              {new Date(parseInt(batch.expiryDate)).toLocaleDateString()}
            </p>
            <p>Status: {batch.status}</p>
          </li>
        ))}
      </ul>
      <h2>Temperature Events</h2>
      <ul>
        {tempEventsData.temperatureEvents.map((event) => (
          <li key={event.id}>
            <p>Event ID: {event.id}</p>
            <p>Batch ID: {event.batchId}</p>
            <p>Temperature: {event.temperature}°C</p>
            <p>
              Timestamp: {new Date(parseInt(event.timestamp)).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
