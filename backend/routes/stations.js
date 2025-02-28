const express = require('express');
const router = express.Router();
const { getStations, getNearbyStations } = require('../controllers/stationsController');

router.get('/stations', getStations);
router.get('/nearbystations', getNearbyStations);

module.exports = router;