import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  GET_BATCHES,
  GET_BATCH_DETAILS,
  GET_TEMPERATURE_EVENTS,
} from "./queries";
import "./App.css";

function App() {
  const {
    loading: loadingBatches,
    error: errorBatches,
    data: dataBatches,
  } = useQuery(GET_BATCHES);
  const {
    loading: loadingTemperatureEvents,
    error: errorTemperatureEvents,
    data: dataTemperatureEvents,
  } = useQuery(GET_TEMPERATURE_EVENTS);
  const [selectedBatchId, setSelectedBatchId] = useState(null);

  const {
    loading: loadingBatchDetails,
    error: errorBatchDetails,
    data: dataBatchDetails,
  } = useQuery(GET_BATCH_DETAILS, {
    variables: { id: selectedBatchId },
    skip: !selectedBatchId,
  });

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
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
