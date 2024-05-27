const axios = require("axios"); // We use axios to send HTTP requests

// Define a function to simulate sending sensor data to our server
async function simulateSensorData() {
  // Define an array of sample sensor data
  const sensorData = [
    { batchId: 1, temperature: 28 },
    { batchId: 2, temperature: 22 },
    { batchId: 3, temperature: 35 },
    // Add more sample data as needed
  ];

  // Iterate over each sample data point
  for (const data of sensorData) {
    try {
      // Send a POST request to the server with the sensor data
      const response = await axios.post(
        "http://localhost:3000/sensor-data",
        data
      ); // Point to your server
      console.log(response.data); // Log the server's response
    } catch (error) {
      console.error("Error sending sensor data:", error); // Log any errors that occur
    }
  }
}

// Call the simulateSensorData function to start the simulation
simulateSensorData();
