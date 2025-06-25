import { useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config/config";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${config.api.baseURL}/admin/login`, {
        password,
      });
      setToken(response.data.token);
      localStorage.setItem("adminToken", response.data.token);

      // Redirect to admin panel after successful login
      setTimeout(() => {
        navigate("/admin");
      }, 1500);
    } catch (err) {
      console.error("Login error:", err);
      if (err.response?.status === 401) {
        setError("Invalid password. Please try again.");
      } else if (err.response?.status === 500) {
        setError("Server error. Please check if backend is running.");
      } else if (err.code === "ERR_NETWORK") {
        setError(
          "Cannot connect to server. Please check if backend is running on port 5000."
        );
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-lg border border-white/20"
      >
        <div className="text-center mb-6">
          <div className="flex justify-center">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 shadow-lg mb-2">
              <Lock className="w-8 h-8 text-white" />
            </span>
          </div>
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
            Admin Login
          </h2>
          <p className="mt-2 text-sm text-gray-200">
            Enter your admin password to access the dashboard
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 rounded-lg border border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-gray-900/80 text-gray-100 placeholder-gray-400 transition"
              placeholder="Enter admin password"
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm text-center p-3 bg-red-900/20 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          {token && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-green-900/30 rounded-md text-center"
            >
              <p className="text-sm text-green-300">
                Login successful! Redirecting to admin panel...
              </p>
              <p className="mt-2 text-xs text-green-400">
                Your admin token has been saved. You can now access admin
                features.
              </p>
            </motion.div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 rounded-lg shadow font-semibold text-white bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? (
                <span className="flex items-center gap-2 justify-center">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
