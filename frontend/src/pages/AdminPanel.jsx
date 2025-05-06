import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, FileText, Loader2 } from "lucide-react";
import axios from "axios";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

// Helper to download JSON
function downloadJSON(obj, filename) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const AdminPanel = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState("");
  const [success, setSuccess] = useState("");

  const fetchMaterials = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(
        "http://localhost:5000/api/admin/materials?status=pending",
        {
          headers: { "x-admin-token": token },
        }
      );
      setMaterials(res.data);
    } catch (err) {
      setError("Failed to fetch materials. Check your admin token or server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
    // eslint-disable-next-line
  }, []);

  const handleAction = async (id, action) => {
    setActionLoading(id + action);
    setSuccess("");
    setError("");
    try {
      const token = localStorage.getItem("adminToken");
      const url = `http://localhost:5000/api/admin/materials/${id}/${action}`;
      await axios.post(url, {}, { headers: { "x-admin-token": token } });
      setSuccess(`Material ${action}d successfully!`);
      setMaterials((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      setError(`Failed to ${action} material.`);
    } finally {
      setActionLoading("");
    }
  };

  const handleGenerateJSON = (mat) => {
    let json = {};
    let filename = "";
    if (mat.contentType === "material") {
      json = {
        year: mat.year,
        branch: mat.branch,
        subject: mat.subject,
        materialType: mat.materialType || "Notes",
        name: mat.title,
        description: mat.description,
        author: mat.author || "Unknown",
        previewLink: mat.fileUrl || "#",
        downloadLink: mat.fileUrl || "#",
      };
      filename = `newMaterial.json`;
    } else if (mat.contentType === "syllabus") {
      json = {
        year: mat.year,
        branch: mat.branch,
        subject: mat.subject,
        description: mat.description,
        units: mat.units || [],
        previewLink: mat.fileUrl || "#",
        downloadLink: mat.fileUrl || "#",
      };
      filename = `newSyllabus.json`;
    } else if (mat.contentType === "pyq") {
      json = {
        year: mat.year,
        branch: mat.branch,
        subject: mat.subject,
        session: mat.session || "",
        pyqYear: mat.pyqYear || "",
        name: mat.title,
        description: mat.description,
        author: mat.author || "Unknown",
        previewLink: mat.fileUrl || "#",
        downloadLink: mat.fileUrl || "#",
      };
      filename = `newPyq.json`;
    }
    downloadJSON(json, filename);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-gray-900 to-gray-800 pt-20 px-2 md:px-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent"
      >
        Admin Panel - Pending Uploads
      </motion.h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin w-10 h-10 text-indigo-500" />
        </div>
      ) : error ? (
        <div className="text-center text-red-600 font-medium">{error}</div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {materials.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 text-lg">
              No pending uploads.
            </div>
          ) : (
            materials.map((mat) => (
              <motion.div
                key={mat._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900/80 rounded-xl shadow-lg p-6 flex flex-col gap-3 border border-gray-700 hover:shadow-2xl transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-6 h-6 text-indigo-500" />
                  <span className="font-semibold text-lg text-white">
                    {mat.title}
                  </span>
                  <span
                    className={`ml-auto px-2 py-1 rounded text-xs font-bold ${
                      statusColors[mat.status]
                    }`}
                  >
                    {mat.status}
                  </span>
                </div>
                <div className="text-sm text-gray-300 mb-1">
                  <span className="font-medium">Type:</span> {mat.contentType}
                </div>
                <div className="text-sm text-gray-300 mb-1">
                  <span className="font-medium">Subject:</span> {mat.subject}
                </div>
                <div className="text-sm text-gray-300 mb-1">
                  <span className="font-medium">Description:</span>{" "}
                  {mat.description}
                </div>
                <div className="text-sm text-gray-300 mb-1">
                  <span className="font-medium">Uploaded:</span>{" "}
                  {new Date(mat.uploadedAt).toLocaleString()}
                </div>
                <a
                  href={`http://localhost:5000${mat.fileUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-indigo-600 hover:underline text-sm font-medium"
                >
                  View File
                </a>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleAction(mat._id, "approve")}
                    disabled={actionLoading === mat._id + "approve"}
                    className="flex-1 flex items-center justify-center gap-1 py-2 px-4 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {actionLoading === mat._id + "approve" ? (
                      <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(mat._id, "reject")}
                    disabled={actionLoading === mat._id + "reject"}
                    className="flex-1 flex items-center justify-center gap-1 py-2 px-4 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {actionLoading === mat._id + "reject" ? (
                      <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                    Reject
                  </button>
                  <button
                    onClick={() => handleGenerateJSON(mat)}
                    className="flex-1 flex items-center justify-center gap-1 py-2 px-4 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                  >
                    Generate JSON
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-100 text-green-800 px-6 py-3 rounded shadow-lg z-50"
        >
          {success}
        </motion.div>
      )}
      {error && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-100 text-red-800 px-6 py-3 rounded shadow-lg z-50"
        >
          {error}
        </motion.div>
      )}
    </div>
  );
};

export default AdminPanel;
