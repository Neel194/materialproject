import React from "react";
import TechStack from "../components/TechStack";
import Charts from "../components/Charts";

const StatsPage = () => {
  return (
    <div className="pt-[85px] bg-gradient-to-b from-gray-900 to-black min-h-screen">
      {/* Hero Section for Stats */}
      <section className="py-20 bg-gradient-to-b from-indigo-900 via-purple-900 to-gray-900 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Platform{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Analytics
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Real-time insights into our educational platform's performance and
            the cutting-edge technologies that power it.
          </p>

          {/* Quick stats preview */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
              <div className="text-2xl font-bold text-white">1,250+</div>
              <div className="text-gray-400 text-sm">Active Users</div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
              <div className="text-2xl font-bold text-white">5,000+</div>
              <div className="text-gray-400 text-sm">Materials</div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
              <div className="text-2xl font-bold text-white">850+</div>
              <div className="text-gray-400 text-sm">Downloads</div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
              <div className="text-2xl font-bold text-white">99.9%</div>
              <div className="text-gray-400 text-sm">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Charts Dashboard */}
      <Charts />

      {/* Tech Stack */}
      <TechStack />

      {/* Additional Info Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Why Choose Our Platform?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Built with modern technologies and best practices for the ultimate
              user experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-5xl mb-6">🚀</div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Lightning Fast
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Optimized for speed with modern web technologies, CDN, and
                  efficient caching strategies
                </p>
              </div>
            </div>

            <div className="group bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-5xl mb-6">🔒</div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Enterprise Security
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Enterprise-grade security with 99.9% uptime, SSL encryption,
                  and secure data handling
                </p>
              </div>
            </div>

            <div className="group bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-5xl mb-6">📱</div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Mobile First
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Responsive design that works seamlessly across all devices and
                  screen sizes
                </p>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-gray-400 mb-6">
                Join thousands of students who are already using our platform to
                access quality educational materials.
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-200 shadow-lg">
                Explore Materials
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StatsPage;
