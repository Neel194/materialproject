class ValidationService {
  static validateMaterial(materialData) {
    const errors = [];

    // Title validation
    if (!materialData.title || materialData.title.trim().length < 3) {
      errors.push("Title must be at least 3 characters long");
    }

    // Description validation
    if (
      !materialData.description ||
      materialData.description.trim().length < 10
    ) {
      errors.push("Description must be at least 10 characters long");
    }

    // Type validation
    const validTypes = ["study_material", "syllabus", "pyq"];
    if (!materialData.type || !validTypes.includes(materialData.type)) {
      errors.push("Invalid material type");
    }

    // Branch validation
    if (!materialData.branch || materialData.branch.trim().length < 2) {
      errors.push("Branch is required");
    }

    // Subject validation
    if (!materialData.subject || materialData.subject.trim().length < 2) {
      errors.push("Subject is required");
    }

    // Year validation
    const year = parseInt(materialData.year);
    if (!year || year < 1 || year > 4) {
      errors.push("Year must be between 1 and 4");
    }

    // UploadedBy validation
    if (!materialData.uploadedBy || materialData.uploadedBy.trim().length < 2) {
      errors.push("Uploader name is required");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static validateSearchParams(query) {
    const errors = [];
    const { page, limit, year } = query;

    if (page && (isNaN(page) || page < 1)) {
      errors.push("Page must be a positive number");
    }

    if (limit && (isNaN(limit) || limit < 1 || limit > 100)) {
      errors.push("Limit must be between 1 and 100");
    }

    if (year && (isNaN(year) || year < 1 || year > 4)) {
      errors.push("Year must be between 1 and 4");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

module.exports = ValidationService;
