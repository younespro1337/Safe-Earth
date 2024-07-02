// Import Mongoose
const mongoose = require('mongoose');

// Define the schema
const VillageSchema = new mongoose.Schema({
  position: {
    lat: {
      type:Number,
      required:true
    },
    lon: {
      type:Number,
      required:true
    }
  },

  name: {
    type: String,
    required: true
  },

  details: {
    type: String,
    required: false,
  },
  moreImages: [
    {
      publicId: {
        type: String,
        required: false
      },
      url: {
        type: String,
        required: false
      }
    }
  ],
  donate: {
    type: Number,
    default: 0
  }
});

// Create and export the model
const Village = mongoose.model('Villages', VillageSchema);
module.exports = Village;
