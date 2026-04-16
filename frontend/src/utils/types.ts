export interface User {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  created_at: string;
}

export type JobStatus =
  | "wishlist"
  | "applied"
  | "screening"
  | "interview"
  | "offer"
  | "rejected"
  | "withdrawn";

export type WorkType = "remote" | "hybrid" | "onsite";

export interface JobApplication {
  id: number;
  user: number;
  company: string;
  role: string;
  status: JobStatus;
  work_type: WorkType;
  location: string;
  job_url: string;
  salary_min: number | null;
  salary_max: number | null;
  applied_date: string | null;
  follow_up_date: string | null;
  notes: string;
  contact_name: string;
  contact_email: string;
  created_at: string;
  updated_at: string;
}

export interface JobStats {
  total: number;
  applied: number;
  screening: number;
  interview: number;
  offer: number;
  rejected: number;
  wishlist: number;
  withdrawn: number;
  response_rate: number;
}
