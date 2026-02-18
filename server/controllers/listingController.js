const { Listing } = require('../models/Listing');
const User = require('../models/User');

const createListing = async (req, res, next) => {
  try {
    const { title, category, description, imageURL, latitude, longitude } = req.body;

    if (!title || !category || !description || !imageURL || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ message: 'All required listing fields must be provided' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!['donor', 'both'].includes(user.role)) {
      return res.status(403).json({ message: 'Only donors can create listings' });
    }

    const listing = await Listing.create({
      donor_id: req.user.id,
      title,
      category,
      description,
      imageURL,
      latitude,
      longitude
    });

    return res.status(201).json({
      message: 'Listing created successfully',
      listing
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createListing
};
