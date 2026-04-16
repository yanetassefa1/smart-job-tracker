import { JobStatus } from "./types";

export const STATUS_LABELS: Record<JobStatus, string> = {
  wishlist: "Wishlist",
  applied: "Applied",
  screening: "Screening",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
};

export const STATUS_COLORS: Record<JobStatus, string> = {
  wishlist: "bg-gray-700 text-gray-300",
  applied: "bg-blue-900 text-blue-300",
  screening: "bg-yellow-900 text-yellow-300",
  interview: "bg-purple-900 text-purple-300",
  offer: "bg-lime-900 text-lime-400",
  rejected: "bg-red-900 text-red-400",
  withdrawn: "bg-gray-800 text-gray-500",
};

export const ALL_STATUSES: JobStatus[] = [
  "wishlist",
  "applied",
  "screening",
  "interview",
  "offer",
  "rejected",
  "withdrawn",
];
