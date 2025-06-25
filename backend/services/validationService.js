class ValidationService {
  static VALID_BRANCHES = [
    "CSE",
    "ECE",
    "EE",
    "ME",
    "CE",
    "IT",
    "AI",
    "ML",
    "DS",
  ];

  static VALID_SUBJECTS = {
    CSE: [
      // Core CS subjects
      "DSA",
      "OS",
      "DBMS",
      "CN",
      "SE",
      "AI",
      "ML",
      "Web Dev",
      // Mathematics and Sciences
      "Mathematics – I (Calculus)",
      "Mathematics – II (Linear Algebra & Vector Calculus)",
      "Physics – I & II",
      "Chemistry",
      // Engineering subjects
      "Basic Electrical Engineering",
      "Basic Electronics",
      "Computer Programming",
      "Elements of Mechanical Engineering",
      "Engineering Mechanics",
      "Engineering Graphics",
      // Additional subjects
      "Data Structures",
      "Algorithms",
      "Computer Networks",
      "Software Engineering",
      "Machine Learning",
      "Artificial Intelligence",
      "Database Management",
      "Operating Systems",
      "Computer Architecture",
      "Digital Logic Design",
      "Computer Organization",
      "Theory of Computation",
      "Compiler Design",
      "Computer Graphics",
      "Information Security",
      "Cloud Computing",
      "Mobile Computing",
      "Internet of Things",
      "Blockchain Technology",
    ],
    ECE: [
      // Core ECE subjects
      "Digital Electronics",
      "Analog Electronics",
      "Signals",
      "Communication",
      // Mathematics and Sciences
      "Mathematics – I (Calculus)",
      "Mathematics – II (Linear Algebra & Vector Calculus)",
      "Physics – I & II",
      "Chemistry",
      // Engineering subjects
      "Basic Electrical Engineering",
      "Basic Electronics",
      "Computer Programming",
      "Elements of Mechanical Engineering",
      "Engineering Mechanics",
      "Engineering Graphics",
      // Additional ECE subjects
      "Electromagnetic Theory",
      "Digital Signal Processing",
      "Microprocessors",
      "VLSI Design",
      "Wireless Communication",
      "Optical Communication",
      "Satellite Communication",
      "Antenna Theory",
      "Microwave Engineering",
      "Control Systems",
      "Power Electronics",
      "Embedded Systems",
    ],
    EE: [
      // Core EE subjects
      "Power Systems",
      "Electrical Machines",
      "Control Systems",
      // Mathematics and Sciences
      "Mathematics – I (Calculus)",
      "Mathematics – II (Linear Algebra & Vector Calculus)",
      "Physics – I & II",
      "Chemistry",
      // Engineering subjects
      "Basic Electrical Engineering",
      "Basic Electronics",
      "Computer Programming",
      "Elements of Mechanical Engineering",
      "Engineering Mechanics",
      "Engineering Graphics",
      // Additional EE subjects
      "Power Electronics",
      "Electrical Drives",
      "High Voltage Engineering",
      "Power System Protection",
      "Renewable Energy",
      "Smart Grid",
      "Electric Vehicle Technology",
      "Power Quality",
      "Electrical Measurements",
    ],
    ME: [
      // Core ME subjects
      "Thermodynamics",
      "Fluid Mechanics",
      "Machine Design",
      // Mathematics and Sciences
      "Mathematics – I (Calculus)",
      "Mathematics – II (Linear Algebra & Vector Calculus)",
      "Physics – I & II",
      "Chemistry",
      // Engineering subjects
      "Basic Electrical Engineering",
      "Basic Electronics",
      "Computer Programming",
      "Elements of Mechanical Engineering",
      "Engineering Mechanics",
      "Engineering Graphics",
      // Additional ME subjects
      "Heat Transfer",
      "Manufacturing Processes",
      "CAD/CAM",
      "Robotics",
      "Automobile Engineering",
      "Aerodynamics",
      "Vibration Analysis",
      "Material Science",
      "Industrial Engineering",
    ],
    CE: [
      // Core CE subjects
      "Structural Analysis",
      "Geotechnical",
      "Transportation",
      // Mathematics and Sciences
      "Mathematics – I (Calculus)",
      "Mathematics – II (Linear Algebra & Vector Calculus)",
      "Physics – I & II",
      "Chemistry",
      // Engineering subjects
      "Basic Electrical Engineering",
      "Basic Electronics",
      "Computer Programming",
      "Elements of Mechanical Engineering",
      "Engineering Mechanics",
      "Engineering Graphics",
      // Additional CE subjects
      "Concrete Technology",
      "Steel Structures",
      "Highway Engineering",
      "Water Resources",
      "Environmental Engineering",
      "Surveying",
      "Construction Management",
      "Bridge Engineering",
      "Foundation Engineering",
    ],
    IT: [
      // Core IT subjects
      "DSA",
      "OS",
      "DBMS",
      "CN",
      "SE",
      "Web Dev",
      // Mathematics and Sciences
      "Mathematics – I (Calculus)",
      "Mathematics – II (Linear Algebra & Vector Calculus)",
      "Physics – I & II",
      "Chemistry",
      // Engineering subjects
      "Basic Electrical Engineering",
      "Basic Electronics",
      "Computer Programming",
      "Elements of Mechanical Engineering",
      "Engineering Mechanics",
      "Engineering Graphics",
      // Additional IT subjects
      "Information Systems",
      "Network Security",
      "Web Technologies",
      "Mobile App Development",
      "Cloud Computing",
      "Big Data Analytics",
      "IT Project Management",
      "E-Commerce",
      "Digital Marketing",
    ],
    AI: [
      // Core AI subjects
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "Computer Vision",
      // Mathematics and Sciences
      "Mathematics – I (Calculus)",
      "Mathematics – II (Linear Algebra & Vector Calculus)",
      "Physics – I & II",
      "Chemistry",
      // Engineering subjects
      "Basic Electrical Engineering",
      "Basic Electronics",
      "Computer Programming",
      "Elements of Mechanical Engineering",
      "Engineering Mechanics",
      "Engineering Graphics",
      // Additional AI subjects
      "Neural Networks",
      "Reinforcement Learning",
      "Computer Vision",
      "Natural Language Processing",
      "Robotics",
      "Expert Systems",
      "Pattern Recognition",
      "Data Mining",
      "AI Ethics",
    ],
    ML: [
      // Core ML subjects
      "Machine Learning",
      "Deep Learning",
      "Statistics",
      "Python",
      // Mathematics and Sciences
      "Mathematics – I (Calculus)",
      "Mathematics – II (Linear Algebra & Vector Calculus)",
      "Physics – I & II",
      "Chemistry",
      // Engineering subjects
      "Basic Electrical Engineering",
      "Basic Electronics",
      "Computer Programming",
      "Elements of Mechanical Engineering",
      "Engineering Mechanics",
      "Engineering Graphics",
      // Additional ML subjects
      "Statistical Learning",
      "Neural Networks",
      "Data Science",
      "Predictive Analytics",
      "Feature Engineering",
      "Model Deployment",
      "ML Operations",
      "Big Data Processing",
      "Data Visualization",
    ],
    DS: [
      // Core DS subjects
      "Data Analysis",
      "Statistics",
      "Python",
      "SQL",
      // Mathematics and Sciences
      "Mathematics – I (Calculus)",
      "Mathematics – II (Linear Algebra & Vector Calculus)",
      "Physics – I & II",
      "Chemistry",
      // Engineering subjects
      "Basic Electrical Engineering",
      "Basic Electronics",
      "Computer Programming",
      "Elements of Mechanical Engineering",
      "Engineering Mechanics",
      "Engineering Graphics",
      // Additional DS subjects
      "Data Mining",
      "Data Visualization",
      "Big Data Analytics",
      "Business Intelligence",
      "Predictive Modeling",
      "Data Warehousing",
      "ETL Processes",
      "Data Governance",
      "Data Ethics",
    ],
  };

  static sanitizeInput(input) {
    if (typeof input !== "string") return "";
    return input.trim().replace(/[<>]/g, ""); // Basic XSS prevention
  }

  static validateMaterial(materialData) {
    const errors = [];

    // Title validation
    const title = this.sanitizeInput(materialData.title);
    if (!title || title.length < 3) {
      errors.push("Title must be at least 3 characters long");
    }

    // Description validation
    const description = this.sanitizeInput(materialData.description);
    if (!description || description.length < 10) {
      errors.push("Description must be at least 10 characters long");
    }

    // Type validation
    const validTypes = ["study_material", "syllabus", "pyq"];
    if (!materialData.type || !validTypes.includes(materialData.type)) {
      errors.push("Invalid material type");
    }

    // Branch validation
    const branch = this.sanitizeInput(materialData.branch).toUpperCase();
    if (!branch || !this.VALID_BRANCHES.includes(branch)) {
      errors.push(
        `Invalid branch. Must be one of: ${this.VALID_BRANCHES.join(", ")}`
      );
    }

    // Subject validation - More flexible since frontend already validates
    const subject = this.sanitizeInput(materialData.subject);
    if (!subject || subject.length < 2) {
      errors.push("Subject is required and must be at least 2 characters long");
    }

    // Year validation
    const year = parseInt(materialData.year);
    if (!year || year < 1 || year > 4) {
      errors.push("Year must be between 1 and 4");
    }

    // UploadedBy validation
    const uploadedBy = this.sanitizeInput(materialData.uploadedBy);
    if (!uploadedBy || uploadedBy.length < 2) {
      errors.push("Uploader name is required");
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedData: {
        title,
        description,
        type: materialData.type,
        branch,
        subject,
        year,
        uploadedBy,
      },
    };
  }

  static validateSearchParams(query) {
    const errors = [];
    const sanitizedQuery = {};

    // Page validation
    const page = parseInt(query.page);
    if (page && (isNaN(page) || page < 1)) {
      errors.push("Page must be a positive number");
    } else {
      sanitizedQuery.page = page || 1;
    }

    // Limit validation
    const limit = parseInt(query.limit);
    if (limit && (isNaN(limit) || limit < 1 || limit > 100)) {
      errors.push("Limit must be between 1 and 100");
    } else {
      sanitizedQuery.limit = limit || 10;
    }

    // Year validation
    const year = parseInt(query.year);
    if (year && (isNaN(year) || year < 1 || year > 4)) {
      errors.push("Year must be between 1 and 4");
    } else if (year) {
      sanitizedQuery.year = year;
    }

    // Branch validation
    if (query.branch) {
      const branch = this.sanitizeInput(query.branch).toUpperCase();
      if (!this.VALID_BRANCHES.includes(branch)) {
        errors.push(
          `Invalid branch. Must be one of: ${this.VALID_BRANCHES.join(", ")}`
        );
      } else {
        sanitizedQuery.branch = branch;
      }
    }

    // Search term sanitization
    if (query.search) {
      sanitizedQuery.search = this.sanitizeInput(query.search);
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedQuery,
    };
  }
}

module.exports = ValidationService;
