const express = require("express"); // Import express
const app = express(); // Create an express app
const port = 3000; // Define the port

// Define a route to handle incoming sensor data
app.post("/sensor-data", express.json(), async (req, res) => {
  const data = req.body; // Get the sensor data from the request body
  await handleSensorData(data); // Process the sensor data
  res.status(200).send("Sensor data processed"); // Send a response
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
