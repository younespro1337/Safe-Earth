const express = require('express');
const { isAuthenticatedUser } = require('../middlewares/auth');
const { 
    uploadAndSaveCsvFiles,
    getAllVilagesData, 
    downloadCsvFile, 
    signUpUser, 
    signInUser, 
    updatedetails, 
    savesettings,
    searchVillages,
    saveLocation
} = require('../controllers/userController');

const router = express.Router();

// Define routes with authentication middleware

router.post('/uploadCsvData' , uploadAndSaveCsvFiles);
router.get('/getAllVilagesData',  getAllVilagesData);
router.get('/downloadCsvFile', downloadCsvFile);
router.post('/signup', signUpUser);
router.post('/signin', signInUser);
router.post('/updatedetails', updatedetails);
router.post('/savesettings', isAuthenticatedUser,savesettings);
router.get('/searchVillages', searchVillages);
router.get('/saveLocation', saveLocation);

module.exports = router;
