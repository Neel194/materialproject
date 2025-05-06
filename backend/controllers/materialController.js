const MaterialService = require("../services/materialService");

// Helper function to build filter object
const buildFilter = (query) => {
  const filter = {};
  if (query.type) filter.type = query.type;
  if (query.branch) filter.branch = query.branch;
  if (query.subject) filter.subject = query.subject;
  if (query.year) filter.year = parseInt(query.year);
  if (query.status) filter.status = query.status;
  return filter;
};

// Upload new material
exports.uploadMaterial = async (req, res) => {
  try {
    const material = await MaterialService.createMaterial(req.body, req.file);
    res.status(201).json(material);
  } catch (error) {
    console.error("Upload material error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get approved materials
exports.getApprovedMaterials = async (req, res) => {
  try {
    const result = await MaterialService.getMaterials(req.query, false);
    res.json(result);
  } catch (error) {
    console.error("Get approved materials error:", error);
    res.status(500).json({ message: "Error fetching approved materials" });
  }
};

// Get all materials (admin)
exports.getAllMaterials = async (req, res) => {
  try {
    const result = await MaterialService.getMaterials(req.query, true);
    res.json(result);
  } catch (error) {
    console.error("Get all materials error:", error);
    res.status(500).json({ message: "Error fetching materials" });
  }
};

// Get material statistics
exports.getMaterialStats = async (req, res) => {
  try {
    const stats = await MaterialService.getMaterialStats();
    res.json(stats);
  } catch (error) {
    console.error("Get material stats error:", error);
    res.status(500).json({ message: "Error fetching material statistics" });
  }
};

// Approve material
exports.approveMaterial = async (req, res) => {
  try {
    const material = await MaterialService.updateMaterialStatus(
      req.params.id,
      "approved"
    );
    res.json(material);
  } catch (error) {
    console.error("Approve material error:", error);
    res
      .status(500)
      .json({ message: error.message || "Error approving material" });
  }
};

// Reject material
exports.rejectMaterial = async (req, res) => {
  try {
    const material = await MaterialService.updateMaterialStatus(
      req.params.id,
      "rejected"
    );
    res.json(material);
  } catch (error) {
    console.error("Reject material error:", error);
    res
      .status(500)
      .json({ message: error.message || "Error rejecting material" });
  }
};
