const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Settings schema
const SettingsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  associationNumber: {
    type: String,
    required: true
  },
  selectedState: {
    type:String,
    required: true
  },
  selectedCity: {
    type:String,
    required: false
  },
  mapStyle: {
    type: String,
    enum: ['Cycle', 'Transport', 'Landscape', 'Outdoors', 'Transport-dark', 'Spinal-map', 'Pioneer', 'Mobile-atlas', 'Neighbourhood', 'Atlas'],
    default: 'Transport'
  },
  selectedLanguage: {
    type: String,
    enum: ['English', 'French', 'Arabic'],
    default: 'English'
  }
}, { timestamps: true });

// Create the Settings model
const Settings = mongoose.model('Settings', SettingsSchema);

module.exports = Settings;
