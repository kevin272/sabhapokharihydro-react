const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const { upload } = require('../middlewares/fileUpload');
const { authenticateToken, requirePermission } = require('../middlewares/auth');
const { sendResponse, sendError } = require('../utils/response');

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    sendResponse(res, blogs, 'Blogs retrieved successfully');
  } catch (error) {
    sendError(res, 500, 'Error fetching blogs', error.message);
  }
});

// Get blog by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return sendError(res, 404, 'Blog not found');
    }
    sendResponse(res, blog, 'Blog retrieved successfully');
  } catch (error) {
    sendError(res, 500, 'Error fetching blog', error.message);
  }
});

// Create blog (requires image upload)
router.post(
  '/',
  authenticateToken,
  requirePermission('manage-blog'),
  upload.single('image'),
  async (req, res) => {
    try {
      if (!req.file) {
        return sendError(res, 400, 'Image file is required');
      }

      const blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        category: req.body.category || 'general',
        tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : [],
        image: `/uploads/${req.file.filename}`,
        author: req.body.author || 'admin',
        isPublic: req.body.isPublic !== 'false',
      });

      await blog.save();
      sendResponse(res, blog, 'Blog created successfully', 201);
    } catch (error) {
      sendError(res, 400, 'Error creating blog', error.message);
    }
  }
);

// Update blog
router.put(
  '/:id',
  authenticateToken,
  requirePermission('manage-blog'),
  upload.single('image'),
  async (req, res) => {
    try {
      const updateData = { ...req.body };

      if (req.file) {
        updateData.image = `/uploads/${req.file.filename}`;
      }

      if (req.body.tags) {
        updateData.tags = req.body.tags.split(',').map(tag => tag.trim());
      }

      const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!blog) {
        return sendError(res, 404, 'Blog not found');
      }

      sendResponse(res, blog, 'Blog updated successfully');
    } catch (error) {
      sendError(res, 400, 'Error updating blog', error.message);
    }
  }
);

// Delete blog
router.delete(
  '/:id',
  authenticateToken,
  requirePermission('manage-blog'),
  async (req, res) => {
    try {
      const blog = await Blog.findByIdAndDelete(req.params.id);
      if (!blog) {
        return sendError(res, 404, 'Blog not found');
      }

      sendResponse(res, null, 'Blog deleted successfully');
    } catch (error) {
      sendError(res, 500, 'Error deleting blog', error.message);
    }
  }
);

module.exports = router;
