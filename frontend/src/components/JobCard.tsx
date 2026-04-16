import { Link } from "react-router-dom";
import { ExternalLink, MapPin, DollarSign, Calendar, Trash2 } from "lucide-react";
import { JobApplication } from "../utils/types";
import { STATUS_COLORS, STATUS_LABELS } from "../utils/status";
import { useDeleteJob } from "../hooks/useJobs";
import { format } from "date-fns";

interface Props {
  job: JobApplication;
}

export default function JobCard({ job }: Props) {
  const deleteJob = useDeleteJob();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm(`Delete application for ${job.role} at ${job.company}?`)) {
      deleteJob.mutate(job.id);
    }
  };

  return (
    <Link to={`/jobs/${job.id}`} className="card block hover:border-ink-500 transition-colors group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-semibold text-white group-hover:text-lime-400 transition-colors">
            {job.role}
          </h3>
          <p className="text-sm text-gray-400 mt-0.5">{job.company}</p>
        </div>
        <span className={`badge shrink-0 ${STATUS_COLORS[job.status]}`}>
          {STATUS_LABELS[job.status]}
        </span>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-500 mb-4">
        {job.location && (
          <span className="flex items-center gap-1">
            <MapPin size={11} /> {job.location}
          </span>
        )}
        {(job.salary_min || job.salary_max) && (
          <span className="flex items-center gap-1">
            <DollarSign size={11} />
            {job.salary_min && `$${job.salary_min.toLocaleString()}`}
            {job.salary_min && job.salary_max && " – "}
            {job.salary_max && `$${job.salary_max.toLocaleString()}`}
          </span>
        )}
        {job.applied_date && (
          <span className="flex items-center gap-1">
            <Calendar size={11} /> Applied {format(new Date(job.applied_date), "MMM d, yyyy")}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-gray-600 capitalize">{job.work_type}</span>
        <div className="flex items-center gap-3">
          {job.job_url && (
            <a
              href={job.job_url}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-gray-500 hover:text-lime-400 transition-colors"
            >
              <ExternalLink size={14} />
            </a>
          )}
          <button
            onClick={handleDelete}
            className="text-gray-600 hover:text-red-400 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </Link>
  );
}
