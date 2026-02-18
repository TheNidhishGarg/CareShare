const Request = require('../models/Request');
const { Listing } = require('../models/Listing');
const User = require('../models/User');

const createRequest = async (req, res, next) => {
  try {
    const { listing_id, delivery_type } = req.body;

    if (!listing_id || !delivery_type) {
      return res.status(400).json({ message: 'listing_id and delivery_type are required' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!['receiver', 'both'].includes(user.role)) {
      return res.status(403).json({ message: 'Only receivers can create requests' });
    }

    const listing = await Listing.findById(listing_id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.status !== 'available') {
      return res.status(400).json({ message: 'Listing is not available for request' });
    }

    const request = await Request.create({
      listing_id,
      receiver_id: req.user.id,
      delivery_type
    });

    listing.status = 'requested';
    await listing.save();

    return res.status(201).json({
      message: 'Request created successfully',
      request
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createRequest
};
