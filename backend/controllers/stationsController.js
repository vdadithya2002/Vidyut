const Station = require('../models/Station'); // Correct import path

const getStations = async (req, res) => {
  try {
    const stations = await Station.find();
    res.json(stations);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch stations' });
  }
};

// Get nearby stations
const getNearbyStations = async (req, res) => {
  const { lon, lat, maxDistance } = req.query;

  if (!lon || !lat || !maxDistance) {
    return res.status(400).json({ error: 'Longitude, latitude, and maxDistance are required' });
  }

  try {
    const stations = await Station.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lon), parseFloat(lat)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      }
    });

    res.json(stations);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch nearby stations' });
  }
};

module.exports = {
  getStations,
  getNearbyStations
};