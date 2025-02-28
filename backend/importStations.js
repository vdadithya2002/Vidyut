const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Station = require('./models/Station'); // Import the Station model

// Connect to MongoDB (using MongoDB Atlas URI)
mongoose.connect('mongodb+srv://Vidyut:vidyut%40002@vidyutcluster.ea428.mongodb.net/chargingStations?retryWrites=true&w=majority&appName=VidyutCluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// Read the JSON file
const dataPath = path.join(__dirname, 'stations.json');
const stationsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Transform data to match GeoJSON format and validate coordinates
const transformedData = stationsData
  .filter(station => {
    const [lng, lat] = station.location.coordinates;
    return !isNaN(lng) && !isNaN(lat);
  })
  .map(station => ({
    ...station,
    location: {
      type: 'Point',
      coordinates: station.location.coordinates.map(coord => parseFloat(coord))
    }
  }));

// Insert data into MongoDB
Station.insertMany(transformedData)
  .then(() => {
    console.log('Data imported successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error importing data:', err);
    mongoose.connection.close();
  });