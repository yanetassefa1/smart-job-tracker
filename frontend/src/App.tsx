import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import JobsPage from "./pages/JobsPage";
import NewJobPage from "./pages/NewJobPage";
import JobDetailPage from "./pages/JobDetailPage";

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}
            />
            <Route
              path="/jobs"
              element={<ProtectedRoute><JobsPage /></ProtectedRoute>}
            />
            <Route
              path="/jobs/new"
              element={<ProtectedRoute><NewJobPage /></ProtectedRoute>}
            />
            <Route
              path="/jobs/:id"
              element={<ProtectedRoute><JobDetailPage /></ProtectedRoute>}
            />
          </Routes>
        </main>
        <footer className="border-t border-ink-700 text-center text-xs font-mono text-gray-600 py-5">
          jobtracker · built with React & Django
        </footer>
      </div>
    </AuthProvider>
  );
}
