const Material = require("../models/Material");
const ValidationService = require("./validationService");
const CacheService = require("./cacheService");
const Notification = require("../models/Notification");

class MaterialService {
  // Helper function to build filter object
  static buildFilter(query) {
    const filter = {};
    if (query.type) filter.type = query.type;
    if (query.branch) filter.branch = query.branch;
    if (query.subject) filter.subject = query.subject;
    if (query.year) filter.year = parseInt(query.year);
    if (query.status) filter.status = query.status;
    return filter;
  }

  // Create new material
  static async createMaterial(materialData, file) {
    if (!file) {
      throw new Error("No file uploaded");
    }

    // Validate material data
    const validation = ValidationService.validateMaterial(materialData);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(", "));
    }

    const material = new Material({
      ...materialData,
      fileUrl: `/uploads/${file.filename}`,
    });
    const savedMaterial = await material.save();

    // Clear relevant caches
    CacheService.delete(CacheService.generateKey("materials", {}));
    CacheService.delete(CacheService.generateKey("stats", {}));

    return savedMaterial;
  }

  // Get materials with pagination and search
  static async getMaterials(query, isAdmin = false) {
    // Validate search parameters
    const validation = ValidationService.validateSearchParams(query);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(", "));
    }

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const search = query.search || "";
    const filter = this.buildFilter(query);

    if (!isAdmin) {
      filter.status = "approved";
    }

    // Build search query more efficiently
    const searchQuery = { ...filter };

    if (search.trim()) {
      searchQuery.$or = [
        { title: { $regex: search.trim(), $options: "i" } },
        { description: { $regex: search.trim(), $options: "i" } },
      ];
    }

    // Use Promise.all for concurrent queries
    const [total, materials] = await Promise.all([
      Material.countDocuments(searchQuery),
      Material.find(searchQuery)
        .sort({ uploadedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select("-__v")
        .lean(), // Use lean() for better performance when not modifying documents
    ]);

    return {
      materials,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    };
  }

  // Get material statistics
  static async getMaterialStats() {
    const cacheKey = CacheService.generateKey("stats", {});
    const cachedStats = CacheService.get(cacheKey);
    if (cachedStats) {
      return cachedStats;
    }

    const [statusStats, typeStats, branchStats] = await Promise.all([
      Material.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]),
      Material.aggregate([
        {
          $group: {
            _id: "$type",
            count: { $sum: 1 },
          },
        },
      ]),
      Material.aggregate([
        {
          $group: {
            _id: "$branch",
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    const stats = {
      statusStats,
      typeStats,
      branchStats,
    };

    // Cache the stats
    CacheService.set(cacheKey, stats, 15 * 60 * 1000); // Cache for 15 minutes

    return stats;
  }

  // Update material status
  static async updateMaterialStatus(materialId, status) {
    const material = await Material.findById(materialId);
    if (!material) {
      throw new Error("Material not found");
    }

    material.status = status;

    try {
      const updatedMaterial = await material.save();

      // Create notification if approved
      if (status === "approved") {
        await Notification.create({
          user: material.uploadedBy || "Anonymous",
          message: `Your material '${material.title}' has been approved!`,
          materialId: material._id,
        });
      }

      // Clear relevant caches
      CacheService.delete(CacheService.generateKey("materials", {}));
      CacheService.delete(CacheService.generateKey("stats", {}));

      return updatedMaterial;
    } catch (saveError) {
      console.error("Error saving material:", saveError);
      throw saveError;
    }
  }

  // Get material by ID
  static async getMaterialById(id) {
    const material = await Material.findById(id).select("-__v");
    if (!material) {
      throw new Error("Material not found");
    }
    return material;
  }

  // Delete material
  static async deleteMaterial(id) {
    const material = await Material.findById(id);
    if (!material) {
      throw new Error("Material not found");
    }

    await material.deleteOne();

    // Clear relevant caches
    CacheService.delete(CacheService.generateKey("materials", {}));
    CacheService.delete(CacheService.generateKey("stats", {}));

    return true;
  }
}

module.exports = MaterialService;
