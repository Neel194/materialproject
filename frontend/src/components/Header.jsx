"use client";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, Upload, Home } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <header className="h-[85px] fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 shadow-xl">
        <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-8 py-2">
          <div className="relative flex items-center gap-2">
            {/* Aura background */}
            <span className="absolute -left-4 -top-2 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 blur-2xl opacity-30 z-0"></span>
            <BookOpen className="w-8 h-8 text-indigo-400 relative z-10" />
            <span className="font-raleway text-2xl sm:text-3xl font-extrabold tracking-tight select-none relative z-10">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Material
              </span>
              <span className="text-indigo-200 ml-1">Miner</span>
              {/* Animated underline */}
              <span className="block h-1 mt-1 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-pulse w-2/3 mx-auto opacity-80"></span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <nav className="flex gap-4 bg-white/10 backdrop-blur-md rounded-full px-4 py-1">
              {!isHome && (
                <Link
                  to="/"
                  className="px-4 py-2 rounded-full font-bold tracking-wide text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md hover:scale-105 hover:shadow-indigo-500/40 transition-all duration-200 flex items-center gap-2 relative group overflow-hidden"
                >
                  <Home className="w-5 h-5" />
                  <span className="relative z-10">Home</span>
                  <span className="absolute left-0 bottom-0 w-0 h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full group-hover:w-full transition-all duration-300"></span>
                </Link>
              )}
              <Link
                to="/upload"
                className="px-4 py-2 rounded-full font-bold tracking-wide text-white bg-gradient-to-r from-pink-500 to-indigo-500 shadow-md hover:scale-105 hover:shadow-pink-500/40 transition-all duration-200 flex items-center gap-2 border-2 border-transparent hover:border-pink-400 focus:ring-2 focus:ring-pink-400"
              >
                <span>Upload</span>
                <Upload className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="px-4 py-2 rounded-full font-bold tracking-wide text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md hover:scale-105 hover:shadow-indigo-500/40 transition-all duration-200 relative group overflow-hidden"
              >
                <span className="relative z-10">About</span>
                <span className="absolute left-0 bottom-0 w-0 h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full group-hover:w-full transition-all duration-300"></span>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      {/* Wavy SVG Divider */}
      <div className="w-full overflow-hidden -mt-1">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8"
        >
          <path
            fill="url(#header-wave)"
            d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
          />
          <defs>
            <linearGradient
              id="header-wave"
              x1="0"
              x2="1440"
              y1="0"
              y2="60"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#a78bfa" />
              <stop offset="0.5" stopColor="#f472b6" />
              <stop offset="1" stopColor="#818cf8" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
};

export default Header;
