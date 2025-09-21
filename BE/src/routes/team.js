const express = require('express');
const router = express.Router();
const TeamMember = require('../models/TeamMember');
const { authenticateToken, requirePermission } = require('../middlewares/auth');
const { sendResponse, sendError } = require('../utils/response');
const {upload} = require('../middlewares/fileUpload');

// Get all team members
router.get('/', async (req, res) => {
  try {
    const { active } = req.query;
    const filter = {};
    
    if (active !== 'false') filter.isActive = true;
    
    const teamMembers = await TeamMember.find(filter).sort({ createdAt: -1 });
    sendResponse(res, teamMembers, 'Team members retrieved successfully');
  } catch (error) {
    sendError(res, 500, 'Error fetching team members', error.message);
  }
});

// Get team member by ID
router.get('/:id', async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    if (!teamMember) {
      return sendError(res, 404, 'Team member not found');
    }
    sendResponse(res, teamMember, 'Team member retrieved successfully');
  } catch (error) {
    sendError(res, 500, 'Error fetching team member', error.message);
  }
});

// Create new team member (admin) with image upload
router.post(
  '/',
  authenticateToken,
  requirePermission('manage-team'),
  upload.single('img'),
  async (req, res) => {
    try {
      const teamMember = new TeamMember({
        name: req.body.name,
        role: req.body.role,
        img: req.file ? `/uploads/${req.file.filename}` : null
      });
      await teamMember.save();
      sendResponse(res, teamMember, 'Team member created successfully', 201);
    } catch (error) {
      sendError(res, 400, 'Error creating team member', error.message);
    }
  }
);

// Update team member (admin) with optional image upload
router.put(
  '/:id',
  authenticateToken,
  requirePermission('manage-team'),
  upload.single('img'),
  async (req, res) => {
    try {
      const updateData = {
        name: req.body.name,
        role: req.body.role
      };
      if (req.file) {
        updateData.img = `/uploads/${req.file.filename}`;
      }

      const teamMember = await TeamMember.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!teamMember) {
        return sendError(res, 404, 'Team member not found');
      }

      sendResponse(res, teamMember, 'Team member updated successfully');
    } catch (error) {
      sendError(res, 400, 'Error updating team member', error.message);
    }
  }
);

// Delete team member (admin)
router.delete('/:id', authenticateToken, requirePermission('manage-team'), async (req, res) => {
  try {
    const teamMember = await TeamMember.findByIdAndDelete(req.params.id);
    if (!teamMember) {
      return sendError(res, 404, 'Team member not found');
    }
    sendResponse(res, null, 'Team member deleted successfully');
  } catch (error) {
    sendError(res, 500, 'Error deleting team member', error.message);
  }
});

module.exports = router;
