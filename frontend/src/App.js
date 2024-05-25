import React, { useState } from "react"; // Import React and useState hook
import { useQuery } from "@apollo/client"; // Import useQuery hook from Apollo Client
import {
  GET_BATCHES,
  GET_BATCH_DETAILS,
  GET_TEMPERATURE_EVENTS,
} from "./queries"; // Import defined GraphQL queries
import "./App.css"; // Import CSS for styling

function App() {
  // Execute the GET_BATCHES query and destructure the returned values
  const {
    loading: loadingBatches,
    error: errorBatches,
    data: dataBatches,
  } = useQuery(GET_BATCHES);
  // Execute the GET_TEMPERATURE_EVENTS query and destructure the returned values
  const {
    loading: loadingTemperatureEvents,
    error: errorTemperatureEvents,
    data: dataTemperatureEvents,
  } = useQuery(GET_TEMPERATURE_EVENTS);
  const [selectedBatchId, setSelectedBatchId] = useState(null); // State to store the selected batch ID

  // Execute the GET_BATCH_DETAILS query for the selected batch ID, skip if no batch is selected
  const {
    loading: loadingBatchDetails,
    error: errorBatchDetails,
    data: dataBatchDetails,
  } = useQuery(GET_BATCH_DETAILS, {
    variables: { id: selectedBatchId }, // Variables for the query
    skip: !selectedBatchId, // Skip query if no batch is selected
  });

  // Handle loading and error states for any of the queries
  if (
    loadingBatches ||
    loadingTemperatureEvents ||
    (selectedBatchId && loadingBatchDetails)
  )
    return <p>Loading...</p>;
  if (
    errorBatches ||
    errorTemperatureEvents ||
    (selectedBatchId && errorBatchDetails)
  )
    return <p>Error :(</p>;

  return (
    <div className="App">
      <h1>Pharmaceutical Batches</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Manufacturer</th>
            <th>Manufacture Date</th>
            <th>Expiry Date</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over the batches data and render each batch in a table row */}
          {dataBatches.batches.map((batch) => (
            <tr key={batch.id}>
              <td>{batch.id}</td>
              <td>{batch.manufacturer}</td>
              <td>
                {new Date(parseInt(batch.manufactureDate)).toLocaleDateString()}
              </td>
              <td>
                {new Date(parseInt(batch.expiryDate)).toLocaleDateString()}
              </td>
              <td>{batch.status}</td>
              <td>
                <button onClick={() => setSelectedBatchId(batch.id)}>
                  View Details
                </button>{" "}
                {/* Set selected batch ID on button click */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Render batch details if a batch is selected */}
      {selectedBatchId && dataBatchDetails && (
        <div>
          <h2>Batch Details</h2>
          <p>ID: {dataBatchDetails.batch.id}</p>
          <p>Manufacturer: {dataBatchDetails.batch.manufacturer}</p>
          <p>
            Manufacture Date:{" "}
            {new Date(
              parseInt(dataBatchDetails.batch.manufactureDate)
            ).toLocaleDateString()}
          </p>
          <p>
            Expiry Date:{" "}
            {new Date(
              parseInt(dataBatchDetails.batch.expiryDate)
            ).toLocaleDateString()}
          </p>
          <p>Status: {dataBatchDetails.batch.status}</p>
          <h3>Temperature Events</h3>
          <ul>
            {/* Map over the temperature events for the selected batch and render each event */}
            {dataBatchDetails.batch.temperatureEvents.map((event) => (
              <li key={event.id}>
                Temperature: {event.temperature} - Date:{" "}
                {new Date(parseInt(event.timestamp)).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <h2>All Temperature Events</h2>
        <ul>
          {/* Map over all temperature events and render each event */}
          {dataTemperatureEvents.temperatureEvents.map((event) => (
            <li key={event.id}>
              Batch ID: {event.batchId} - Temperature: {event.temperature} -
              Date: {new Date(parseInt(event.timestamp)).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
