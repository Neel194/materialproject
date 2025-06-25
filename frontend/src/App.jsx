import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SyllabusPage from "./pages/SyllabusPage";
import PYQPage from "./pages/PYQPage";
import MaterialPage from "./pages/MaterialPage";
import ContentUpload from "./pages/ContentUpload";
import AboutPage from "./pages/AboutPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./pages/AdminLogin";
import TestPage from "./pages/TestPage";
import DemoMode from "./components/DemoMode";

// Simple test component for debugging
const SimpleAdminTest = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Admin Test Page</h1>
        <p className="text-xl">If you can see this, routing is working!</p>
        <div className="mt-8 space-y-4">
          <a href="/admin" className="block text-blue-400 hover:text-blue-300">
            Go to Full Admin Panel
          </a>
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

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/admin-test" element={<SimpleAdminTest />} />
          <Route path="/syllabus" element={<SyllabusPage />} />
          <Route path="/pyq" element={<PYQPage />} />
          <Route path="/material" element={<MaterialPage />} />
          <Route path="/upload" element={<ContentUpload />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </main>
      <Footer />
      <DemoMode />
    </div>
  );
};

export default App;
