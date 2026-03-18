import { useState, type FormEvent } from "react";
import type { Job } from "../../types/job";

interface JobsSectionProps {
  jobs: Job[];
  saving: boolean;
  onSubmit: (
    id: string | null,
    data: Omit<Job, "_id" | "createdAt">,
  ) => Promise<void>;
  onDelete: (id: string) => void;
}

const emptyJob = {
  title: "",
  department: "",
  location: "",
  description: "",
  requirements: [] as string[],
};

const DEPARTMENT_OPTIONS = [
  "Engineering",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Operations",
  "Human Resources",
  "Finance",
  "Customer Support",
  "Research & Development",
  "Infrastructure",
];

const LOCATION_OPTIONS = ["Remote", "Hybrid", "Remote / Hybrid", "On-site"];

const CUSTOM_LOCATION = "__custom__";

const parseLineList = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

export const JobsSection = ({
  jobs,
  saving,
  onSubmit,
  onDelete,
}: JobsSectionProps) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyJob);
  const [requirementLines, setRequirementLines] = useState("");
  const [locationSelect, setLocationSelect] = useState("");
  const [customLocation, setCustomLocation] = useState("");

  const openNew = () => {
    setForm(emptyJob);
    setRequirementLines("");
    setLocationSelect("");
    setCustomLocation("");
    setEditingId(null);
    setShowForm(true);
    setConfirmDeleteId(null);
  };

  const openEdit = (job: Job) => {
    const isPreset = LOCATION_OPTIONS.includes(job.location);
    setForm({
      title: job.title,
      department: job.department,
      location: job.location,
      description: job.description,
      requirements: [...job.requirements],
    });
    setRequirementLines(job.requirements.join("\n"));
    setLocationSelect(isPreset ? job.location : CUSTOM_LOCATION);
    setCustomLocation(isPreset ? "" : job.location);
    setEditingId(job._id);
    setShowForm(true);
    setConfirmDeleteId(null);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyJob);
    setRequirementLines("");
    setLocationSelect("");
    setCustomLocation("");
  };

  const handleLocationSelect = (value: string) => {
    setLocationSelect(value);
    if (value !== CUSTOM_LOCATION) {
      setForm((prev) => ({ ...prev, location: value }));
      setCustomLocation("");
    } else {
      setForm((prev) => ({ ...prev, location: "" }));
    }
  };

  const handleCustomLocation = (value: string) => {
    setCustomLocation(value);
    setForm((prev) => ({ ...prev, location: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await onSubmit(editingId, {
        ...form,
        requirements: parseLineList(requirementLines),
      });
      closeForm();
    } catch {
      // Error handled upstream
    }
  };

  const handleDeleteClick = (id: string) => {
    if (confirmDeleteId === id) {
      onDelete(id);
      setConfirmDeleteId(null);
    } else {
      setConfirmDeleteId(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Section header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Jobs</h1>
          <p className="mt-1 text-sm text-slate-500">
            {jobs.length} open position{jobs.length !== 1 ? "s" : ""} on the
            careers page
          </p>
        </div>
        {!showForm && (
          <button
            type="button"
            onClick={openNew}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            + Post job
          </button>
        )}
      </div>

      {/* ── Inline form panel ── */}
      {showForm && (
        <div className="rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-md">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">
              {editingId ? "Edit job posting" : "New job posting"}
            </h2>
            <button
              type="button"
              onClick={closeForm}
              className="rounded-lg px-2 py-1 text-sm text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              ✕ Cancel
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">
                Job title <span className="text-red-500">*</span>
              </span>
              <input
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                placeholder="e.g., Senior Full-Stack Developer"
                required
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">
                  Department <span className="text-red-500">*</span>
                </span>
                <select
                  value={form.department}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, department: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                  required
                >
                  <option value="">Select department…</option>
                  {DEPARTMENT_OPTIONS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </label>

              <div>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">
                    Location <span className="text-red-500">*</span>
                  </span>
                  <select
                    value={locationSelect}
                    onChange={(e) => handleLocationSelect(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                    required={locationSelect !== CUSTOM_LOCATION}
                  >
                    <option value="">Select a location…</option>
                    {LOCATION_OPTIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                    <option value={CUSTOM_LOCATION}>Other / custom…</option>
                  </select>
                </label>
                {locationSelect === CUSTOM_LOCATION && (
                  <input
                    value={customLocation}
                    onChange={(e) => handleCustomLocation(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                    placeholder="Type a custom location…"
                    required
                    autoFocus
                  />
                )}
              </div>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">
                Description <span className="text-red-500">*</span>
              </span>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
                className="min-h-24 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                placeholder="Describe the role, responsibilities, and what makes this position unique…"
                required
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">
                Requirements{" "}
                <span className="font-normal text-slate-400">
                  (one per line)
                </span>
              </span>
              <textarea
                value={requirementLines}
                onChange={(e) => setRequirementLines(e.target.value)}
                className="min-h-32 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                placeholder={
                  "5+ years of React experience\nStrong TypeScript skills\nExperience with Node.js"
                }
              />
              {requirementLines && (
                <p className="mt-1 text-xs text-slate-400">
                  {parseLineList(requirementLines).length} requirement
                  {parseLineList(requirementLines).length !== 1 ? "s" : ""}
                </p>
              )}
            </label>

            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50"
              >
                {saving ? "Saving…" : editingId ? "Save changes" : "Post job"}
              </button>
              <button
                type="button"
                onClick={closeForm}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Jobs list ── */}
      {jobs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 py-16 text-center">
          <p className="mb-3 text-sm text-slate-400">No job postings yet.</p>
          {!showForm && (
            <button
              type="button"
              onClick={openNew}
              className="text-sm font-medium text-slate-600 underline underline-offset-2 hover:text-slate-900"
            >
              Post your first job
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {jobs.map((job, idx) => {
            const isExpanded = expandedId === job._id;
            return (
              <div
                key={job._id}
                className={`transition ${
                  idx !== jobs.length - 1 ? "border-b border-slate-100" : ""
                } ${editingId === job._id ? "bg-slate-50" : ""}`}
              >
                <div className="flex items-start justify-between gap-4 p-5">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-slate-900">
                        {job.title}
                      </p>
                      <span className="rounded-full border border-slate-200 px-2 py-0.5 text-xs text-slate-500">
                        {job.department}
                      </span>
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-500">
                        {job.location}
                      </span>
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">
                      {job.description}
                    </p>

                    {job.requirements.length > 0 && (
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedId(isExpanded ? null : job._id)
                        }
                        className="mt-2 text-xs text-slate-400 hover:text-slate-700"
                      >
                        {isExpanded
                          ? "Hide requirements ↑"
                          : `${job.requirements.length} requirement${job.requirements.length !== 1 ? "s" : ""} ↓`}
                      </button>
                    )}

                    {isExpanded && job.requirements.length > 0 && (
                      <ul className="mt-3 space-y-1 rounded-xl border border-slate-100 bg-slate-50 p-3">
                        {job.requirements.map((req, i) => (
                          <li
                            key={i}
                            className="flex gap-2 text-sm text-slate-600"
                          >
                            <span className="mt-0.5 text-slate-400">·</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEdit(job)}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-900 hover:bg-slate-50"
                    >
                      Edit
                    </button>
                    {confirmDeleteId === job._id ? (
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(job._id)}
                          className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(null)}
                          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
                        >
                          Keep
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(job._id)}
                        className="rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-red-500 transition hover:border-red-300 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
