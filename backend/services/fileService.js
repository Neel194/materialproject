const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;

class FileService {
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
      const allowedTypes = [".pdf", ".doc", ".docx", ".ppt", ".pptx"];
      const ext = path.extname(file.originalname).toLowerCase();
      if (allowedTypes.includes(ext)) {
        cb(null, true);
      } else {
        cb(
          new Error(
            "Invalid file type. Only PDF, DOC, DOCX, PPT, and PPTX files are allowed."
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
        fileSize: 10 * 1024 * 1024, // 10MB limit
      },
    });
  }

  static async deleteFile(filePath) {
    try {
      const fullPath = path.join(process.cwd(), filePath);
      await fs.unlink(fullPath);
      return true;
    } catch (error) {
      console.error("Error deleting file:", error);
      return false;
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
