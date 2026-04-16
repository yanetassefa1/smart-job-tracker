import { useParams, useNavigate } from "react-router-dom";
import { useJob, useUpdateJob } from "../hooks/useJobs";
import JobForm from "../components/JobForm";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { STATUS_COLORS, STATUS_LABELS } from "../utils/status";
import { format } from "date-fns";

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: job, isLoading } = useJob(Number(id));
  const updateJob = useUpdateJob();

  const handleSubmit = async (data: object) => {
    await updateJob.mutateAsync({ id: Number(id), ...data });
    navigate("/jobs");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-32">
        <div className="w-6 h-6 border-2 border-lime-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!job) return <div className="p-8 text-center text-gray-500">Application not found.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-lime-400 mb-8 transition-colors"
      >
        <ArrowLeft size={15} /> Back
      </button>

      {/* Job header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{job.role}</h1>
          <p className="text-gray-400 mt-1">{job.company}</p>
          <div className="flex items-center gap-3 mt-3 text-xs font-mono text-gray-500">
            <span>Updated {format(new Date(job.updated_at), "MMM d, yyyy")}</span>
            {job.job_url && (
              <a
                href={job.job_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-lime-400 hover:underline"
              >
                <ExternalLink size={12} /> View job posting
              </a>
            )}
          </div>
        </div>
        <span className={`badge ${STATUS_COLORS[job.status]}`}>
          {STATUS_LABELS[job.status]}
        </span>
      </div>

      <JobForm
        initial={job}
        onSubmit={handleSubmit}
        loading={updateJob.isLoading}
        submitLabel="Save Changes"
      />
    </div>
  );
}
