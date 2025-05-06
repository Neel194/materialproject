import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ContentSelector = () => {
  const navigate = useNavigate();

  // Retrieve saved selections from localStorage
  const [year, setYear] = useState(localStorage.getItem("selectedYear") || "");
  const [branch, setBranch] = useState(
    localStorage.getItem("selectedBranch") || ""
  );
  const [content, setContent] = useState(
    localStorage.getItem("selectedContent") || ""
  );

  useEffect(() => {
    // Save selections in localStorage when they change
    localStorage.setItem("selectedYear", year);
    localStorage.setItem("selectedBranch", branch);
    localStorage.setItem("selectedContent", content);
  }, [year, branch, content]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!year || !branch || !content) {
      alert("Please select all fields");
      return;
    }

    // Redirect to the correct page based on selection
    navigate(`/${content}?year=${year}&branch=${branch}`);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white text-center mb-8 tracking-tight">
          Select What You Need
        </h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          {/* Year Selection */}
          <div className="mb-6">
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-200 tracking-wide">
              Your Current Year:
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="" disabled>
                Select Year
              </option>
              <option value="1st">1st Year</option>
              <option value="2nd">2nd Year</option>
              <option value="3rd">3rd Year</option>
              <option value="4th">4th Year</option>
            </select>
          </div>

          {/* Branch Selection */}
          <div className="mb-6">
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-200 tracking-wide">
              Your Branch:
            </label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="" disabled>
                Select Branch
              </option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
            </select>
          </div>

          {/* Content Selection */}
          <div className="mb-6">
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-200 tracking-wide">
              What do you need?
            </label>
            <select
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="" disabled>
                Select Content
              </option>
              <option value="syllabus">Syllabus</option>
              <option value="pyq">Previous Year Questions</option>
              <option value="material">Study Material</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg tracking-wide shadow-sm transition-all duration-200 mt-4"
          >
            Get Content
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContentSelector;
