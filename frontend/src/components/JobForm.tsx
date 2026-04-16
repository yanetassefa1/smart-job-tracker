import { useState } from "react";
import { JobApplication, JobStatus, WorkType } from "../utils/types";
import { ALL_STATUSES, STATUS_LABELS } from "../utils/status";

type FormData = Partial<JobApplication>;

interface Props {
  initial?: FormData;
  onSubmit: (data: FormData) => Promise<void>;
  loading: boolean;
  submitLabel?: string;
}

const WORK_TYPES: WorkType[] = ["remote", "hybrid", "onsite"];

export default function JobForm({ initial = {}, onSubmit, loading, submitLabel = "Save" }: Props) {
  const [form, setForm] = useState<FormData>({
    company: "",
    role: "",
    status: "applied",
    work_type: "hybrid",
    location: "",
    job_url: "",
    salary_min: undefined,
    salary_max: undefined,
    applied_date: "",
    follow_up_date: "",
    notes: "",
    contact_name: "",
    contact_email: "",
    ...initial,
  });

  const set = (field: keyof FormData, value: string | number | null) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Core info */}
      <div className="card flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-widest">Position</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Company *</label>
            <input
              className="input"
              value={form.company || ""}
              onChange={(e) => set("company", e.target.value)}
              placeholder="e.g. Stripe"
              required
            />
          </div>
          <div>
            <label className="label">Role *</label>
            <input
              className="input"
              value={form.role || ""}
              onChange={(e) => set("role", e.target.value)}
              placeholder="e.g. Software Engineer"
              required
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="label">Status</label>
            <select
              className="input"
              value={form.status || "applied"}
              onChange={(e) => set("status", e.target.value as JobStatus)}
            >
              {ALL_STATUSES.map((s) => (
                <option key={s} value={s}>{STATUS_LABELS[s]}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Work Type</label>
            <select
              className="input"
              value={form.work_type || "hybrid"}
              onChange={(e) => set("work_type", e.target.value as WorkType)}
            >
              {WORK_TYPES.map((t) => (
                <option key={t} value={t} className="capitalize">{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Location</label>
            <input
              className="input"
              value={form.location || ""}
              onChange={(e) => set("location", e.target.value)}
              placeholder="e.g. New York, NY"
            />
          </div>
        </div>
        <div>
          <label className="label">Job URL</label>
          <input
            type="url"
            className="input"
            value={form.job_url || ""}
            onChange={(e) => set("job_url", e.target.value)}
            placeholder="https://..."
          />
        </div>
      </div>

      {/* Salary & Dates */}
      <div className="card flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-widest">Salary & Dates</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Salary Min ($)</label>
            <input
              type="number"
              className="input"
              value={form.salary_min || ""}
              onChange={(e) => set("salary_min", e.target.value ? Number(e.target.value) : null)}
              placeholder="80000"
            />
          </div>
          <div>
            <label className="label">Salary Max ($)</label>
            <input
              type="number"
              className="input"
              value={form.salary_max || ""}
              onChange={(e) => set("salary_max", e.target.value ? Number(e.target.value) : null)}
              placeholder="120000"
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Applied Date</label>
            <input
              type="date"
              className="input"
              value={form.applied_date || ""}
              onChange={(e) => set("applied_date", e.target.value)}
            />
          </div>
          <div>
            <label className="label">Follow-up Date</label>
            <input
              type="date"
              className="input"
              value={form.follow_up_date || ""}
              onChange={(e) => set("follow_up_date", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Contact & Notes */}
      <div className="card flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-widest">Contact & Notes</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Contact Name</label>
            <input
              className="input"
              value={form.contact_name || ""}
              onChange={(e) => set("contact_name", e.target.value)}
              placeholder="Recruiter name"
            />
          </div>
          <div>
            <label className="label">Contact Email</label>
            <input
              type="email"
              className="input"
              value={form.contact_email || ""}
              onChange={(e) => set("contact_email", e.target.value)}
              placeholder="recruiter@company.com"
            />
          </div>
        </div>
        <div>
          <label className="label">Notes</label>
          <textarea
            className="input resize-none"
            rows={4}
            value={form.notes || ""}
            onChange={(e) => set("notes", e.target.value)}
            placeholder="Interview notes, follow-up reminders, anything..."
          />
        </div>
      </div>

      <button type="submit" className="btn-primary self-start px-8" disabled={loading}>
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
