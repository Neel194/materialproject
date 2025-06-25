import React, { useState } from "react";
import { Play, Pause, Zap, Eye } from "lucide-react";

const DemoMode = () => {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoProgress, setDemoProgress] = useState(0);

  const startDemo = () => {
    setIsDemoMode(true);
    setDemoProgress(0);

    const interval = setInterval(() => {
      setDemoProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const stopDemo = () => {
    setIsDemoMode(false);
    setDemoProgress(0);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-black/80 backdrop-blur-lg rounded-xl p-4 border border-white/20 shadow-2xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-purple-400" />
            <span className="text-white text-sm font-medium">Demo Mode</span>
          </div>
          <div
            className={`w-2 h-2 rounded-full ${
              isDemoMode ? "bg-green-400 animate-pulse" : "bg-gray-400"
            }`}
          ></div>
        </div>

        {isDemoMode && (
          <div className="mb-3">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Demo Progress</span>
              <span>{demoProgress}%</span>
            </div>
            <div className="w-32 bg-white/20 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-200"
                style={{ width: `${demoProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          {!isDemoMode ? (
            <button
              onClick={startDemo}
              className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium rounded-lg hover:scale-105 transition-all duration-200"
            >
              <Play className="w-3 h-3" />
              Start Demo
            </button>
          ) : (
            <button
              onClick={stopDemo}
              className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-medium rounded-lg hover:scale-105 transition-all duration-200"
            >
              <Pause className="w-3 h-3" />
              Stop Demo
            </button>
          )}

          <button className="flex items-center gap-1 px-3 py-1.5 bg-white/10 text-white text-xs font-medium rounded-lg hover:bg-white/20 transition-all duration-200">
            <Zap className="w-3 h-3" />
            Features
          </button>
        </div>

        {isDemoMode && (
          <div className="mt-3 p-2 bg-white/5 rounded-lg">
            <div className="text-xs text-gray-400 space-y-1">
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                <span>Real-time data loading</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                <span>Responsive animations</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                <span>Interactive components</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoMode;
