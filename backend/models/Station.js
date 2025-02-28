const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  type: { type: String, required: true },  // AC/DC charging
  availableSlots: { type: Number, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  price: { type: String, required: true }, // Change price to String to include "per kWh"
  vehicleType: { type: String, required: true }
});

stationSchema.index({ location: '2dsphere' }); // Create a 2dsphere index on the location field

const Station = mongoose.model('Station', stationSchema);

module.exports = Station;