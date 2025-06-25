const jwt = require("jsonwebtoken");
const config = require("../config/config");

/**
 * Admin login
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const login = (req, res) => {
  try {
    const { password } = req.body;

    // Validate input
    if (!password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    // Check if admin password is configured
    if (!config.admin.password) {
      console.error("ADMIN_PASSWORD is not configured");
      return res.status(500).json({
        message: "Server configuration error",
      });
    }

    // Verify password
    if (password === config.admin.password) {
      const token = jwt.sign({ role: "admin" }, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
      });

      res.json({
        token,
        message: "Login successful",
      });
    } else {
      res.status(401).json({
        message: "Invalid password",
      });
    }
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * Verify admin token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const verifyAdmin = (req, res) => {
  try {
    res.json({
      message: "Admin verified",
      user: req.user,
    });
  } catch (error) {
    console.error("Admin verification error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  login,
  verifyAdmin,
};
