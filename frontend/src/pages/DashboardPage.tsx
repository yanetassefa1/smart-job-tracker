import { Link } from "react-router-dom";
import { useJobStats, useJobs } from "../hooks/useJobs";
import { useAuth } from "../hooks/useAuth";
import StatCard from "../components/StatCard";
import JobCard from "../components/JobCard";
import { Plus, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: stats, isLoading: statsLoading } = useJobStats();
  const { data: recentJobs } = useJobs();

  const recent = recentJobs?.slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-sm text-gray-500 font-mono mb-1">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
          <h1 className="text-3xl font-bold text-white">
            Hey, {user?.first_name || "there"} 👋
          </h1>
        </div>
        <Link to="/jobs/new" className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Add Application
        </Link>
      </div>

      {/* Stats grid */}
      {statsLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-lime-400 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : stats ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <StatCard label="Total Applied" value={stats.total} />
            <StatCard label="Interviews" value={stats.interview} accent />
            <StatCard label="Offers" value={stats.offer} accent />
            <StatCard
              label="Response Rate"
              value={`${stats.response_rate}%`}
              accent={stats.response_rate > 0}
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            <StatCard label="Screening" value={stats.screening} />
            <StatCard label="Rejected" value={stats.rejected} />
            <StatCard label="Wishlist" value={stats.wishlist} />
            <StatCard label="Withdrawn" value={stats.withdrawn} />
          </div>
        </>
      ) : null}

      {/* Pipeline bar */}
      {stats && stats.total > 0 && (
        <div className="card mb-10">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-lime-400" />
            <span className="text-sm font-semibold text-gray-300 uppercase tracking-widest">Pipeline</span>
          </div>
          <div className="flex rounded-full overflow-hidden h-3 gap-px">
            {[
              { key: "applied", color: "bg-blue-500" },
              { key: "screening", color: "bg-yellow-500" },
              { key: "interview", color: "bg-purple-500" },
              { key: "offer", color: "bg-lime-400" },
              { key: "rejected", color: "bg-red-500" },
            ].map(({ key, color }) => {
              const val = stats[key as keyof typeof stats] as number;
              const pct = stats.total > 0 ? (val / stats.total) * 100 : 0;
              return pct > 0 ? (
                <div
                  key={key}
                  className={`${color} transition-all`}
                  style={{ width: `${pct}%` }}
                  title={`${key}: ${val}`}
                />
              ) : null;
            })}
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-xs text-gray-500 font-mono">
            {[
              { label: "Applied", color: "bg-blue-500" },
              { label: "Screening", color: "bg-yellow-500" },
              { label: "Interview", color: "bg-purple-500" },
              { label: "Offer", color: "bg-lime-400" },
              { label: "Rejected", color: "bg-red-500" },
            ].map(({ label, color }) => (
              <span key={label} className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${color}`} />
                {label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recent applications */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-white">Recent Applications</h2>
          <Link to="/jobs" className="text-sm text-lime-400 hover:underline font-mono">
            View all →
          </Link>
        </div>

        {recent && recent.length === 0 && (
          <div className="card text-center py-16 flex flex-col items-center gap-4">
            <p className="text-gray-500">No applications yet.</p>
            <Link to="/jobs/new" className="btn-primary">
              Add your first application
            </Link>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          {recent?.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}
