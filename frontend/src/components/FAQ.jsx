import { useState } from "react";
import {
  ChevronDown,
  BookOpen,
  FileText,
  Calendar,
  Download,
  Search,
  Bookmark,
  GraduationCap,
} from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What GTU materials are available on the platform?",
      answer:
        "We provide comprehensive GTU study materials including semester-wise syllabus, previous year question papers (PYQs), subject notes, and reference materials. Our collection covers all branches and semesters of GTU courses, regularly updated with the latest curriculum changes.",
      icon: <BookOpen className="w-5 h-5 text-indigo-400" />,
    },
    {
      question: "How can I find specific PYQs for my subject?",
      answer:
        "You can easily find PYQs by selecting your branch, semester, and subject. The platform organizes PYQs chronologically and by question type. You can also use the search feature to find specific topics or question patterns. All PYQs are available in downloadable PDF format.",
      icon: <Search className="w-5 h-5 text-indigo-400" />,
    },
    {
      question:
        "Is the syllabus content up to date with GTU's latest curriculum?",
      answer:
        "Yes, we regularly update our syllabus content to match GTU's latest curriculum changes. Our team monitors GTU's official announcements and updates the materials accordingly. You can find the last update date on each syllabus document to ensure you're studying the most current content.",
      icon: <Calendar className="w-5 h-5 text-indigo-400" />,
    },
    {
      question: "Can I download materials for offline use?",
      answer:
        "Yes, all materials including PYQs, syllabus, and study notes can be downloaded in PDF format for offline use. You can download individual documents or entire subject packages. The platform also allows you to create custom collections of materials for specific subjects or topics.",
      icon: <Download className="w-5 h-5 text-indigo-400" />,
    },
    {
      question: "How are the study materials organized?",
      answer:
        "Materials are organized by branch, semester, and subject for easy navigation. Each subject page contains syllabus, PYQs, notes, and additional resources. You can also use filters to find specific types of content or use the search function to locate particular topics.",
      icon: <FileText className="w-5 h-5 text-indigo-400" />,
    },
    {
      question: "Can I save materials for later reference?",
      answer:
        "Yes, you can bookmark materials to create your personal collection. The platform allows you to organize saved materials into custom folders, making it easy to access your frequently used resources. You can also add notes and tags to your saved materials for better organization.",
      icon: <Bookmark className="w-5 h-5 text-indigo-400" />,
    },
    {
      question: "What branches and courses are covered?",
      answer:
        "We cover all major GTU branches including Computer Engineering, Information Technology, Mechanical Engineering, Civil Engineering, Electrical Engineering, and more. Our content includes both undergraduate and postgraduate courses, with materials for all semesters of each program.",
      icon: <GraduationCap className="w-5 h-5 text-indigo-400" />,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-indigo-950 dark:from-gray-900 dark:to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-indigo-200 text-lg">
            Everything you need to know about GTU Materials and Resources
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg rounded-xl border border-indigo-500/20 overflow-hidden hover:bg-white/10 transition-colors"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex items-center gap-3">
                  {faq.icon}
                  <span className="text-lg font-medium text-white group-hover:text-indigo-300 transition-colors">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-indigo-400 transition-transform duration-200 ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`px-6 transition-all duration-200 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100 pb-6"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-indigo-200">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
