import React, { useState, useEffect } from "react";
import { Users, FileText, Download, Clock } from "lucide-react";

const LiveStats = () => {
  const [counts, setCounts] = useState({
    users: 0,
    materials: 0,
    downloads: 0,
    uptime: 0,
  });

  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      label: "Active Users",
      value: counts.users,
      suffix: "+",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      label: "Materials Available",
      value: counts.materials,
      suffix: "",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Download className="w-6 h-6" />,
      label: "Downloads Today",
      value: counts.downloads,
      suffix: "+",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: "Uptime",
      value: counts.uptime,
      suffix: "%",
      color: "from-orange-500 to-red-500",
    },
  ];

  useEffect(() => {
    const targetCounts = {
      users: 1250,
      materials: 5000,
      downloads: 850,
      uptime: 99.9,
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounts({
        users: Math.floor(targetCounts.users * progress),
        materials: Math.floor(targetCounts.materials * progress),
        downloads: Math.floor(targetCounts.downloads * progress),
        uptime: parseFloat((targetCounts.uptime * progress).toFixed(1)),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts(targetCounts);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Platform Statistics
          </h2>
          <p className="text-gray-400 text-lg">
            Real-time metrics showing our platform's impact
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-center justify-center mb-4">
                <div
                  className={`p-3 rounded-full bg-gradient-to-r ${stat.color} text-white group-hover:scale-110 transition-transform duration-300`}
                >
                  {stat.icon}
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.value.toLocaleString()}
                  {stat.suffix}
                </div>
                <div className="text-gray-400 text-sm font-medium">
                  {stat.label}
                </div>
              </div>

              {/* Animated pulse effect */}
              <div
                className={`absolute inset-0 rounded-xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              ></div>
            </div>
          ))}
        </div>

        {/* Live indicator */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 text-green-400 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Live Data</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStats;
