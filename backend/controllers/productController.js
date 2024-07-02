const { parse } = require('url');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const cloudinary = require('cloudinary').v2;
const Announcement = require('../models/announcementModel'); 
const sendToken = require('../utils/sendToken');
const sgMail = require('@sendgrid/mail');
const { Console } = require('console');



exports.createAnnouncement = asyncErrorHandler(async (req, res) => {
   const dialogData = JSON.parse(req.body.dialogData);

   console.log(dialogData)

  try {
    // const dialogData = JSON.parse(req.body.dialogData);

    // Extract relevant properties from dialogData
    const {
      villageName,
      address,
      phone,
      status,
      people,
      needs,
      imageURL,
      // videoURL
    } = dialogData;

    // Log the image URL

    // // Upload the image to Cloudinary
      const uploadedImage = await cloudinary.uploader.upload(imageURL, {
        folder: "Announcements", // Set your desired folder name
        width: 300,
        crop: "scale",
      });

    //   // Log the uploaded image URL
      console.log('Uploaded Image URL:', uploadedImage.secure_url);
  

    // // Upload the video to Cloudinary
    // if (videoURL) {
    //   const uploadedVideo = await cloudinary.uploader.upload(videoURL, {
    //     folder: "Announcements", // Set your desired folder name
    //     width: 300,
    //     crop: "scale",
    //   });

    //   // Log the uploaded video URL
    //   console.log('Uploaded Video URL:', uploadedVideo.secure_url);
    // } else {
    //   console.log('videoURL not there')
    // }

    // Create an announcement with the extracted values and uploaded image
    const announcement = await Announcement.create({
      villageName,
      address,
      phone,
      status,
      people,
      needs,
      imageURL: imageURL? {
        public_id: uploadedImage.public_id,
        url: uploadedImage.secure_url,
      } : null,
      // videoURL: videoURL? {
      //   public_id: uploadedVideo.public_id,
      //   url: uploadedVideo.secure_url,
      // } : null,
      // Add other announcement fields as needed
    });

    // Send a response
    res.status(201).json({ message: 'Announcement created successfully', announcement });
  } catch (error) {
    // Handle any errors that may occur during parsing or processing
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

  



exports.getAnnouncement = asyncErrorHandler(async (req, res) => {
  // console.log('i got a req here: ' , req.body)
  try {
    // Query the database to fetch all announcements
    const announcements = await Announcement.find();

    // Send the announcements as a JSON response
    // console.log(announcements)
    res.status(200).json({ announcements });
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ error: 'An error occurred while fetching announcements' });
  }
});
