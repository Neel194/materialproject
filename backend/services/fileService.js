const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;

class FileService {
  static MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  static ALLOWED_TYPES = {
    ".pdf": "application/pdf",
    ".doc": "application/msword",
    ".docx":
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".ppt": "application/vnd.ms-powerpoint",
    ".pptx":
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  };

  static getStorage() {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "uploads/");
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
      },
    });
  }

  static getFileFilter() {
    return (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const mimetype = file.mimetype;

      if (this.ALLOWED_TYPES[ext] && this.ALLOWED_TYPES[ext] === mimetype) {
        cb(null, true);
      } else {
        cb(
          new Error(
            `Invalid file type. Allowed types: ${Object.keys(
              this.ALLOWED_TYPES
            ).join(", ")}`
          ),
          false
        );
      }
    };
  }

  static getUploadMiddleware() {
    return multer({
      storage: this.getStorage(),
      fileFilter: this.getFileFilter(),
      limits: {
        fileSize: this.MAX_FILE_SIZE,
      },
    });
  }

  static async deleteFile(filePath) {
    try {
      if (!filePath) return false;

      const fullPath = path.join(process.cwd(), filePath);
      await fs.access(fullPath); // Check if file exists
      await fs.unlink(fullPath);
      return true;
    } catch (error) {
      console.error("Error deleting file:", error);
      return false;
    }
  }

  static async cleanupOrphanedFiles(materialFileUrls) {
    try {
      const uploadDir = path.join(process.cwd(), "uploads");
      const files = await fs.readdir(uploadDir);

      for (const file of files) {
        const filePath = path.join(uploadDir, file);
        const relativePath = path.join("uploads", file);

        if (!materialFileUrls.includes(relativePath)) {
          await this.deleteFile(relativePath);
        }
      }
    } catch (error) {
      console.error("Error cleaning up orphaned files:", error);
    }
  }

  static async ensureUploadDirectory() {
    const uploadDir = path.join(process.cwd(), "uploads");
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }
  }
}

module.exports = FileService;
