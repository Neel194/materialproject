const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middleware/auth");
const FileService = require("../services/fileService");
const CacheService = require("../services/cacheService");
const {
  uploadMaterial,
  getApprovedMaterials,
  getAllMaterials,
  approveMaterial,
  rejectMaterial,
  getMaterialStats,
} = require("../controllers/materialController");

// Ensure upload directory exists
FileService.ensureUploadDirectory();

// Public routes
router.get("/", CacheService.cacheMiddleware(), getApprovedMaterials);
router.get("/:id", CacheService.cacheMiddleware(60 * 60 * 1000), async (req, res) => {
  try {
    const material = await MaterialService.getMaterialById(req.params.id);
    res.json(material);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.post("/", FileService.getUploadMiddleware().single("file"), uploadMaterial);

// Admin routes
router.get("/admin", verifyAdmin, CacheService.cacheMiddleware(), getAllMaterials);
router.get("/admin/stats", verifyAdmin, CacheService.cacheMiddleware(15 * 60 * 1000), getMaterialStats);
router.post("/admin/:id/approve", verifyAdmin, approveMaterial);
router.post("/admin/:id/reject", verifyAdmin, rejectMaterial);
router.delete("/admin/:id", verifyAdmin, async (req, res) => {
  try {
    await MaterialService.deleteMaterial(req.params.id);
    res.json({ message: "Material deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
