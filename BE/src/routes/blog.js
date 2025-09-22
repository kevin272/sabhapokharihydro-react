// routes/blog.js
const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const { upload } = require('../middlewares/fileUpload');
const { authenticateToken, requirePermission } = require('../middlewares/auth');
const { sendResponse, sendError } = require('../utils/response');

// Helpers
function toParagraphs(req) {
  // If client sent paragraphs as JSON array in form-data (paragraphs: '["p1","p2"]')
  if (req.body.paragraphs) {
    try {
      const arr = JSON.parse(req.body.paragraphs);
      if (Array.isArray(arr) && arr.every(p => typeof p === 'string')) return arr;
    } catch { /* fall through */ }
  }
  // Fallback: split content textarea by blank lines
  if (req.body.content && typeof req.body.content === 'string') {
    return req.body.content
      .split(/\r?\n\r?\n+/)
      .map(s => s.trim())
      .filter(Boolean);
  }
  return [];
}

function toTags(req) {
  if (Array.isArray(req.body.tags)) return req.body.tags;
  if (typeof req.body.tags === 'string') {
    return req.body.tags.split(',').map(t => t.trim()).filter(Boolean);
  }
  return [];
}

function pickThumbnailPath(req) {
  // support either field name
  const file =
    (req.files?.thumbnail?.[0]) ||
    (req.files?.image?.[0]) ||
    (req.file /* if single used by framework somewhere else */);
  return file ? `/uploads/${file.filename}` : null;
}

// Get all blogs (optionally only published)
router.get('/', async (req, res) => {
  try {
    const onlyPublished = req.query.published === 'true'; // optional filter
    const q = onlyPublished ? { isPublished: true } : {};
    const blogs = await Blog.find(q).sort({ createdAt: -1 });
    sendResponse(res, blogs, 'Blogs retrieved successfully');
  } catch (error) {
    sendError(res, 500, 'Error fetching blogs', error.message);
  }
});

// Get blog by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return sendError(res, 404, 'Blog not found');
    sendResponse(res, blog, 'Blog retrieved successfully');
  } catch (error) {
    sendError(res, 500, 'Error fetching blog', error.message);
  }
});

// Create blog (auth + permission)
// Accept either 'thumbnail' or 'image' as the file field
const createUpload = upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'image', maxCount: 1 },
]);

router.post(
  '/',
  authenticateToken,
  requirePermission('manage-blog'),
  createUpload,
  async (req, res) => {
    try {
      const thumbnail = pickThumbnailPath(req);
      if (!thumbnail) return sendError(res, 400, 'Image file is required');

      const paragraphs = toParagraphs(req);
      if (!paragraphs.length) {
        return sendError(res, 400, 'Content/paragraphs are required');
      }

      const blog = new Blog({
        title: req.body.title,
        thumbnail,                                  // ✅ model requires this
        author: req.body.author || 'Sabhapokhari Hydropower',
        date: req.body.date ? new Date(req.body.date) : Date.now(),
        tags: toTags(req),
        paragraphs,                                 // ✅ model requires this
        isPublished: req.body.isPublic !== 'false', // map from isPublic
        category: req.body.category || 'general',
      });

      await blog.save();
      sendResponse(res, blog, 'Blog created successfully', 201);
    } catch (error) {
      sendError(res, 400, 'Error creating blog', error.message);
    }
  }
);

// Update blog
const updateUpload = upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'image', maxCount: 1 },
]);

router.put(
  '/:id',
  authenticateToken,
  requirePermission('manage-blog'),
  updateUpload,
  async (req, res) => {
    try {
      const updateData = {};

      // Optional updates
      if (req.body.title) updateData.title = req.body.title;
      if (req.body.author) updateData.author = req.body.author;
      if (req.body.category) updateData.category = req.body.category;
      if (req.body.date) updateData.date = new Date(req.body.date);

      // Boolean publish toggle (map from isPublic for consistency)
      if (typeof req.body.isPublic !== 'undefined') {
        updateData.isPublished = req.body.isPublic !== 'false';
      }
      if (typeof req.body.isPublished !== 'undefined') {
        updateData.isPublished = req.body.isPublished === 'true' || req.body.isPublished === true;
      }

      const tags = toTags(req);
      if (tags.length) updateData.tags = tags;

      const paragraphs = toParagraphs(req);
      if (paragraphs.length) updateData.paragraphs = paragraphs;

      const thumb = pickThumbnailPath(req);
      if (thumb) updateData.thumbnail = thumb;

      const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
        runValidators: true,
      });
      if (!blog) return sendError(res, 404, 'Blog not found');

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
      if (!blog) return sendError(res, 404, 'Blog not found');
      sendResponse(res, null, 'Blog deleted successfully');
    } catch (error) {
      sendError(res, 500, 'Error deleting blog', error.message);
    }
  }
);

module.exports = router;
