const config = require("./config/config");
const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");

// Constants
const PORT = config.server.port;
const FRONTEND_URL = config.cors.origin;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 100; // requests per window
const UPLOAD_SIZE_LIMIT = "10mb";

// Initialize Express app
const app = express();

// Environment Variables Check
const checkEnvironmentVariables = () => {
  const requiredVars = {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  };

  const missingVars = Object.entries(requiredVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    console.warn("Warning: Missing environment variables:", missingVars);
  }
};

// Request logging middleware
const requestLogger = (req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`
    );
  });
  next();
};

// Security Configuration
const configureSecurity = () => {
  // Helmet security headers
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:", "blob:"],
          connectSrc: ["'self'"],
        },
      },
    })
  );

  // Rate limiting
  const limiter = rateLimit({
    windowMs: RATE_LIMIT_WINDOW,
    max: RATE_LIMIT_MAX,
    message: "Too many requests from this IP, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(limiter);

  // CORS configuration
  app.use(
    cors({
      origin: FRONTEND_URL,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
};

// Middleware Configuration
const configureMiddleware = () => {
  // Request logging (only in development)
  if (config.server.env === "development") {
    app.use(requestLogger);
  }

  // Compression with better configuration
  app.use(compression({
    level: 6, // Compression level (0-9, higher = better compression but slower)
    threshold: 1024, // Only compress responses larger than 1KB
    filter: (req, res) => {
      // Don't compress if client doesn't support it
      if (req.headers['x-no-compression']) {
        return false;
      }
      // Use compression for all other requests
      return compression.filter(req, res);
    }
  }));

  // Body parsing
  app.use(express.json({ limit: UPLOAD_SIZE_LIMIT }));
  app.use(express.urlencoded({ extended: true, limit: UPLOAD_SIZE_LIMIT }));

  // Static files with better caching
  app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"), {
      maxAge: "1d",
      etag: true,
      lastModified: true,
      immutable: false,
    })
  );
};

// Route Configuration
const configureRoutes = () => {
  // Health check
  app.get("/health", (req, res) => {
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: config.server.env,
    });
  });

  // API routes
  app.use("/api/materials", require("./routes/materials"));
  app.use("/api/admin", require("./routes/admin"));
};

// Error Handlers
const configureErrorHandlers = () => {
  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      message: "Route not found",
      path: req.originalUrl,
    });
  });

  // Global error handler
  app.use((err, req, res, next) => {
    console.error("Error:", {
      message: err.message,
      stack: err.stack,
      path: req.originalUrl,
      method: req.method,
    });

    // Handle specific error types
    const errorHandlers = {
      MulterError: () => ({
        status: 400,
        message:
          err.message === "File too large"
            ? "File size exceeds 10MB limit"
            : "Error uploading file",
      }),
      ValidationError: () => ({
        status: 400,
        message: Object.values(err.errors)
          .map((val) => val.message)
          .join(", "),
      }),
      CastError: () => ({
        status: 400,
        message: "Invalid ID format",
      }),
      JsonWebTokenError: () => ({
        status: 401,
        message: "Invalid token",
      }),
      TokenExpiredError: () => ({
        status: 401,
        message: "Token expired",
      }),
    };

    const errorHandler =
      errorHandlers[err.name] ||
      (() => ({
        status: err.status || 500,
        message: err.message || "Something went wrong!",
      }));

    const { status, message } = errorHandler();

    res.status(status).json({
      message,
      ...(config.server.env === "development" && { stack: err.stack }),
    });
  });
};

// Process Error Handlers
const configureProcessHandlers = (server) => {
  process.on("unhandledRejection", (err) => {
    console.error("Unhandled Promise Rejection:", err);
    server.close(() => process.exit(1));
  });

  process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    server.close(() => process.exit(1));
  });
};

// Initialize Application
const initializeApp = async () => {
  try {
    // Check environment variables
    checkEnvironmentVariables();

    // Connect to database
    await connectDB();

    // Configure application
    configureSecurity();
    configureMiddleware();
    configureRoutes();
    configureErrorHandlers();

    // Start server
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${config.server.env}`);
      console.log(`Frontend URL: ${FRONTEND_URL}`);
    });

    // Configure process handlers
    configureProcessHandlers(server);
  } catch (error) {
    console.error("Failed to initialize application:", error);
    process.exit(1);
  }
};

// Start the application
initializeApp();
