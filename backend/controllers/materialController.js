const MaterialService = require("../services/materialService");
const FileService = require("../services/fileService");
const { validateMaterial } = require("../services/validationService");

// Helper function to build filter object
const buildFilter = (query) => {
  const filter = {};
  if (query.type) filter.type = query.type;
  if (query.branch) filter.branch = query.branch;
  if (query.subject) filter.subject = query.subject;
  if (query.year) filter.year = parseInt(query.year);
  if (query.status) filter.status = query.status;
  return filter;
};

/**
 * Upload a new material
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const uploadMaterial = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const material = await MaterialService.createMaterial(req.body, req.file);
    res.status(201).json(material);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all approved materials with pagination and search
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getApprovedMaterials = async (req, res, next) => {
  try {
    const materials = await MaterialService.getMaterials(req.query, false);
    res.json(materials);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all materials (including pending and rejected) - Admin only
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getAllMaterials = async (req, res, next) => {
  try {
    const materials = await MaterialService.getMaterials(req.query, true);
    res.json(materials);
  } catch (error) {
    next(error);
  }
};

/**
 * Get material statistics - Admin only
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getMaterialStats = async (req, res, next) => {
  try {
    const stats = await MaterialService.getMaterialStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
};

/**
 * Approve a material - Admin only
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const approveMaterial = async (req, res, next) => {
  try {
    const material = await MaterialService.updateMaterialStatus(
      req.params.id,
      "approved"
    );
    res.json(material);
  } catch (error) {
    next(error);
  }
};

/**
 * Reject a material - Admin only
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const rejectMaterial = async (req, res, next) => {
  try {
    const material = await MaterialService.updateMaterialStatus(
      req.params.id,
      "rejected"
    );
    res.json(material);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadMaterial,
  getApprovedMaterials,
  getAllMaterials,
  getMaterialStats,
  approveMaterial,
  rejectMaterial,
};
