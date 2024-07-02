const express = require('express');
const { 
    createAnnouncement,
    getAnnouncement,
} = require('../controllers/productController');
const router = express.Router();


router.post('/createAnnouncement',createAnnouncement )
router.get('/getAnnouncement',getAnnouncement )
module.exports = router;

