// Frontend Configuration
const config = {
  // API Configuration
  api: {
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  },

  // App Configuration
  app: {
    name: "Material Mining Platform",
    version: "1.0.0",
    description: "Educational content management system",
  },

  // File Upload Configuration
  upload: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: [".pdf", ".doc", ".docx", ".ppt", ".pptx"],
    maxFiles: 1,
  },

  // Pagination
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 100,
  },

  // UI Configuration
  ui: {
    theme: "dark",
    animations: true,
    loadingDelay: 300,
  },
};

// Environment-specific overrides
if (import.meta.env.DEV) {
  // In development, use the proxy if available, otherwise direct URL
  config.api.baseURL = "/api";
} else if (import.meta.env.PROD) {
  config.api.baseURL =
    import.meta.env.VITE_API_URL || "https://your-production-api.com";
}

export default config;
