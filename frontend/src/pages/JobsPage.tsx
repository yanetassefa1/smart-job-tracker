import { useState } from "react";
import { Link } from "react-router-dom";
import { useJobs } from "../hooks/useJobs";
import JobCard from "../components/JobCard";
import { Plus, Search } from "lucide-react";
import { ALL_STATUSES, STATUS_LABELS } from "../utils/status";
import { JobStatus } from "../utils/types";

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<JobStatus | "">("");
  const { data: jobs, isLoading } = useJobs(statusFilter || undefined, search);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Applications</h1>
        <Link to="/jobs/new" className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Add New
        </Link>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            className="input pl-10"
            placeholder="Search company or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="input sm:w-44"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as JobStatus | "")}
        >
          <option value="">All statuses</option>
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
          ))}
        </select>
      </div>

      {/* Results count */}
      {jobs && (
        <p className="text-xs font-mono text-gray-500 mb-5">
          {jobs.length} application{jobs.length !== 1 ? "s" : ""}
          {statusFilter ? ` · ${STATUS_LABELS[statusFilter]}` : ""}
        </p>
      )}

      {isLoading && (
        <div className="flex justify-center py-16">
          <div className="w-6 h-6 border-2 border-lime-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {jobs && jobs.length === 0 && (
        <div className="card text-center py-16 flex flex-col items-center gap-4">
          <p className="text-gray-500">No applications found.</p>
          <Link to="/jobs/new" className="btn-primary">Add Application</Link>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs?.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
