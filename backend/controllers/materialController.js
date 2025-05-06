const Material = require("../models/Material");

// Upload new material
exports.uploadMaterial = async (req, res) => {
  try {
    const material = new Material({
      ...req.body,
      fileUrl: `/uploads/${req.file.filename}`,
    });
    await material.save();
    res.status(201).json(material);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get approved materials
exports.getApprovedMaterials = async (req, res) => {
  try {
    const materials = await Material.find({ status: "approved" });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all materials (admin)
exports.getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.find();
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve material
exports.approveMaterial = async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    res.json(material);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reject material
exports.rejectMaterial = async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    res.json(material);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
