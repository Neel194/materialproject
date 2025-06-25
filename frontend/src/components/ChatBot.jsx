import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  X,
  MessageCircle,
  Bot,
  User,
  Download,
  FileText,
  BookOpen,
  Search,
} from "lucide-react";
import { materialData } from "../data/materialData.js";
import { pyqData } from "../data/pyqData.js";
import { syllabusData } from "../data/syllabusData.js";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your Material Mining Assistant. I can help you find study materials, PYQs, and syllabus for CSE subjects. Ask me about specific subjects, years, or types of content!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Training data based on actual CSE curriculum from all data files
  const trainingData = {
    // Years
    "1st year": [
      "1st_CSE",
      "first year",
      "1st year",
      "first semester",
      "second semester",
    ],
    "2nd year": [
      "2nd_CSE",
      "second year",
      "2nd year",
      "third semester",
      "fourth semester",
    ],
    "3rd year": [
      "3rd_CSE",
      "third year",
      "3rd year",
      "fifth semester",
      "sixth semester",
    ],
    "4th year": [
      "4th_CSE",
      "fourth year",
      "4th year",
      "seventh semester",
      "eighth semester",
    ],

    // Core subjects by year
    mathematics: [
      "Mathematics",
      "Calculus",
      "Linear Algebra",
      "Vector Calculus",
      "Discrete Mathematics",
      "Probability",
      "Statistics",
    ],
    programming: [
      "Programming",
      "C Programming",
      "Object-Oriented Programming",
      "Java",
      "Python",
      "Data Structures",
      "PPS",
    ],
    "computer science": [
      "Computer Science",
      "Computer Programming",
      "Data Structures",
      "Algorithms",
      "Database",
      "Operating Systems",
    ],
    electronics: [
      "Electronics",
      "Basic Electronics",
      "Digital Electronics",
      "Digital Fundamentals",
      "Electronic Devices",
    ],
    electrical: [
      "Electrical",
      "Basic Electrical Engineering",
      "Electrical Circuits",
      "BEE",
    ],
    mechanical: [
      "Mechanical",
      "Engineering Mechanics",
      "Elements of Mechanical Engineering",
      "BME",
    ],
    physics: ["Physics", "Mechanics", "Classical Mechanics"],
    chemistry: ["Chemistry", "Organic Chemistry", "Engineering Chemistry"],
    communication: [
      "Communication",
      "Technical Communication",
      "Technical Writing",
      "English",
    ],
    environmental: [
      "Environmental",
      "Environmental Studies",
      "Environmental Science",
      "ES",
    ],
    workshop: ["Workshop", "Workshop Practice"],
    graphics: ["Graphics", "Engineering Graphics", "Technical Drawing", "EGD"],

    // Specific subjects
    "data structures": [
      "Data Structures",
      "Arrays",
      "Linked Lists",
      "Trees",
      "Graphs",
      "DS",
    ],
    database: ["Database", "DBMS", "SQL", "Database Management Systems"],
    "operating systems": [
      "Operating Systems",
      "OS",
      "Process Management",
      "Memory Management",
    ],
    "computer organization": [
      "Computer Organization",
      "Computer Architecture",
      "Microprocessor",
    ],
    algorithms: [
      "Algorithms",
      "Analysis and Design of Algorithms",
      "Algorithm Analysis",
    ],
    microprocessor: [
      "Microprocessor",
      "Microprocessor Architecture",
      "8085",
      "8086",
    ],
    "computer networks": [
      "Computer Networks",
      "Networking",
      "Network Protocols",
    ],
    "software engineering": [
      "Software Engineering",
      "Software Development",
      "SDLC",
    ],
    "web development": [
      "Web Development",
      "Web Technologies",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    "machine learning": [
      "Machine Learning",
      "ML",
      "Artificial Intelligence",
      "AI",
    ],
    "cyber security": [
      "Cyber Security",
      "Network Security",
      "Security Fundamentals",
    ],
    iot: ["IoT", "Internet of Things", "IoT Architecture"],
    "image processing": ["Image Processing", "Digital Image Processing"],
    "digital fundamentals": ["Digital Fundamentals", "Digital Logic", "DF"],

    // Material types
    notes: ["notes", "study notes", "lecture notes", "materials"],
    books: ["books", "textbooks", "reference books"],
    materials: ["materials", "study materials", "resources"],
    pyqs: ["pyqs", "previous year questions", "question papers", "papers"],
    syllabus: ["syllabus", "curriculum", "course outline", "units"],
    download: ["download", "download link", "get materials"],
    preview: ["preview", "preview link", "view materials"],
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Banner logic
  useEffect(() => {
    const handleScroll = () => {
      if (!hasInteracted && window.scrollY > 300) {
        setShowBanner(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasInteracted]);

  // Auto-hide banner after 8 seconds
  useEffect(() => {
    if (showBanner) {
      const timer = setTimeout(() => {
        setShowBanner(false);
        setHasInteracted(true);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [showBanner]);

  const handleBannerClick = () => {
    setShowBanner(false);
    setHasInteracted(true);
    setIsOpen(true);
  };

  const handleBannerDismiss = () => {
    setShowBanner(false);
    setHasInteracted(true);
  };

  const findBestMatch = (userInput) => {
    const input = userInput.toLowerCase();
    let bestMatch = null;
    let highestScore = 0;

    for (const [category, keywords] of Object.entries(trainingData)) {
      let score = 0;
      for (const keyword of keywords) {
        if (input.includes(keyword.toLowerCase())) {
          score += keyword.length; // Longer matches get higher scores
        }
      }
      if (score > highestScore) {
        highestScore = score;
        bestMatch = category;
      }
    }

    return { category: bestMatch, score: highestScore };
  };

  const generateResponse = (userInput) => {
    const { category, score } = findBestMatch(userInput);
    const input = userInput.toLowerCase();

    // If no good match found
    if (score < 3) {
      return {
        text: "I'm not sure about that. Try asking about specific subjects like 'Mathematics', 'Programming', 'Data Structures', or ask about materials for a particular year like '1st year materials'. You can also ask for 'PYQs', 'syllabus', or 'books'.",
        suggestions: [
          "1st year materials",
          "Programming notes",
          "Data Structures books",
          "Mathematics materials",
          "PYQs",
          "Syllabus",
        ],
      };
    }

    // Handle year-based queries
    if (["1st year", "2nd year", "3rd year", "4th year"].includes(category)) {
      const yearKey =
        category === "1st year"
          ? "1st_CSE"
          : category === "2nd year"
          ? "2nd_CSE"
          : category === "3rd year"
          ? "3rd_CSE"
          : "4th_CSE";

      const materialSubjects = materialData[yearKey] || [];
      const pyqSubjects = pyqData[yearKey] || [];
      const syllabusSubjects = syllabusData[yearKey] || [];

      const allSubjects = [
        ...new Set([
          ...materialSubjects.map((s) => s.name),
          ...pyqSubjects.map((s) => s.name),
          ...syllabusSubjects.map((s) => s.name),
        ]),
      ];

      if (allSubjects.length > 0) {
        const subjects = allSubjects.join(", ");
        return {
          text: `Here are the subjects for ${category} CSE: ${subjects}. Which specific subject would you like materials, PYQs, or syllabus for?`,
          suggestions: allSubjects
            .slice(0, 4)
            .map((subject) => `${subject} materials`),
        };
      }
    }

    // Handle material type queries
    if (["notes", "books", "materials"].includes(category)) {
      return {
        text: `I can help you find ${category}. Which subject or year are you looking for?`,
        suggestions: [
          "1st year",
          "Programming",
          "Data Structures",
          "Mathematics",
        ],
      };
    }

    // Handle PYQ queries
    if (["pyqs"].includes(category)) {
      return {
        text: `I can help you find PYQs (Previous Year Questions). Which subject or year are you looking for?`,
        suggestions: [
          "1st year PYQs",
          "Data Structures PYQs",
          "Programming PYQs",
          "Mathematics PYQs",
        ],
      };
    }

    // Handle syllabus queries
    if (["syllabus"].includes(category)) {
      return {
        text: `I can help you find syllabus. Which subject or year are you looking for?`,
        suggestions: [
          "1st year syllabus",
          "Data Structures syllabus",
          "Programming syllabus",
          "Mathematics syllabus",
        ],
      };
    }

    // Handle subject-based queries
    if (category && (materialData || pyqData || syllabusData)) {
      const matchingSubjects = [];
      const matchingMaterials = [];
      const matchingPYQs = [];
      const matchingSyllabus = [];

      // Search through all years and all data types
      const allData = [
        { data: materialData, type: "material" },
        { data: pyqData, type: "pyq" },
        { data: syllabusData, type: "syllabus" },
      ];

      allData.forEach(({ data, type }) => {
        if (data) {
          Object.entries(data).forEach(([year, subjects]) => {
            subjects.forEach((subject) => {
              if (
                trainingData[category]?.some((keyword) =>
                  subject.name.toLowerCase().includes(keyword.toLowerCase())
                )
              ) {
                matchingSubjects.push({ year, subject, type });

                // Add materials
                if (type === "material" && subject.materials) {
                  matchingMaterials.push(
                    ...subject.materials.map((m) => ({
                      ...m,
                      type: "material",
                      year,
                      subject: subject.name,
                    }))
                  );
                }
                if (type === "material" && subject.books) {
                  matchingMaterials.push(
                    ...subject.books.map((b) => ({
                      ...b,
                      type: "book",
                      year,
                      subject: subject.name,
                    }))
                  );
                }

                // Add PYQs
                if (type === "pyq" && subject.papers) {
                  matchingPYQs.push(
                    ...subject.papers.map((p) => ({
                      ...p,
                      type: "pyq",
                      year,
                      subject: subject.name,
                    }))
                  );
                }

                // Add Syllabus
                if (type === "syllabus") {
                  matchingSyllabus.push({
                    name: subject.name,
                    description: subject.description,
                    units: subject.units,
                    previewLink: subject.previewLink,
                    downloadLink: subject.downloadLink,
                    type: "syllabus",
                    year,
                    subject: subject.name,
                  });
                }
              }
            });
          });
        }
      });

      if (matchingSubjects.length > 0) {
        const yearSubjects = matchingSubjects
          .map(
            ({ year, subject, type }) => `${subject.name} (${year} - ${type})`
          )
          .join(", ");

        const totalItems =
          matchingMaterials.length +
          matchingPYQs.length +
          matchingSyllabus.length;

        let responseText = `I found ${totalItems} items for ${category}: ${yearSubjects}. `;

        if (matchingMaterials.length > 0) {
          responseText += `${matchingMaterials.length} materials/books, `;
        }
        if (matchingPYQs.length > 0) {
          responseText += `${matchingPYQs.length} PYQs, `;
        }
        if (matchingSyllabus.length > 0) {
          responseText += `${matchingSyllabus.length} syllabus. `;
        }

        responseText += "Would you like me to show you specific items?";

        const suggestions = [];
        if (matchingMaterials.length > 0) suggestions.push("Show materials");
        if (matchingPYQs.length > 0) suggestions.push("Show PYQs");
        if (matchingSyllabus.length > 0) suggestions.push("Show syllabus");

        return {
          text: responseText,
          suggestions,
          materials: matchingMaterials.slice(0, 3),
          pyqs: matchingPYQs.slice(0, 3),
          syllabus: matchingSyllabus.slice(0, 3),
        };
      }
    }

    return {
      text: "I found some information but need more details. Could you specify the year or subject you're interested in?",
      suggestions: [
        "1st year materials",
        "Programming notes",
        "Data Structures books",
        "PYQs",
        "Syllabus",
      ],
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = generateResponse(inputValue);

      const botMessage = {
        id: Date.now() + 1,
        text: response.text,
        sender: "bot",
        timestamp: new Date(),
        suggestions: response.suggestions,
        materials: response.materials,
        pyqs: response.pyqs,
        syllabus: response.syllabus,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const quickButtons = [
    "1st year materials",
    "Data Structures books",
    "Programming notes",
    "Mathematics materials",
    "PYQs",
    "Syllabus",
  ];

  return (
    <>
      {/* Smart Notification Banner */}
      {showBanner && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 shadow-lg transform transition-all duration-500 ease-in-out">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold">Need help finding materials?</p>
                <p className="text-sm text-indigo-100">
                  Ask our AI assistant for instant help!
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleBannerClick}
                className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors flex items-center space-x-2"
              >
                <Bot className="w-4 h-4" />
                <span>Ask AI</span>
              </button>
              <button
                onClick={handleBannerDismiss}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 px-6 py-3 rounded-full shadow-lg transition-all duration-300 flex items-center space-x-2 ${
          isOpen
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
        }`}
      >
        {isOpen ? (
          <>
            <X size={20} />
            <span className="font-medium">Close</span>
          </>
        ) : (
          <>
            <Bot size={20} />
            <span className="font-medium">Ask AI Assistant</span>
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed z-40 w-96 h-[500px] bg-black/90 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl flex flex-col ${
            showBanner ? "top-20 right-6" : "bottom-20 right-6"
          }`}
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">
                Material Mining Assistant
              </h3>
              <p className="text-gray-400 text-xs">Online • Ready to help</p>
            </div>
            <button
              onClick={toggleChat}
              className="ml-auto text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex gap-2 max-w-[80%] ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                        : "bg-gradient-to-r from-indigo-500 to-purple-600"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                        : "bg-white/10 text-white"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {message.text}
                    </p>

                    {/* Show materials if available */}
                    {message.materials && message.materials.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs font-semibold text-indigo-400">
                          📚 Materials & Books:
                        </p>
                        {message.materials.map((material, index) => (
                          <div
                            key={index}
                            className="bg-white/5 rounded-lg p-3 border border-white/10"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="w-4 h-4 text-indigo-400" />
                              <span className="text-sm font-medium">
                                {material.name}
                              </span>
                            </div>
                            <div className="text-xs text-gray-400 mb-2">
                              {material.subject} ({material.year}) •{" "}
                              {material.type}
                            </div>
                            <div className="flex items-center gap-2">
                              <a
                                href={material.previewLink}
                                className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs rounded-lg hover:scale-105 transition-all"
                              >
                                <Download className="w-3 h-3" />
                                Preview
                              </a>
                              <a
                                href={material.downloadLink}
                                className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs rounded-lg hover:scale-105 transition-all"
                              >
                                <Download className="w-3 h-3" />
                                Download
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Show PYQs if available */}
                    {message.pyqs && message.pyqs.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs font-semibold text-green-400">
                          📝 Previous Year Questions:
                        </p>
                        {message.pyqs.map((pyq, index) => (
                          <div
                            key={index}
                            className="bg-white/5 rounded-lg p-3 border border-white/10"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="w-4 h-4 text-green-400" />
                              <span className="text-sm font-medium">
                                {pyq.subject} - {pyq.semester} {pyq.year}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <a
                                href={pyq.previewLink}
                                className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs rounded-lg hover:scale-105 transition-all"
                              >
                                <Download className="w-3 h-3" />
                                Preview
                              </a>
                              <a
                                href={pyq.downloadLink}
                                className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs rounded-lg hover:scale-105 transition-all"
                              >
                                <Download className="w-3 h-3" />
                                Download
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Show Syllabus if available */}
                    {message.syllabus && message.syllabus.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs font-semibold text-yellow-400">
                          📖 Syllabus:
                        </p>
                        {message.syllabus.map((syllabus, index) => (
                          <div
                            key={index}
                            className="bg-white/5 rounded-lg p-3 border border-white/10"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="w-4 h-4 text-yellow-400" />
                              <span className="text-sm font-medium">
                                {syllabus.name}
                              </span>
                            </div>
                            <div className="text-xs text-gray-400 mb-2">
                              {syllabus.subject} ({syllabus.year})
                            </div>
                            {syllabus.units && (
                              <div className="text-xs text-gray-400 mb-2">
                                Units: {syllabus.units.join(", ")}
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <a
                                href={syllabus.previewLink}
                                className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-xs rounded-lg hover:scale-105 transition-all"
                              >
                                <Download className="w-3 h-3" />
                                Preview
                              </a>
                              <a
                                href={syllabus.downloadLink}
                                className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs rounded-lg hover:scale-105 transition-all"
                              >
                                <Download className="w-3 h-3" />
                                Download
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-3 py-1 bg-white/10 text-white text-xs rounded-full hover:bg-white/20 transition-all"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}

                    <p className="text-xs text-gray-400 mt-2">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white/10 rounded-2xl px-4 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Buttons */}
          <div className="p-4 border-t border-white/10">
            <div className="flex flex-wrap gap-2 mb-3">
              {quickButtons.map((button, index) => (
                <button
                  key={index}
                  onClick={() => setInputValue(button)}
                  className="px-3 py-1 bg-white/10 text-white text-xs rounded-full hover:bg-white/20 transition-all"
                >
                  {button}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything... (e.g., 2nd year CS syllabus)"
                className="flex-1 bg-white/10 text-white placeholder-gray-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
