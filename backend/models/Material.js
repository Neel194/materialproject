const mongoose = require("mongoose");

/**
 * Material Schema
 * Represents study materials uploaded to the platform
 */
const materialSchema = new mongoose.Schema(
  {
    // Basic Information
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters long"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },

    // File Information
    fileUrl: {
      type: String,
      required: [true, "File URL is required"],
      validate: {
        validator: function (v) {
          return v.startsWith("/uploads/");
        },
        message: "File URL must start with /uploads/",
      },
    },

    // Classification
    type: {
      type: String,
      required: [true, "Material type is required"],
      enum: {
        values: ["study_material", "syllabus", "pyq"],
        message: "Type must be one of: study_material, syllabus, pyq",
      },
    },
    branch: {
      type: String,
      required: [true, "Branch is required"],
      uppercase: true,
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
      min: [1, "Year must be at least 1"],
      max: [4, "Year cannot exceed 4"],
    },

    // Metadata
    uploadedBy: {
      type: String,
      required: [true, "Uploader name is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "approved", "rejected"],
        message: "Status must be one of: pending, approved, rejected",
      },
      default: "pending",
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
materialSchema.index({ title: "text", description: "text" });
materialSchema.index({ branch: 1, subject: 1, year: 1 });
materialSchema.index({ status: 1, uploadedAt: -1 });

// Pre-save middleware to update the updatedAt timestamp
materialSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Virtual for formatted upload date
materialSchema.virtual("formattedUploadDate").get(function () {
  return this.uploadedAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

// Static method to find materials by branch and subject
materialSchema.statics.findByBranchAndSubject = function (branch, subject) {
  return this.find({ branch, subject, status: "approved" }).sort({
    uploadedAt: -1,
  });
};

// Instance method to check if material is approved
materialSchema.methods.isApproved = function () {
  return this.status === "approved";
};

// Create and export the model
const Material = mongoose.model("Material", materialSchema);

module.exports = Material;
