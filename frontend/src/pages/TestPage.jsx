import React from "react";

const TestPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Test Page Working! ✅
        </h1>
        <p className="text-gray-300 mb-4">
          If you can see this, React and routing are working correctly.
        </p>
        <div className="space-y-2">
          <a
            href="/admin/login"
            className="block text-blue-400 hover:text-blue-300"
          >
            Go to Admin Login
          </a>
          <a href="/" className="block text-blue-400 hover:text-blue-300">
            Go to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
