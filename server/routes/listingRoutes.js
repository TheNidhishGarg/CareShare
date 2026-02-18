const express = require('express');
const { createListing } = require('../controllers/listingController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createListing);

module.exports = router;
