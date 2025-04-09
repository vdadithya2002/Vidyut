const express = require('express');
const router = express.Router();
const { getStations, getNearbyStations } = require('../controllers/stationsController');

// @route   GET /api/stations
// @desc    Get all stations
router.get('/', getStations);

// @route   GET /api/stations/nearby
// @desc    Get nearby stations
router.get('/nearby', getNearbyStations);

module.exports = router;