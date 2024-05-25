const EventEmitter = require("events"); // Import EventEmitter to create a custom event emitter

class SensorSimulator extends EventEmitter {
  constructor() {
    super(); // Call parent class constructor
    this.start(); // Start simulation
  }

  // Method to start emitting simulated sensor data
  start() {
    setInterval(() => {
      // Generate random sensor data
      const data = {
        batchId: Math.floor(Math.random() * 1000), // Random batch ID between 0 and 999
        temperature: Math.random() * 50, // Random temperature between 0 and 50
        humidity: Math.random() * 100, // Random humidity between 0 and 100
        timestamp: Date.now(), // Current timestamp
      };
      this.emit("data", data); // Emit 'data' event with generated data
    }, 5000); // Emit data every 5 seconds
  }
}

module.exports = SensorSimulator; // Export SensorSimulator class
