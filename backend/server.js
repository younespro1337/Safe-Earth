const app = require('./app');
const express = require('express')
const path = require('path');
const connectDatabase = require('./config/database');
const cloudinary = require('cloudinary');
const PORT = process.env.PORT || 8080;
const fs = require('fs');

// UncaughtException Error
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    process.exit(1);
});

connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



 
// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
// Start the server

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});







