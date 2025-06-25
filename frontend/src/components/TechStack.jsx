import React from "react";
import {
  React as ReactIcon,
  Nodejs,
  Database,
  Cloud,
  Shield,
  Zap,
} from "lucide-react";

const TechStack = () => {
  const technologies = [
    {
      name: "React.js",
      description: "Modern UI with hooks and functional components",
      icon: "⚛️",
      color: "from-blue-500 to-cyan-500",
      features: ["Hooks", "Context API", "React Router"],
    },
    {
      name: "Node.js",
      description: "Scalable backend with Express framework",
      icon: "🟢",
      color: "from-green-500 to-emerald-500",
      features: ["Express.js", "REST API", "Middleware"],
    },
    {
      name: "MongoDB",
      description: "NoSQL database for flexible data storage",
      icon: "🍃",
      color: "from-green-600 to-green-700",
      features: ["Mongoose ODM", "Aggregation", "Indexing"],
    },
    {
      name: "Tailwind CSS",
      description: "Utility-first CSS framework",
      icon: "🎨",
      color: "from-cyan-500 to-blue-500",
      features: ["Responsive Design", "Custom Components", "Animations"],
    },
    {
      name: "Netlify",
      description: "Cloud deployment and hosting",
      icon: "☁️",
      color: "from-purple-500 to-pink-500",
      features: ["Auto Deploy", "CDN", "SSL"],
    },
    {
      name: "Git & GitHub",
      description: "Version control and collaboration",
      icon: "📚",
      color: "from-gray-700 to-gray-900",
      features: ["Version Control", "CI/CD", "Collaboration"],
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Technology Stack
          </h2>
          <p className="text-gray-400 text-lg">
            Modern technologies powering this platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden"
            >
              {/* Background gradient effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${tech.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              ></div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`text-3xl p-3 rounded-full bg-gradient-to-r ${tech.color} text-white group-hover:scale-110 transition-transform duration-300`}
                  >
                    {tech.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {tech.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{tech.description}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {tech.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${tech.color}`}
                      ></div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Hover effect line */}
                <div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${tech.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 text-gray-400">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Fast Performance</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4 text-blue-400" />
              <span>Cloud Deployed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
