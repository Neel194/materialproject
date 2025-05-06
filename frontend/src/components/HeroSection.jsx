import { useState, useEffect } from "react";
import { BackgroundBeams } from "./ui/background-beams";

const HeroSection = () => {
  // Smooth scroll handler
  const handleGetStarted = () => {
    const el = document.getElementById("content-selector");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Typewriter animation for trusted text
  const trustedText = "Trusted by 5,000+ students";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(trustedText.slice(0, i + 1));
      i++;
      if (i === trustedText.length) clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-[80vh] sm:h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-black p-0 m-0">
      {/* Background Boxes */}
      <div className="absolute inset-0">
        <BackgroundBeams />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-3 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main Title */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg mb-4 tracking-tight animate-gradient">
            Welcome to <span className="text-white">Material Mining</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl font-medium text-white/90 leading-relaxed max-w-2xl mx-auto drop-shadow px-2">
            Your one-stop resource for{" "}
            <span className="inline-block px-2 py-1 sm:px-3 sm:py-1.5 bg-indigo-500/30 rounded-lg text-white font-semibold border border-indigo-200/30 shadow-md">
              educational materials
            </span>
          </p>

          {/* Quick Stat / Testimonial with typewriter animation */}
          <div className="mt-6 flex flex-col items-center justify-center">
            <span className="inline-flex items-center gap-2 text-base sm:text-lg font-semibold text-purple-300 bg-black/40 px-3 sm:px-4 py-2 rounded-full shadow-md">
              <span className="text-xl sm:text-2xl">⭐</span>
              <span className="font-mono" style={{ minWidth: 120 }}>
                {displayedText}
              </span>
            </span>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              className="px-5 py-2 sm:px-8 sm:py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-base sm:text-lg shadow-lg hover:scale-105 hover:shadow-indigo-500/40 transition-all duration-200 animate-pulse"
              onClick={handleGetStarted}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-16 sm:h-24 bg-gradient-to-t from-black to-transparent opacity-90 pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;
