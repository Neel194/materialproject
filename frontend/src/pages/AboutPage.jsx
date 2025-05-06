"use client";
import React from "react";
import {
  BookOpen,
  FileText,
  Users,
  Target,
  Shield,
  Clock,
  Sparkles,
} from "lucide-react";

const AboutPage = () => {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-blue-500" />,
      title: "Comprehensive Study Materials",
      description:
        "Access a wide range of study materials including notes, books, and reference materials for all subjects.",
    },
    {
      icon: <FileText className="w-8 h-8 text-green-500" />,
      title: "Previous Year Questions",
      description:
        "Get access to previous year question papers to help you prepare better for your exams.",
    },
    {
      icon: <Users className="w-8 h-8 text-purple-500" />,
      title: "Student Community",
      description:
        "Join a community of students where you can share knowledge and help each other succeed.",
    },
    {
      icon: <Target className="w-8 h-8 text-red-500" />,
      title: "Focused Learning",
      description:
        "Find exactly what you need with our organized and categorized study resources.",
    },
    {
      icon: <Shield className="w-8 h-8 text-yellow-500" />,
      title: "Quality Content",
      description:
        "All materials are verified and curated to ensure high-quality content for your studies.",
    },
    {
      icon: <Clock className="w-8 h-8 text-teal-500" />,
      title: "Time-Saving",
      description:
        "Save time by accessing all your study materials in one place, anytime, anywhere.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-r dark:from-black dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-r from-blue-500 to-teal-500 dark:from-blue-900 dark:to-teal-900">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About Material Mining
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Your one-stop platform for accessing comprehensive study materials,
            previous year questions, and more.
          </p>
        </div>
      </div>

      {/* Mission Section - Enhanced */}
      <div className="py-24 bg-gradient-to-b from-black via-gray-900 to-black flex justify-center items-center">
        <div className="w-full max-w-2xl mx-auto px-6">
          <div className="relative rounded-3xl shadow-2xl border-4 border-transparent bg-gradient-to-br from-gray-900 via-black to-gray-900 p-1 overflow-visible">
            {/* Animated glowing border */}
            <div
              className="absolute -inset-1 rounded-3xl pointer-events-none animate-pulse z-0"
              style={{
                background:
                  "linear-gradient(120deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)",
                filter: "blur(16px)",
                opacity: 0.5,
              }}
            ></div>
            <div className="relative bg-black/80 backdrop-blur-lg rounded-2xl p-12 text-center z-10 shadow-xl border border-white/10">
              <div className="flex justify-center mb-4">
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 shadow-lg animate-fade-in">
                  <Sparkles className="w-10 h-10 text-white drop-shadow" />
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-wide drop-shadow-lg font-['Poppins']">
                Our Mission
              </h2>
              <p className="text-xl md:text-2xl text-gray-200 font-medium leading-relaxed max-w-xl mx-auto font-['Inter']">
                We are dedicated to providing students with easy access to
                high-quality study materials and resources. Our platform is
                designed to help you excel in your academic journey by offering
                comprehensive study materials, previous year questions, and a
                supportive community.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-black p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Have questions or suggestions? We'd love to hear from you!
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="mailto:contact@materialmining.com"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition"
              >
                Contact Us
              </a>
              <a
                href="https://github.com/yourusername/material-mining"
                className="px-6 py-3 bg-gray-800 text-white rounded-lg font-bold hover:bg-gray-700 transition"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
