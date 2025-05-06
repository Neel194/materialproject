"use client";
import React from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import {
  IconBrain,
  IconBook,
  IconCalendar,
  IconNotes,
} from "@tabler/icons-react";

const BackgroundGradient = ({ children, gradient }) => {
  return (
    <div className="relative group">
      <motion.div
        className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 0.5 }}
      />
      {children}
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, text, gradient, index }) => {
  return (
    <BackgroundGradient gradient={gradient}>
      <motion.div
        className="relative h-full bg-black/40 backdrop-blur-xl rounded-xl p-8 border border-white/[0.08] overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Ambient light effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/[0.03] rounded-xl"></div>

        {/* Glowing border effect */}
        <div className="absolute inset-0 border border-white/[0.08] rounded-xl group-hover:border-white/[0.2] transition-colors duration-300"></div>

        <div className="relative z-10">
          <motion.div
            className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${gradient} shadow-lg group-hover:shadow-xl transition-all duration-300`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Icon className="w-8 h-8 text-white" stroke={1.5} />
          </motion.div>

          <motion.h3
            className="text-xl font-bold text-white mb-3 tracking-tight"
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            {title}
          </motion.h3>

          <motion.p
            className="text-white/80 leading-relaxed font-medium"
            initial={{ opacity: 0.6 }}
            whileHover={{ opacity: 0.9 }}
          >
            {text}
          </motion.p>

          {/* Hover effect line */}
          <motion.div
            className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </BackgroundGradient>
  );
};

const Features = () => {
  const features = [
    {
      icon: IconBook,
      title: "Syllabus",
      text: "Access comprehensive syllabus for various courses",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
    },
    {
      icon: IconNotes,
      title: "Previous Year Questions",
      text: "Practice with past exam papers",
      gradient: "from-purple-500 via-pink-500 to-rose-500",
    },
    {
      icon: IconCalendar,
      title: "Exam Timetable",
      text: "Stay updated with exam schedules",
      gradient: "from-orange-500 via-amber-500 to-yellow-500",
    },
    {
      icon: IconBrain,
      title: "Study Materials",
      text: "Access notes, textbooks, and more",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-gray-100 dark:to-gray-900 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-indigo-500/[0.02] bg-[size:30px_30px]"></div>
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="max-w-3xl mx-auto mb-20">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg mb-8 tracking-tight flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-8 h-8 text-pink-300 drop-shadow" />
            Our Features
          </motion.h2>
          <motion.p
            className="text-lg font-medium text-white/90 leading-relaxed mb-8 drop-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover everything you need for your academic success
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
