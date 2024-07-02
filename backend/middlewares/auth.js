const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const asyncErrorHandler = require('./asyncErrorHandler');

exports.isAuthenticatedUser = asyncErrorHandler(async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Check if the authorization header exists and contains the Bearer token
    if (authHeader && authHeader.startsWith('Bearer ')) {
        // Remove the 'Bearer ' prefix to extract the token
        const token = authHeader.split(' ')[1];
        // console.log('token:', token);

        try {
            // Verify the token using the JWT_SECRET
            const decodedData = jwt.verify(token, process.env.JWT_SECRET);

            // Retrieve the user from the database using the decoded user ID
            req.user = await User.findById(decodedData.id);

            // Call the next middleware
            return next();
        } catch (error) {
            // If token verification fails, return a 401 Unauthorized error
            return next(new ErrorHandler("Invalid Token", 401));
        }
    } else {
        // If the authorization header is missing or does not contain the token, return a 401 Unauthorized error
        return next(new ErrorHandler("Please Login to Access", 401));
    }
});


exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed`, 403));
        }
        next();
    }
}
