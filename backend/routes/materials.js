const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middleware/auth");
const FileService = require("../services/fileService");
const CacheService = require("../services/cacheService");
const MaterialService = require("../services/materialService");
const {
  uploadMaterial,
  getApprovedMaterials,
  getAllMaterials,
  approveMaterial,
  rejectMaterial,
  getMaterialStats,
} = require("../controllers/materialController");

// Constants
const CACHE_TTL = {
  MATERIALS: 5 * 60 * 1000, // 5 minutes
  STATS: 15 * 60 * 1000,    // 15 minutes
  SINGLE: 60 * 60 * 1000    // 1 hour
};

// Ensure upload directory exists
FileService.ensureUploadDirectory();

/**
 * Admin Routes (must be defined BEFORE /:id route)
 */
router.get("/admin", verifyAdmin, CacheService.cacheMiddleware(CACHE_TTL.MATERIALS), getAllMaterials);
router.get("/admin/stats", verifyAdmin, CacheService.cacheMiddleware(CACHE_TTL.STATS), getMaterialStats);
router.post("/admin/:id/approve", verifyAdmin, approveMaterial);
router.post("/admin/:id/reject", verifyAdmin, rejectMaterial);
router.delete("/admin/:id", verifyAdmin, async (req, res, next) => {
  try {
    const result = await MaterialService.deleteMaterial(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Material not found" });
    }
    res.json({ message: "Material deleted successfully" });
  } catch (error) {
    next(error);
  }
});

/**
 * Public Routes
 */
router.get("/", CacheService.cacheMiddleware(CACHE_TTL.MATERIALS), getApprovedMaterials);
router.post("/", FileService.getUploadMiddleware().single("file"), uploadMaterial);
router.get("/:id", CacheService.cacheMiddleware(CACHE_TTL.SINGLE), async (req, res, next) => {
  try {
    const material = await MaterialService.getMaterialById(req.params.id);
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }
    res.json(material);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
