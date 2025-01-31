const mongoose = require('mongoose');

const geolocationSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
    unique: true
  },
  city: String,
  country: String,
  countryCode: String,
  region: String,
  regionName: String,
  isp: String,
  lat: Number,
  lon: Number,
  org: String,
  timezone: String,
  zip: String,
  as: String,
  status: {
    type: String,
    enum: ['success', 'fail'],
    required: true
  },
}, { timestamps: true });

const Geolocation = mongoose.model('Geolocation', geolocationSchema);

module.exports = Geolocation;
