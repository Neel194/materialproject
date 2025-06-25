import { useState, useMemo, useCallback } from "react";
import Header from "../components/Header";
import {
  Upload,
  Trash2,
  CheckCircle,
  XCircle,
  FileText,
  BookOpen,
  ClipboardList,
} from "lucide-react";
import { motion } from "framer-motion";
import { materialData } from "../data/materialData";
import config from "../config/config";

const yearOptions = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
const branchOptions = ["CSE", "ECE", "ME", "CE", "EE", "Other"];
const materialTypeOptions = ["Notes", "Book"];
const pyqSessionOptions = ["Winter", "Summer"];

const ContentUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [contentType, setContentType] = useState("material");
  const [isDragging, setIsDragging] = useState(false);
  const [year, setYear] = useState(yearOptions[0]);
  const [branch, setBranch] = useState(branchOptions[0]);
  const [materialType, setMaterialType] = useState(materialTypeOptions[0]);
  const [subject, setSubject] = useState("");
  const [pyqSession, setPyqSession] = useState(pyqSessionOptions[0]);
  const [pyqYear, setPyqYear] = useState("");
  const [otherSubject, setOtherSubject] = useState("");
  const [uploadedBy, setUploadedBy] = useState("Anonymous");

  // Memoize subject options to prevent recalculation on every render
  const subjectOptions = useMemo(() => {
    const key = `${year.split(" ")[0]}_${branch}`;
    const subjects = materialData[key] || [];
    return [...subjects.map((s) => s.name), "Other"];
  }, [year, branch]);

  // Memoize handlers to prevent unnecessary re-renders
  const handleYearChange = useCallback(
    (val) => {
      setYear(val);
      const newSubjects = materialData[`${val.split(" ")[0]}_${branch}`] || [];
      setSubject(newSubjects[0]?.name || "");
    },
    [branch]
  );

  const handleBranchChange = useCallback(
    (val) => {
      setBranch(val);
      const newSubjects = materialData[`${year.split(" ")[0]}_${val}`] || [];
      setSubject(newSubjects[0]?.name || "");
    },
    [year]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  }, []);

  const validateAndSetFile = useCallback((file) => {
    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setStatus("File size must be less than 10MB");
      return;
    }

    // Check file type
    const allowedTypes = [".pdf", ".doc", ".docx", ".ppt", ".pptx"];
    const fileExtension = "." + file.name.split(".").pop().toLowerCase();

    if (!allowedTypes.includes(fileExtension)) {
      setStatus(
        `File type not supported. Allowed types: ${allowedTypes.join(", ")}`
      );
      return;
    }

    setFile(file);
    setStatus(""); // Clear any previous error messages
  }, []);

  const handleFileChange = useCallback(
    (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        validateAndSetFile(selectedFile);
      }
    },
    [validateAndSetFile]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Uploading...");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    // Map contentType to backend 'type'
    let backendType = "study_material";
    if (contentType === "syllabus") backendType = "syllabus";
    if (contentType === "pyq") backendType = "pyq";
    formData.append("type", backendType);
    // Convert year to number (1, 2, 3, 4)
    const yearNumber = parseInt(year);
    formData.append("year", yearNumber);
    // Ensure branch is uppercase
    formData.append("branch", branch.toUpperCase());
    // Subject
    formData.append("subject", subject === "Other" ? otherSubject : subject);
    // UploadedBy
    formData.append("uploadedBy", uploadedBy);
    // Material type (optional, only for study_material)
    if (contentType === "material")
      formData.append("materialType", materialType);
    // PYQ fields
    if (contentType === "pyq") {
      formData.append("session", pyqSession);
      formData.append("pyqYear", pyqYear);
    }
    if (file) formData.append("file", file);
    try {
      const res = await fetch(`${config.api.baseURL}/materials`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setStatus("Upload successful! Pending admin approval.");
        setTitle("");
        setDescription("");
        setSubject(subjectOptions[0] || "");
        setFile(null);
        setContentType("material");
      } else {
        const errorData = await res.json();
        setStatus(errorData.message || "Upload failed.");
      }
    } catch (err) {
      setStatus("Upload failed. Network or server error.");
    }
  };

  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 px-2 sm:px-4 py-4"
      >
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-2xl p-3 sm:p-6 w-full max-w-2xl border border-gray-700/50"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white text-center">
            Upload Study Material
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-3">
              {/* Content Type Selection */}
              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">
                  Content Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <motion.label
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex flex-col items-center p-2 rounded-lg cursor-pointer transition-all ${
                      contentType === "material"
                        ? "bg-purple-500/20 border-purple-500"
                        : "bg-gray-800/50 border-gray-700/50"
                    } border`}
                  >
                    <input
                      type="radio"
                      name="contentType"
                      value="material"
                      checked={contentType === "material"}
                      onChange={(e) => setContentType(e.target.value)}
                      className="hidden"
                    />
                    <BookOpen className="w-5 h-5 text-white mb-1" />
                    <span className="text-white text-xs">Study Material</span>
                  </motion.label>

                  <motion.label
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex flex-col items-center p-2 rounded-lg cursor-pointer transition-all ${
                      contentType === "syllabus"
                        ? "bg-purple-500/20 border-purple-500"
                        : "bg-gray-800/50 border-gray-700/50"
                    } border`}
                  >
                    <input
                      type="radio"
                      name="contentType"
                      value="syllabus"
                      checked={contentType === "syllabus"}
                      onChange={(e) => setContentType(e.target.value)}
                      className="hidden"
                    />
                    <FileText className="w-5 h-5 text-white mb-1" />
                    <span className="text-white text-xs">Syllabus</span>
                  </motion.label>

                  <motion.label
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex flex-col items-center p-2 rounded-lg cursor-pointer transition-all ${
                      contentType === "pyq"
                        ? "bg-purple-500/20 border-purple-500"
                        : "bg-gray-800/50 border-gray-700/50"
                    } border`}
                  >
                    <input
                      type="radio"
                      name="contentType"
                      value="pyq"
                      checked={contentType === "pyq"}
                      onChange={(e) => setContentType(e.target.value)}
                      className="hidden"
                    />
                    <ClipboardList className="w-5 h-5 text-white mb-1" />
                    <span className="text-white text-xs">PYQ</span>
                  </motion.label>
                </div>
              </div>

              <div>
                <label className="block text-white/80 mb-1 text-sm font-medium">
                  Year
                </label>
                <select
                  value={year}
                  onChange={(e) => handleYearChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all text-sm"
                >
                  {yearOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/80 mb-1 text-sm font-medium">
                  Branch
                </label>
                <select
                  value={branch}
                  onChange={(e) => handleBranchChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all text-sm"
                >
                  {branchOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/80 mb-1 text-sm font-medium">
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all text-sm"
                >
                  {subjectOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {subject === "Other" && (
                  <input
                    type="text"
                    placeholder="Enter new subject name"
                    value={otherSubject}
                    onChange={(e) => setOtherSubject(e.target.value)}
                    className="mt-2 w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all text-sm"
                  />
                )}
              </div>

              {contentType === "material" && (
                <div>
                  <label className="block text-white/80 mb-1 text-sm font-medium">
                    Material Type
                  </label>
                  <select
                    value={materialType}
                    onChange={(e) => setMaterialType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all text-sm"
                  >
                    {materialTypeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {contentType === "pyq" && (
                <>
                  <div>
                    <label className="block text-white/80 mb-1 text-sm font-medium">
                      Session
                    </label>
                    <select
                      value={pyqSession}
                      onChange={(e) => setPyqSession(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all text-sm"
                    >
                      {pyqSessionOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/80 mb-1 text-sm font-medium">
                      Year
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 2023"
                      value={pyqYear}
                      onChange={(e) => setPyqYear(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all text-sm"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-white/80 mb-1 text-sm font-medium">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-1 text-sm font-medium">
                  Your Name (optional)
                </label>
                <input
                  type="text"
                  placeholder="Anonymous"
                  value={uploadedBy}
                  onChange={(e) => setUploadedBy(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all text-sm"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-3">
              <div>
                <label className="block text-white/80 mb-1 text-sm font-medium">
                  Description
                </label>
                <textarea
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all resize-none text-sm"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-1 text-sm font-medium">
                  File
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`w-full p-4 rounded-lg border-2 border-dashed transition-all ${
                    isDragging
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-gray-700/50 bg-gray-800/50"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="w-6 h-6 text-white/60 mb-1" />
                    <p className="text-white/60 text-xs text-center">
                      {file
                        ? file.name
                        : "Drag & drop your file here or click to browse"}
                    </p>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      required
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="mt-1 text-xs text-purple-400 hover:text-purple-300 cursor-pointer"
                    >
                      Browse files
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full mt-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-purple-500/20 transition-all text-sm"
          >
            Upload
          </motion.button>

          {status && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-2 rounded-lg text-center text-white bg-gray-800/50 text-sm"
            >
              {status}
            </motion.div>
          )}
        </form>
      </motion.div>
    </>
  );
};

export default ContentUpload;
