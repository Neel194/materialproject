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
    <section className="py-16 bg-white dark:bg-black">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg text-center mb-8 tracking-tight animate-gradient">
          Select What You Need
        </h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white dark:bg-black p-8 rounded-lg shadow-lg"
        >
          {/* Year Selection */}
          <div className="mb-4">
            <label className="block font-bold mb-2 text-white tracking-wide">
              Your Current Year:
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-neutral-800 rounded-lg bg-white dark:bg-black text-black dark:text-white"
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
          <div className="mb-4">
            <label className="block font-bold mb-2 text-white tracking-wide">
              Your Branch:
            </label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-neutral-800 rounded-lg bg-white dark:bg-black text-black dark:text-white"
            >
              <option value="" disabled>
                Select Branch
              </option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
            </select>
          </div>

          {/* Content Selection */}
          <div className="mb-4">
            <label className="block font-bold mb-2 text-white tracking-wide">
              What do you need?
            </label>
            <select
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-neutral-800 rounded-lg bg-white dark:bg-black text-black dark:text-white"
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
            className="w-full p-3 bg-gradient-to-r from-purple-700 via-indigo-700 to-pink-600 text-white rounded-lg font-bold text-lg tracking-wide shadow-md transition hover:scale-105 hover:shadow-lg mt-4"
          >
            Get Content
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContentSelector;
