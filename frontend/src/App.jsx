import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SyllabusPage from "./Pages/SyllabusPage";
import PYQPage from "./Pages/PYQPage";
import MaterialPage from "./Pages/MaterialPage";
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
