const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middleware/auth");
const {
  login,
  verifyAdmin: verifyAdminController,
} = require("../controllers/adminController");

// Routes
router.post("/login", login);
router.get("/verify", verifyAdmin, verifyAdminController);

module.exports = router;
