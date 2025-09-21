const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const { authenticateToken, requirePermission } = require('../middlewares/auth');
const { sendResponse, sendError } = require('../utils/response');
const { upload } = require('../middlewares/fileUpload');


// Get all projects
router.get('/', async (req, res) => {
  try {
    const { category, featured, status, public: isPublic } = req.query;
    const filter = {};
    
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;
    if (status) filter.status = status;
    if (isPublic !== 'false') filter.isPublic = true;
    
    const projects = await Project.find(filter)
        .populate({ path: 'team.memberId', select: 'name position avatar', strictPopulate: false })
      .sort({ featured: -1, createdAt: -1 });
      
    sendResponse(res, projects, 'Projects retrieved successfully');
  } catch (error) {
    sendError(res, 500, 'Error fetching projects', error.message);
  }
});


// Get featured projects
router.get('/featured/list', async (req, res) => {
  try {
    const projects = await Project.find({ featured: true, isPublic: true })
      .select('title shortDescription images category client status')
      .limit(6)
      .sort({ createdAt: -1 });
      
    sendResponse(res, projects, 'Featured projects retrieved successfully');
  } catch (error) {
    sendError(res, 500, 'Error fetching featured projects', error.message);
  }
});

// Get project by ID
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return sendError(res, 404, "Project not found");
    sendResponse(res, project, "Project retrieved successfully");
  } catch (err) {
    sendError(res, 500, "Error fetching project", err.message);
  }
});

// Create new project with image upload
router.post(
  "/",
  authenticateToken,
  requirePermission("manage-projects"),
  upload.fields([{ name: "images", maxCount: 5 }]),  // ✅ handles text + files
  async (req, res) => {
    try {
      console.log("req.body:", req.body);  // debug
      console.log("req.files:", req.files);

      let { technologies, startDate, endDate, ...rest } = req.body;

      // normalize technologies
      if (technologies) {
        if (Array.isArray(technologies)) {
          technologies = technologies.map(t => t.trim());
        } else if (typeof technologies === "string") {
          technologies = technologies.split(",").map(t => t.trim());
        }
      }

      // normalize dates
      const duration = {
        start: startDate ? new Date(startDate) : null,
        end: endDate ? new Date(endDate) : null,
      };

      // handle images
      const images = (req.files?.images || []).map(file => ({
        url: `/uploads/${file.filename}`,
        caption: file.originalname,
      }));

      const project = new Project({
        ...rest,
        technologies,
        duration,
        images,
      });

      await project.save();
      sendResponse(res, project, "Project created successfully", 201);
    } catch (error) {
      sendError(res, 400, "Error creating project", error.message);
    }
  }
);



// Update project (admin endpoint)
router.put(
  "/:id",
  authenticateToken,
  requirePermission("manage-projects"),
  upload.array("images", 5),
  async (req, res) => {
    try {
      let { technologies, startDate, endDate, ...rest } = req.body;

      if (technologies) {
        if (Array.isArray(technologies)) {
          technologies = technologies.map(t => t.trim());
        } else if (typeof technologies === "string") {
          technologies = technologies.split(",").map(t => t.trim());
        }
      }

      const duration = {
        start: startDate ? new Date(startDate) : null,
        end: endDate ? new Date(endDate) : null,
      };

      const images = (req.files || []).map(file => ({
        url: `/uploads/${file.filename}`,
        caption: file.originalname,
      }));

      const project = await Project.findByIdAndUpdate(
        req.params.id,
        { ...rest, technologies, duration, ...(images.length && { images }) },
        { new: true, runValidators: true }
      );

      if (!project) {
        return sendError(res, 404, "Project not found");
      }

      sendResponse(res, project, "Project updated successfully");
    } catch (error) {
      sendError(res, 400, "Error updating project", error.message);
    }
  }
);


// Delete project (admin endpoint)
router.delete('/:id', authenticateToken, requirePermission('manage-projects'), async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return sendError(res, 404, 'Project not found');
    }
    sendResponse(res, null, 'Project deleted successfully');
  } catch (error) {
    sendError(res, 500, 'Error deleting project', error.message);
  }
});

module.exports = router;