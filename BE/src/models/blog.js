// models/blog.js
const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    default: "Sabhapokhari Hydropower",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tags: {
    type: [String],
    default: [],
  },
  paragraphs: {
    type: [String], // array of content blocks
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  category: {
    type: String,
    enum: ["hydropower", "construction", "events", "team", "general"],
    default: "general",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Blog", BlogSchema);
