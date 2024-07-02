const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  villageName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  address: {
    type: String,
    required: true,
    minlength: 10, 
    maxlength: 100 
  },
  phone: {
    type: String,
    required: true,
    minlength: 10, 
    maxlength: 15 
  },
  status: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    required: true
  },
  people: {
    type: Number,
    required: true
  },
  needs: {
    required:true,
    type: [String], 
    default: []
  },
  imageURL: {
    public_id:{
      type:String,
      required: false,
    },
    url: {
      type:String,
      required: false,
    },
  },
  videoURL:{
    public_id:{
      type:String,
      required: false,
    },
    url: {
      type:String,
      required: false,
    },
  },


  liveStreamURL: {
    type: String
  },
  // userContributions: {
  //   type: [
  //     {
  //       name: {
  //         type: String,
  //         required: true,
  //         minlength: 3,
  //         maxlength: 50
  //       },
  //       destination: {
  //         type: String,
  //         required: true,
  //         minlength: 3,
  //         maxlength: 50
  //       },
  //       email: {
  //         type: String,
  //         required: true,
  //         minlength: 10,
  //         maxlength: 40
  //       },
  //       role: {
  //         type: String,
  //         maxlength: 40
  //       },
  //       takenAt: {
  //         type: Date,
  //         required: true,
  //         default: Date.now
  //       },
  //       latitude: {
  //         type: Number,
  //         required: true
  //       },
  //       longitude: {
  //         type: Number,
  //         required: true
  //       }
  //     }
  //   ],
  //   default: []
  // },

});

announcementSchema.index({ location: '2dsphere' }); // Create a geospatial index for location:
// This line tells MongoDB to create a geospatial index on the location field of documents in the Announcement collection. The '2dsphere' index type is specifically designed for storing and querying geographic data on a spherical surface (like the Earth).

// Benefits of Geospatial Index: By creating a geospatial index, you can efficiently perform geospatial queries, such as finding all announcements within a certain radius of a given latitude and longitude or finding the nearest announcements to a specific location. This can be crucial in applications that involve mapping, location-based services, or anything that requires proximity-based searches.

// Improved Query Performance: Without a geospatial index, geospatial queries could be slow and resource-intensive because MongoDB would need to scan the entire collection to find matching documents. The geospatial index significantly improves query performance in such scenarios.

// In summary, adding a geospatial index to the location field is beneficial when your application needs to work with geographic data and perform geospatial queries efficiently. It allows MongoDB to optimize these queries for better performance.

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
