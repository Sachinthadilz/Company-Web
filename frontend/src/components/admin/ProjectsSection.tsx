import { useState, type FormEvent, type KeyboardEvent } from "react";
import type { Project } from "../../types/project";
import { ImageUploader } from "./ImageUploader";

interface ProjectsSectionProps {
  projects: Project[];
  saving: boolean;
  onSubmit: (
    id: string | null,
    data: Omit<Project, "_id" | "createdAt">,
  ) => Promise<void>;
  onDelete: (id: string) => void;
}

const emptyProject = {
  title: "",
  description: "",
  technologies: [] as string[],
  image: "",
  githubLink: "",
  liveLink: "",
};

const COMMON_TECHNOLOGIES = [
  "React",
  "TypeScript",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Tailwind CSS",
  "Next.js",
  "Vue.js",
  "Python",
  "AWS",
  "Docker",
  "GraphQL",
  "Redis",
  "WebSockets",
  "React Native",
  "Go",
  "Stripe",
];

export const ProjectsSection = ({
  projects,
  saving,
  onSubmit,
  onDelete,
}: ProjectsSectionProps) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyProject);
  const [currentTech, setCurrentTech] = useState("");

  const openNew = () => {
    setForm(emptyProject);
    setCurrentTech("");
    setEditingId(null);
    setShowForm(true);
    setConfirmDeleteId(null);
  };

  const openEdit = (project: Project) => {
    setForm({
      title: project.title,
      description: project.description,
      technologies: [...project.technologies],
      image: project.image,
      githubLink: project.githubLink ?? "",
      liveLink: project.liveLink ?? "",
    });
    setCurrentTech("");
    setEditingId(project._id);
    setShowForm(true);
    setConfirmDeleteId(null);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyProject);
    setCurrentTech("");
  };

  const addTechnology = (tech: string) => {
    const trimmed = tech.trim();
    if (trimmed && !form.technologies.includes(trimmed)) {
      setForm((prev) => ({
        ...prev,
        technologies: [...prev.technologies, trimmed],
      }));
      setCurrentTech("");
    }
  };

  const removeTechnology = (index: number) => {
    setForm((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }));
  };

  const handleTechKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTechnology(currentTech);
    }
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

  return (
    <div className="space-y-6">
      {/* ── Section header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Projects</h1>
          <p className="mt-1 text-sm text-slate-500">
            {projects.length} project{projects.length !== 1 ? "s" : ""} on the
            public website
          </p>
        </div>
        {!showForm && (
          <button
            type="button"
            onClick={openNew}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            + New project
          </button>
        )}
      </div>

      {/* ── Inline form panel ── */}
      {showForm && (
        <div className="rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-md">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">
              {editingId ? "Edit project" : "New project"}
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
                  Project title <span className="text-red-500">*</span>
                </span>
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                  placeholder="e.g., E-Commerce Platform"
                  required
                />
              </label>
              <div>
                <span className="mb-1.5 block text-sm font-medium text-slate-700">
                  Project image
                </span>
                <ImageUploader
                  value={form.image}
                  onUploaded={(url) =>
                    setForm((prev) => ({ ...prev, image: url }))
                  }
                />
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
                placeholder="Describe the project, its key features, and impact…"
                required
              />
            </label>

            {/* Technologies */}
            <div>
              <span className="mb-1.5 block text-sm font-medium text-slate-700">
                Technologies
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentTech}
                  onChange={(e) => setCurrentTech(e.target.value)}
                  onKeyDown={handleTechKeyDown}
                  className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                  placeholder="Type a tech and press Enter…"
                />
                <button
                  type="button"
                  onClick={() => addTechnology(currentTech)}
                  className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
                >
                  Add
                </button>
              </div>

              {form.technologies.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {form.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1 text-xs font-medium text-white"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechnology(idx)}
                        className="opacity-60 hover:opacity-100"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-2 flex flex-wrap gap-1.5">
                {COMMON_TECHNOLOGIES.filter(
                  (t) => !form.technologies.includes(t),
                ).map((tech) => (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => addTechnology(tech)}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    + {tech}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">
                  GitHub URL
                </span>
                <input
                  value={form.githubLink}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, githubLink: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                  placeholder="https://github.com/username/repo"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">
                  Live demo URL
                </span>
                <input
                  value={form.liveLink}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, liveLink: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                  placeholder="https://example.com"
                />
              </label>
            </div>

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
                    : "Create project"}
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

      {/* ── Projects list ── */}
      {projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 py-16 text-center">
          <p className="mb-3 text-sm text-slate-400">No projects yet.</p>
          {!showForm && (
            <button
              type="button"
              onClick={openNew}
              className="text-sm font-medium text-slate-600 underline underline-offset-2 hover:text-slate-900"
            >
              Add your first project
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project._id}
              className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition ${
                editingId === project._id
                  ? "border-slate-900"
                  : "border-slate-200"
              }`}
            >
              <div className="flex items-start gap-4 p-5">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-16 w-24 shrink-0 rounded-lg object-cover"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900">
                    {project.title}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                    {project.description}
                  </p>
                  {project.technologies.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-2 flex gap-3 text-xs text-slate-400">
                    {project.githubLink && <span>GitHub ↗</span>}
                    {project.liveLink && <span>Live demo ↗</span>}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(project)}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-900 hover:bg-slate-50"
                  >
                    Edit
                  </button>
                  {confirmDeleteId === project._id ? (
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(project._id)}
                        className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
                      >
                        Confirm delete
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
                      onClick={() => handleDeleteClick(project._id)}
                      className="rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50 hover:border-red-300"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
