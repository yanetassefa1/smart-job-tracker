import { useNavigate } from "react-router-dom";
import { useCreateJob } from "../hooks/useJobs";
import JobForm from "../components/JobForm";
import { ArrowLeft } from "lucide-react";

export default function NewJobPage() {
  const navigate = useNavigate();
  const createJob = useCreateJob();

  const handleSubmit = async (data: object) => {
    await createJob.mutateAsync(data);
    navigate("/jobs");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-lime-400 mb-8 transition-colors"
      >
        <ArrowLeft size={15} /> Back
      </button>
      <h1 className="text-3xl font-bold text-white mb-8">Add Application</h1>
      <JobForm
        onSubmit={handleSubmit}
        loading={createJob.isLoading}
        submitLabel="Add Application"
      />
    </div>
  );
}
