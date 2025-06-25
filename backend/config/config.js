require("dotenv").config();

const config = {
  // Database
  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/material-mining",
  },

  // Server
  server: {
    port: parseInt(process.env.PORT) || 5000,
    env: process.env.NODE_ENV || "development",
  },

  // Security
  jwt: {
    secret: process.env.JWT_SECRET || "fallback_secret_change_in_production",
    expiresIn: "24h",
  },

  // Admin
  admin: {
    password: process.env.ADMIN_PASSWORD || "admin123",
  },

  // CORS
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  },

  // File Upload
  upload: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: [".pdf", ".doc", ".docx", ".ppt", ".pptx"],
  },
};

// Validate required environment variables
const requiredVars = ["JWT_SECRET", "ADMIN_PASSWORD"];
const missingVars = requiredVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  console.warn("Warning: Missing environment variables:", missingVars);
  console.warn("Using default values. Please set these in production.");
}

module.exports = config;
