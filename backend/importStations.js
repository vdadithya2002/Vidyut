const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Connect to MongoDB (using MongoDB Atlas URI)
mongoose.connect('mongodb+srv://Vidyut:vidyut%40002@vidyutcluster.ea428.mongodb.net/chargingStations?retryWrites=true&w=majority&appName=VidyutCluster', {
  tls: true // Enable TLS/SSL
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// Define the Charging Station Schema
const stationSchema = new mongoose.Schema({
  name: String,
  location: {
    lat: Number,
    lng: Number
  },
  type: String,  // AC/DC charging
  availableSlots: Number,
  address: String,
  contact: String,
  price: String, // Change price to String to include "per kWh"
  vehicleType: String
});

const Station = mongoose.model('Station', stationSchema, 'stations'); // Explicitly specify the collection name

// Read the JSON file
const dataPath = path.join(__dirname, 'stations.json');
const stationsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Insert data into MongoDB
Station.insertMany(stationsData)
  .then(() => {
    console.log('Data imported successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error importing data:', err);
    mongoose.connection.close();
  });
