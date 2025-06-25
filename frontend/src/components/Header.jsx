"use client";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, Upload, Home, Bell, X } from "lucide-react";
import { useState, useEffect } from "react";
import NotificationDropdown from "./NotificationDropdown";

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New material uploaded",
      time: "2 minutes ago",
      read: false,
    },
    { id: 2, message: "Processing complete", time: "1 hour ago", read: false },
  ]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".notifications-container")) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <>
      <header className="h-[65px] sm:h-[85px] fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 shadow-xl">
        <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-3 sm:px-8 py-2">
          {/* Logo Section */}
          <div className="relative flex items-center gap-1 sm:gap-2">
            {/* Aura background */}
            <span className="absolute -left-3 sm:-left-4 -top-2 w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 blur-2xl opacity-30 z-0"></span>
            <BookOpen className="w-5 h-5 sm:w-8 sm:h-8 text-indigo-400 relative z-10" />
            <span className="font-raleway text-base sm:text-3xl font-extrabold tracking-tight select-none relative z-10">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Material
              </span>
              <span className="text-indigo-200 ml-0.5 sm:ml-1">Miner</span>
              {/* Animated underline */}
              <span className="block h-0.5 sm:h-1 mt-0.5 sm:mt-1 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-pulse w-2/3 mx-auto opacity-80"></span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden sm:flex items-center gap-6">
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
              <NotificationDropdown />
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

          {/* Mobile Nav */}
          <div className="sm:hidden flex items-center gap-1">
            <div className="flex items-center gap-1">
              <NotificationDropdown />
            </div>
            <button
              className="text-white focus:outline-none p-1 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setMobileNavOpen((open) => !open)}
              aria-label="Toggle navigation"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {mobileNavOpen && (
          <nav className="sm:hidden bg-black/90 backdrop-blur-lg px-3 py-2 flex flex-col gap-2 absolute top-[65px] left-0 w-full z-50 border-b border-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            {!isHome && (
              <Link
                to="/"
                className="px-3 py-2 rounded-full font-bold tracking-wide text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md flex items-center gap-2"
                onClick={() => setMobileNavOpen(false)}
              >
                <Home className="w-4 h-4" /> Home
              </Link>
            )}
            <Link
              to="/upload"
              className="px-3 py-2 rounded-full font-bold tracking-wide text-white bg-gradient-to-r from-pink-500 to-indigo-500 shadow-md flex items-center gap-2"
              onClick={() => setMobileNavOpen(false)}
            >
              <Upload className="w-4 h-4" /> Upload
            </Link>
            <Link
              to="/about"
              className="px-3 py-2 rounded-full font-bold tracking-wide text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md flex items-center gap-2"
              onClick={() => setMobileNavOpen(false)}
            >
              About
            </Link>
          </nav>
        )}
      </header>
      {/* Wavy SVG Divider */}
      <div className="w-full overflow-hidden -mt-1">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-6 sm:h-8"
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
