import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LiveStats from "../components/LiveStats";
import TechStack from "../components/TechStack";

const StatsPage = () => {
  return (
    <>
      <Header />
      <div className="pt-[85px]">
        <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen">
          {/* Hero Section for Stats */}
          <section className="py-20 bg-gradient-to-b from-indigo-900 to-gray-900">
            <div className="container mx-auto px-6 text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Platform{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Analytics
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Real-time insights into our educational platform's performance
                and the technologies that power it.
              </p>
            </div>
          </section>

          {/* Live Stats */}
          <LiveStats />

          {/* Tech Stack */}
          <TechStack />

          {/* Additional Info Section */}
          <section className="py-16 bg-gradient-to-b from-black to-gray-900">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Why Choose Our Platform?
                </h2>
                <p className="text-gray-400 text-lg">
                  Built with modern technologies for the best user experience
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-center">
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Fast Performance
                  </h3>
                  <p className="text-gray-400">
                    Optimized for speed with modern web technologies
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-center">
                  <div className="text-4xl mb-4">🔒</div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Secure & Reliable
                  </h3>
                  <p className="text-gray-400">
                    Enterprise-grade security and 99.9% uptime
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-center">
                  <div className="text-4xl mb-4">📱</div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Mobile First
                  </h3>
                  <p className="text-gray-400">
                    Responsive design that works on all devices
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StatsPage;
