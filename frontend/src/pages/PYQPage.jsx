import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import { FileText, Download, Eye } from "lucide-react";
import { pyqData } from "../data/pyqData";

const PYQPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [papers, setPapers] = useState([]);
  const [contentFetched, setContentFetched] = useState(false);
  const [searchParams] = useSearchParams();

  const year = searchParams.get("year");
  const branch = searchParams.get("branch");

  const getSubjectAbbreviation = (subjectName) => {
    const abbreviations = {
      Mathematics: "Math",
      Physics: "Phy",
      Chemistry: "Chem",
      English: "Eng",
      Programming: "Prog",
      "Data Structures": "DS",
      OOPS: "OOPS",
      "Database Management": "DBMS",
      "Operating Systems": "OS",
      "Computer Organization": "CO",
      "Analysis And Design Of Algorithms": "ADA",
      "Computer Networks": "CN",
      "Software Engineering": "SE",
      "Web Technologies": "WT",
      "Artificial Intelligence": "AI",
    };
    return abbreviations[subjectName] || subjectName;
  };

  useEffect(() => {
    const key = `${year}_${branch}`;
    const availableSubjects = pyqData[key] || [];
    setSubjects(availableSubjects);
    setSelectedSubject("");
    setPapers([]);
    setContentFetched(false);
  }, [year, branch]);

  const fetchPapers = () => {
    if (!selectedSubject) {
      alert("Please select a subject first!");
      return;
    }

    const subjectData = subjects.find(
      (subject) => subject.name === selectedSubject
    );
    if (subjectData) {
      setPapers(subjectData.papers);
      setContentFetched(true);
    }
  };

  const PaperCard = ({ paper, subjectName }) => (
    <div className="bg-white dark:bg-black p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-3 mb-4">
        <FileText className="w-6 h-6 text-blue-500" />
        <div>
          <h3 className="text-lg font-bold text-teal-900 dark:text-teal-200">
            {getSubjectAbbreviation(subjectName)} -{" "}
            {paper.semester.charAt(0).toUpperCase() + paper.semester.slice(1)}{" "}
            {paper.year}
          </h3>
          <div className="flex gap-2 mt-1">
            <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
              {paper.semester}
            </span>
            <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-sm">
              {paper.year}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <a
          href={paper.previewLink}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-700 via-indigo-700 to-pink-600 text-white rounded-lg font-bold hover:scale-105 hover:shadow-lg transition flex items-center justify-center gap-2"
        >
          <Eye size={18} />
          Preview
        </a>
        <a
          href={paper.downloadLink}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-700 via-indigo-700 to-pink-600 text-white rounded-lg font-bold hover:scale-105 hover:shadow-lg transition flex items-center justify-center gap-2"
        >
          <Download size={18} />
          Download
        </a>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center bg-white dark:bg-gradient-to-r dark:from-black dark:to-gray-900 py-10">
        <div className="bg-white dark:bg-black p-6 rounded-xl shadow-2xl w-[90%] max-w-[1000px]">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-6">
            Previous Year Questions - {year} Year {branch} Branch
          </h2>

          {subjects.length > 0 ? (
            <div className="flex items-center justify-center gap-4 mb-6">
              <select
                className="p-3 border rounded-lg w-64 shadow-md focus:ring-2 focus:ring-blue-400 bg-white dark:bg-black text-black dark:text-white"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">Select Subject</option>
                {subjects.map((subject, index) => (
                  <option key={index} value={subject.name}>
                    {subject.name}
                  </option>
                ))}
              </select>
              <button
                onClick={fetchPapers}
                className="px-5 py-2 bg-gradient-to-r from-purple-700 via-indigo-700 to-pink-600 text-white font-bold rounded-lg shadow-md transition hover:scale-105 hover:shadow-lg"
              >
                Get Papers
              </button>
            </div>
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-300">
              No subjects available for the selected year and branch.
            </p>
          )}

          {contentFetched && (
            <>
              <h3 className="text-2xl font-bold text-gray-700 dark:text-white mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-500" />
                Previous Year Papers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {papers.map((paper, index) => (
                  <PaperCard
                    key={index}
                    paper={paper}
                    subjectName={selectedSubject}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PYQPage;
