const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { verifyAdmin } = require("../middleware/auth");
const {
  uploadMaterial,
  getApprovedMaterials,
  getAllMaterials,
  approveMaterial,
  rejectMaterial,
} = require("../controllers/materialController");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.post("/", upload.single("file"), uploadMaterial);
router.get("/", getApprovedMaterials);
router.get("/admin", verifyAdmin, getAllMaterials);
router.post("/admin/:id/approve", verifyAdmin, approveMaterial);
router.post("/admin/:id/reject", verifyAdmin, rejectMaterial);

module.exports = router;
