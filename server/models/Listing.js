const mongoose = require('mongoose');

const CATEGORIES = [
  'Education Support',
  'School Uniforms',
  'Clothes (All Ages)',
  'Food & Ration',
  'Health & Medical',
  'Digital Access',
  'Household Essentials',
  'Baby & Child Care',
  'Skill & Employment Support',
  'Emergency Help'
];

const listingSchema = new mongoose.Schema({
  donor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: CATEGORIES,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  imageURL: {
    type: String,
    required: true,
    trim: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'requested', 'completed'],
    default: 'available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = {
  Listing: mongoose.model('Listing', listingSchema),
  CATEGORIES
};
