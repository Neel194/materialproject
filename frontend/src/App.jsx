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

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
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
    </div>
  );
};

export default App;
