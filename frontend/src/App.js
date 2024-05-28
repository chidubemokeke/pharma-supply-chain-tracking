import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
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
  // State to hold batches and temperature events data
  const [batchesData, setBatchesData] = useState([]);
  const [tempEventsData, setTempEventsData] = useState([]);
  const [error, setError] = useState('');
  const [tempRange, setTempRange] = useState([0, 100]);
  const [filter, setFilter] = useState({ status: '', manufacturer: '' });

  // Fetch batches data using the GET_BATCHES query
  const { loading: batchesLoading, error: batchesError } = useQuery(GET_BATCHES, {
    onCompleted: (data) => setBatchesData(data.batches),
    onError: (error) => setError(error.message)
  });

  // Fetch temperature events data using the GET_TEMPERATURE_EVENTS query
  const { loading: tempEventsLoading, error: tempEventsError } = useQuery(GET_TEMPERATURE_EVENTS, {
    onCompleted: (data) => setTempEventsData(data.temperatureEvents),
    onError: (error) => setError(error.message)
  });

  // Function to handle temperature range change
  const handleTempRangeChange = (e) => {
    const value = e.target.value === "All" ? [0, 100] : e.target.value.split('-').map(Number);
    setTempRange(value);
  };

  // Function to handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  // Filter temperature events based on the selected temperature range
  const filteredTempEvents = tempEventsData.filter(event =>
    event.temperature >= tempRange[0] && event.temperature < tempRange[1]
  );

  // Filter batches based on the selected filters
  const filteredBatches = batchesData.filter(batch =>
    (filter.status ? batch.status === filter.status : true) &&
    (filter.manufacturer ? batch.manufacturer === filter.manufacturer : true)
  );

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a href="/" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
              <span className="fs-5 fw-bolder d-none d-sm-inline">MediChain</span>
            </a>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li>
                <Link to="/" data-bs-toggle="collapse" className="nav-link text-white px-0 align-middle">
                  <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span> </Link>
              </li>
              <li>
                <Link to="/preview" className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-list-task"></i> <span className="ms-1 d-none d-sm-inline">Manage Supply</span> </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className='p-2 d-flex justify-content-center shadow'>
            <h4>Pharmaceutical Supply Chain Tracker</h4>
          </div>
          <div className='px-5 py-3'>
            <div className='d-flex justify-content-center mt-2'>
              <h3>Batches</h3>
            </div>
            <div className='text-danger'>
              {error && error}
            </div>
            <div className='mt-3'>
              <div className='d-flex justify-content-between mb-3'>
                <div>
                  <label htmlFor="statusFilter">Status Filter: </label>
                  <select name="status" id="statusFilter" onChange={handleFilterChange} className="form-select">
                    <option value="">All</option>
                    <option value="Temperature Exceeded">Temperature Exceeded</option>
                    <option value="Temperature Normal">Temperature Normal</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="manufacturerFilter">Manufacturer Filter: </label>
                  <select name="manufacturer" id="manufacturerFilter" onChange={handleFilterChange} className="form-select">
                    <option value="">All</option>
                    <option value="Dipo-Test1">Dipo-Test1</option>
                    <option value="Wellness Ltd">Wellness Ltd</option>
                  </select>
                </div>
              </div>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Batch ID</th>
                    <th>Manufacturer</th>
                    <th>Manufacture Date</th>
                    <th>Expiry Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBatches.map((batch) => (
                    <tr key={batch.id}>
                      <td>{parseInt(batch.id)}</td>
                      <td>{batch.manufacturer}</td>
                      <td>{new Date(parseInt(batch.manufactureDate)).toLocaleDateString()}</td>
                      <td>{new Date(parseInt(batch.expiryDate)).toLocaleDateString()}</td>
                      <td className={batch.status === "Temperature Exceeded" ? "text-danger" : "text-success"}>
                        {batch.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='px-5 py-3'>
            <div className='d-flex justify-content-center mt-2'>
              <h3>Temperature Events</h3>
            </div>
            <div className='text-danger'>
              {error && error}
            </div>
            <div className='mt-3'>
              <div className='d-flex justify-content-between mb-3'>
                <div>
                  <label htmlFor="tempRange">Temperature Range: </label>
                  <select id="tempRange" onChange={handleTempRangeChange} className="form-select">
                    <option value="All">All</option>
                    <option value="0-10">0-10</option>
                    <option value="10-20">10-20</option>
                    <option value="20-30">20-30</option>
                    <option value="30-40">30-40</option>
                    <option value="40-50">40-50</option>
                    <option value="50-60">50-60</option>
                    <option value="60-70">60-70</option>
                    <option value="70-80">70-80</option>
                    <option value="80-90">80-90</option>
                    <option value="90-100">90-100</option>
                  </select>
                </div>
              </div>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Event ID</th>
                    <th>Batch ID</th>
                    <th>Temperature (°C)</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTempEvents.map((event) => (
                    <tr key={event.id}>
                      <td>{event.id}</td>
                      <td>{parseInt(event.batchId)}</td>
                      <td>{event.temperature}</td>
                      <td>{new Date(parseInt(event.timestamp)).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;