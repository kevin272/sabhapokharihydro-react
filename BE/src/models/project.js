const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    maxlength: 200
  },
  images: [{
    url: String,
    caption: String,
    isMainImage: {
      type: Boolean,
      default: false
    }
  }],
  technologies: [String], // e.g., ["Turbine", "Dam Construction", "Hydraulic Modeling"]
  client: {
    type: String // client or owner name
  },
  river: {
    type: String // e.g., "Tamor River"
  },
  capacityMW: {
    type: Number // hydropower capacity in MW
  },
  duration: {
    start: Date,
    end: Date
  },
  status: {
    type: String,
    enum: ['planning', 'in-progress', 'completed', 'on-hold'],
    default: 'planning'
  },
  featured: {
    type: Boolean,
    default: false
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update `updatedAt` on save
ProjectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Project', ProjectSchema);
