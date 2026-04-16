import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Briefcase, LayoutDashboard, LogOut, User } from "lucide-react";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path: string) =>
    location.pathname === path ? "text-lime-400" : "text-gray-400 hover:text-white";

  return (
    <nav className="bg-ink-800 border-b border-ink-700 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <Link to="/" className="flex items-center gap-2 font-semibold text-white">
          <Briefcase size={18} className="text-lime-400" />
          <span className="font-mono text-sm tracking-tight">job<span className="text-lime-400">tracker</span></span>
        </Link>

        {isAuthenticated && (
          <div className="flex items-center gap-6 text-sm">
            <Link to="/dashboard" className={`flex items-center gap-1.5 transition-colors ${isActive("/dashboard")}`}>
              <LayoutDashboard size={15} />
              Dashboard
            </Link>
            <Link to="/jobs" className={`flex items-center gap-1.5 transition-colors ${isActive("/jobs")}`}>
              <Briefcase size={15} />
              Applications
            </Link>
          </div>
        )}

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="text-gray-400 hover:text-lime-400 transition-colors">
                <User size={17} />
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-red-400 transition-colors"
                title="Logout"
              >
                <LogOut size={17} />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="btn-ghost text-sm py-1.5 px-4">Login</Link>
              <Link to="/register" className="btn-primary text-sm py-1.5 px-4">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
