import { useQuery, useMutation, useQueryClient } from "react-query";
import api from "../utils/api";
import { JobApplication, JobStats, JobStatus } from "../utils/types";

export function useJobs(status?: JobStatus, search?: string) {
  return useQuery<JobApplication[]>(
    ["jobs", status, search],
    async () => {
      const params: Record<string, string> = {};
      if (status) params.status = status;
      if (search) params.search = search;
      const { data } = await api.get("/api/jobs/", { params });
      return data;
    },
    { keepPreviousData: true }
  );
}

export function useJob(id: number) {
  return useQuery<JobApplication>(["job", id], async () => {
    const { data } = await api.get(`/api/jobs/${id}/`);
    return data;
  });
}

export function useJobStats() {
  return useQuery<JobStats>("job-stats", async () => {
    const { data } = await api.get("/api/jobs/stats/");
    return data;
  });
}

export function useCreateJob() {
  const qc = useQueryClient();
  return useMutation(
    (payload: Partial<JobApplication>) => api.post("/api/jobs/", payload),
    {
      onSuccess: () => {
        qc.invalidateQueries("jobs");
        qc.invalidateQueries("job-stats");
      },
    }
  );
}

export function useUpdateJob() {
  const qc = useQueryClient();
  return useMutation(
    ({ id, ...payload }: Partial<JobApplication> & { id: number }) =>
      api.patch(`/api/jobs/${id}/`, payload),
    {
      onSuccess: () => {
        qc.invalidateQueries("jobs");
        qc.invalidateQueries("job-stats");
      },
    }
  );
}

export function useDeleteJob() {
  const qc = useQueryClient();
  return useMutation(
    (id: number) => api.delete(`/api/jobs/${id}/`),
    {
      onSuccess: () => {
        qc.invalidateQueries("jobs");
        qc.invalidateQueries("job-stats");
      },
    }
  );
}
