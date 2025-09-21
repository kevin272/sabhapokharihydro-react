const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { authenticateToken, requirePermission } = require('../middlewares/auth');
const { sendResponse, sendError } = require('../utils/response');

// Get all services
router.get('/', async (req, res) => {
  try {
    const { active } = req.query;
    const filter = active === 'true' ? { isActive: true } : {};
    
    const services = await Service.find(filter).sort({ order: 1, createdAt: -1 });
    sendResponse(res, services, 'Services retrieved successfully');
  } catch (error) {
    sendError(res, 500, 'Error fetching services', error.message);
  }
});

// Get service by ID
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return sendError(res, 404, 'Service not found');
    }
    sendResponse(res, service, 'Service retrieved successfully');
  } catch (error) {
    sendError(res, 500, 'Error fetching service', error.message);
  }
});

// Create new service (admin endpoint)
router.post('/', authenticateToken, requirePermission('manage-services'), async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    sendResponse(res, service, 'Service created successfully', 201);
  } catch (error) {
    sendError(res, 400, 'Error creating service', error.message);
  }
});

// Update service (admin endpoint)
router.put('/:id', authenticateToken, requirePermission('manage-services'), async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!service) {
      return sendError(res, 404, 'Service not found');
    }
    
    sendResponse(res, service, 'Service updated successfully');
  } catch (error) {
    sendError(res, 400, 'Error updating service', error.message);
  }
});

// Delete service (admin endpoint)
router.delete('/:id', authenticateToken, requirePermission('manage-services'), async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return sendError(res, 404, 'Service not found');
    }
    sendResponse(res, null, 'Service deleted successfully');
  } catch (error) {
    sendError(res, 500, 'Error deleting service', error.message);
  }
});

module.exports = router;