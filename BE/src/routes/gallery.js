const express = require('express');
const router = express.Router();
const Gallery = require('../models/gallery');
const { upload } = require('../middlewares/fileUpload');
const { authenticateToken, requirePermission } = require('../middlewares/auth');
const { sendResponse, sendError } = require('../utils/response');

// Get all gallery items
router.get('/', async (req, res) => {
  try {
    const { category, public: isPublic } = req.query;
    const filter = {};
    
    if (category) filter.category = category;
    if (isPublic !== 'false') filter.isPublic = true;
    
    const galleryItems = await Gallery.find(filter)
      .sort({ order: 1, createdAt: -1 });
      
    sendResponse(res, galleryItems, 'Gallery items retrieved successfully');
  } catch (error) {
    sendError(res, 500, 'Error fetching gallery items', error.message);
  }
});

// Get gallery item by ID
router.get('/:id', async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem) {
      return sendError(res, 404, 'Gallery item not found');
    }
    sendResponse(res, galleryItem, 'Gallery item retrieved successfully');
  } catch (error) {
    sendError(res, 500, 'Error fetching gallery item', error.message);
  }
});

// Get gallery items by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const galleryItems = await Gallery.find({ 
      category: category, 
      isPublic: true 
    }).sort({ order: 1, createdAt: -1 });
    
    sendResponse(res, galleryItems, `${category} gallery items retrieved successfully`);
  } catch (error) {
    sendError(res, 500, 'Error fetching category gallery items', error.message);
  }
});

// Create new gallery item (admin endpoint)
router.post('/', authenticateToken, requirePermission('manage-gallery'), upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return sendError(res, 400, 'Image file is required');
    }
    
    const galleryItem = new Gallery({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category || 'other',
      tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : [],
      image: `/uploads/${req.file.filename}`,
      uploadedBy: req.body.uploadedBy || 'admin',
      order: req.body.order || 0,
      isPublic: req.body.isPublic !== 'false'
    });
    
    await galleryItem.save();
    sendResponse(res, galleryItem, 'Gallery item created successfully', 201);
  } catch (error) {
    sendError(res, 400, 'Error creating gallery item', error.message);
  }
});

// Update gallery item (admin endpoint)
router.put('/:id', authenticateToken, requirePermission('manage-gallery'), upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    if (req.file) {
  updateData.image = `/uploads/${req.file.filename}`;
}
    
    if (req.body.tags) {
      updateData.tags = req.body.tags.split(',').map(tag => tag.trim());
    }
    
    const galleryItem = await Gallery.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!galleryItem) {
      return sendError(res, 404, 'Gallery item not found');
    }
    
    sendResponse(res, galleryItem, 'Gallery item updated successfully');
  } catch (error) {
    sendError(res, 400, 'Error updating gallery item', error.message);
  }
});

// Delete gallery item (admin endpoint)
router.delete('/:id', authenticateToken, requirePermission('manage-gallery'), async (req, res) => {
  try {
    const galleryItem = await Gallery.findByIdAndDelete(req.params.id);
    if (!galleryItem) {
      return sendError(res, 404, 'Gallery item not found');
    }
    
    // Note: In production, you might want to delete the actual file from disk
    // const fs = require('fs');
    // const path = require('path');
    // if (galleryItem.image) {
    //   fs.unlinkSync(path.join(__dirname, '../../', galleryItem.image));
    // }
    
    sendResponse(res, null, 'Gallery item deleted successfully');
  } catch (error) {
    sendError(res, 500, 'Error deleting gallery item', error.message);
  }
});

module.exports = router;