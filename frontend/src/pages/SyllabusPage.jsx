import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import { FileText, Download, Eye } from "lucide-react";
import { syllabusData } from "../data/syllabusData";

const SyllabusPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [syllabus, setSyllabus] = useState(null);
  const [contentFetched, setContentFetched] = useState(false);
  const [searchParams] = useSearchParams();

  const year = searchParams.get("year");
  const branch = searchParams.get("branch");

  useEffect(() => {
    const key = `${year}_${branch}`;
    const availableSubjects = syllabusData[key] || [];
    setSubjects(availableSubjects);
    setSelectedSubject("");
    setContentFetched(false);
  }, [year, branch]);

  const fetchSyllabus = () => {
    if (!selectedSubject) {
      alert("Please select a subject first!");
      return;
    }

    const subjectData = subjects.find(
      (subject) => subject.name === selectedSubject
    );
    if (subjectData) {
      setSyllabus(subjectData);
      setContentFetched(true);
    }
  };

  const SyllabusCard = ({ syllabus }) => (
    <div className="bg-white dark:bg-black p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-3 mb-4">
        <FileText className="w-6 h-6 text-blue-500" />
        <div>
          <h3 className="text-lg font-bold text-teal-900 dark:text-teal-200">
            {syllabus.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {syllabus.units.length} Units
          </p>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
        {syllabus.description}
      </p>

      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Units:
        </h4>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
          {syllabus.units.map((unit, index) => (
            <li
              key={index}
              className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              {unit}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-2">
        <a
          href={syllabus.previewLink}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-700 via-indigo-700 to-pink-600 text-white rounded-lg font-bold hover:scale-105 hover:shadow-lg transition flex items-center justify-center gap-2"
        >
          <Eye size={18} />
          Preview
        </a>
        <a
          href={syllabus.downloadLink}
          target="_blank"
          rel="noopener noreferrer"
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
            Syllabus - {year} Year {branch} Branch
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
                onClick={fetchSyllabus}
                className="px-5 py-2 bg-gradient-to-r from-purple-700 via-indigo-700 to-pink-600 text-white font-bold rounded-lg shadow-md transition hover:scale-105 hover:shadow-lg"
              >
                Get Syllabus
              </button>
            </div>
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-300">
              No subjects available for the selected year and branch.
            </p>
          )}

          {contentFetched && syllabus ? (
            <div>
              <h3 className="text-2xl font-bold text-gray-700 dark:text-white mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-500" />
                Subject Syllabus
              </h3>
              <SyllabusCard syllabus={syllabus} />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default SyllabusPage;
