import { useState, type FormEvent } from "react";
import type { Service } from "../../types/service";

interface ServicesSectionProps {
  services: Service[];
  saving: boolean;
  onSubmit: (id: string | null, data: Omit<Service, "_id">) => Promise<void>;
  onDelete: (id: string) => void;
}

const emptyService = { title: "", description: "", icon: "" };

// Lucide React icon names – must match what the frontend ServiceCard renders
const ICON_OPTIONS = [
  { value: "Globe", label: "Globe", hint: "Mobility / Global reach" },
  { value: "Smartphone", label: "Smartphone", hint: "Mobile apps / POS" },
  { value: "Code2", label: "Code2", hint: "Web & API development" },
  { value: "Palette", label: "Palette", hint: "UX / UI design" },
  { value: "Heart", label: "Heart", hint: "Branding / Care" },
  { value: "GitMerge", label: "GitMerge", hint: "System integration" },
  { value: "Monitor", label: "Monitor", hint: "Software / Desktop apps" },
  { value: "Database", label: "Database", hint: "Data & storage services" },
  { value: "Lock", label: "Lock", hint: "Security & compliance" },
  { value: "Cpu", label: "Cpu", hint: "AI / Machine learning" },
  { value: "BarChart2", label: "BarChart2", hint: "Analytics & reporting" },
  { value: "Briefcase", label: "Briefcase", hint: "Consulting & strategy" },
  { value: "Cloud", label: "Cloud", hint: "Cloud infrastructure" },
  { value: "Settings", label: "Settings", hint: "DevOps & automation" },
  { value: "Layers", label: "Layers", hint: "Enterprise platforms" },
  { value: "Zap", label: "Zap", hint: "Performance optimisation" },
];

export const ServicesSection = ({
  services,
  saving,
  onSubmit,
  onDelete,
}: ServicesSectionProps) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyService);

  const openNew = () => {
    setForm(emptyService);
    setEditingId(null);
    setShowForm(true);
    setConfirmDeleteId(null);
  };

  const openEdit = (service: Service) => {
    setForm({
      title: service.title,
      description: service.description,
      icon: service.icon,
    });
    setEditingId(service._id);
    setShowForm(true);
    setConfirmDeleteId(null);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyService);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await onSubmit(editingId, form);
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

  const selectedIconHint = ICON_OPTIONS.find(
    (o) => o.value === form.icon,
  )?.hint;

  return (
    <div className="space-y-6">
      {/* ── Section header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Services</h1>
          <p className="mt-1 text-sm text-slate-500">
            {services.length} service{services.length !== 1 ? "s" : ""}{" "}
            displayed on the website
          </p>
        </div>
        {!showForm && (
          <button
            type="button"
            onClick={openNew}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            + New service
          </button>
        )}
      </div>

      {/* ── Inline form panel ── */}
      {showForm && (
        <div className="rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-md">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">
              {editingId ? "Edit service" : "New service"}
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
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">
                  Title <span className="text-red-500">*</span>
                </span>
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                  placeholder="e.g., Web Development"
                  required
                />
              </label>

              <div>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">
                    Icon <span className="text-red-500">*</span>
                  </span>
                  <select
                    value={form.icon}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, icon: e.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                    required
                  >
                    <option value="">Select a Lucide icon…</option>
                    {ICON_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label} — {option.hint}
                      </option>
                    ))}
                  </select>
                </label>
                {selectedIconHint && (
                  <p className="mt-1 text-xs text-slate-400">
                    Use for: {selectedIconHint}
                  </p>
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
                placeholder="Describe what this service offers and who it's for…"
                required
              />
            </label>

            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50"
              >
                {saving
                  ? "Saving…"
                  : editingId
                    ? "Save changes"
                    : "Create service"}
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

      {/* ── Services list ── */}
      {services.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 py-16 text-center">
          <p className="mb-3 text-sm text-slate-400">No services yet.</p>
          {!showForm && (
            <button
              type="button"
              onClick={openNew}
              className="text-sm font-medium text-slate-600 underline underline-offset-2 hover:text-slate-900"
            >
              Add your first service
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {services.map((service, idx) => (
            <div
              key={service._id}
              className={`flex items-start justify-between gap-4 p-5 transition ${
                idx !== services.length - 1 ? "border-b border-slate-100" : ""
              } ${editingId === service._id ? "bg-slate-50" : ""}`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-xs text-slate-500">
                    {service.icon}
                  </span>
                  <p className="font-semibold text-slate-900">
                    {service.title}
                  </p>
                </div>
                <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">
                  {service.description}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(service)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-900 hover:bg-slate-50"
                >
                  Edit
                </button>
                {confirmDeleteId === service._id ? (
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(service._id)}
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
                    onClick={() => handleDeleteClick(service._id)}
                    className="rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-red-500 transition hover:border-red-300 hover:bg-red-50"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
