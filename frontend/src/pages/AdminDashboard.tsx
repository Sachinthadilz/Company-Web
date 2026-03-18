import { useState } from "react";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { useDashboardData } from "../hooks/useDashboardData";
import { ProjectsSection } from "../components/admin/ProjectsSection";
import { ServicesSection } from "../components/admin/ServicesSection";
import { JobsSection } from "../components/admin/JobsSection";
import { ContactsSection } from "../components/admin/ContactsSection";
import { DashboardSummary } from "../components/admin/DashboardSummary";
import { HeroImagesSection } from "../components/admin/HeroImagesSection";
import { EmployeeOfMonthSection } from "../components/admin/EmployeeOfMonthSection";
import { BlogSection } from "../components/admin/BlogSection";

type AdminSection = "overview" | "projects" | "services" | "jobs" | "contacts" | "hero" | "eom" | "blog";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>("overview");

  const {
    adminEmail,
    loading: authLoading,
    error: authError,
    handleLogout,
  } = useAdminAuth();
  const {
    projects,
    services,
    jobs,
    contacts,
    loading: dataLoading,
    errors,
  } = useDashboardData();

  if (authLoading || dataLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
          <p className="text-sm text-slate-500">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  const errorMessage =
    [authError, ...errors].filter(Boolean)[0] ||
    projects.error ||
    services.error ||
    jobs.error ||
    contacts.error;

  const navItems: { key: AdminSection; label: string; count?: number }[] = [
    { key: "overview", label: "Overview" },
    { key: "projects", label: "Projects", count: projects.entities.length },
    { key: "services", label: "Services", count: services.entities.length },
    { key: "jobs", label: "Jobs", count: jobs.entities.length },
    { key: "contacts", label: "Messages", count: contacts.entities.length },
    { key: "hero", label: "Hero Images" },
    { key: "eom", label: "Employee of Month" },
    { key: "blog", label: "Blog" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Top header ── */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-widest uppercase text-slate-900">
                ARTecX
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-sm text-slate-500">Admin</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden text-xs text-slate-400 sm:block">
                {adminEmail}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Sign out
              </button>
            </div>
          </div>

          {/* ── Tab navigation ── */}
          <nav className="flex gap-0 overflow-x-auto">
            {navItems.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveSection(item.key)}
                className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${
                  activeSection === item.key
                    ? "border-slate-900 text-slate-900"
                    : "border-transparent text-slate-400 hover:text-slate-700"
                }`}
              >
                {item.label}
                {item.count !== undefined && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-xs font-semibold leading-none ${
                      activeSection === item.key
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {errorMessage && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        {activeSection === "overview" && (
          <DashboardSummary
            projectsCount={projects.entities.length}
            servicesCount={services.entities.length}
            jobsCount={jobs.entities.length}
            contacts={contacts.entities}
            onNavigate={setActiveSection}
          />
        )}

        {activeSection === "projects" && (
          <ProjectsSection
            projects={projects.entities}
            saving={projects.saving}
            onSubmit={async (id, data) => {
              if (id) await projects.updateEntity(id, data);
              else await projects.createEntity(data);
            }}
            onDelete={projects.deleteEntity}
          />
        )}

        {activeSection === "services" && (
          <ServicesSection
            services={services.entities}
            saving={services.saving}
            onSubmit={async (id, data) => {
              if (id) await services.updateEntity(id, data);
              else await services.createEntity(data);
            }}
            onDelete={services.deleteEntity}
          />
        )}

        {activeSection === "jobs" && (
          <JobsSection
            jobs={jobs.entities}
            saving={jobs.saving}
            onSubmit={async (id, data) => {
              if (id) await jobs.updateEntity(id, data);
              else await jobs.createEntity(data);
            }}
            onDelete={jobs.deleteEntity}
          />
        )}

        {activeSection === "contacts" && (
          <ContactsSection
            contacts={contacts.entities}
            onDelete={contacts.deleteEntity}
            onReadToggle={() => void contacts.fetchEntities()}
          />
        )}

        {activeSection === "hero" && <HeroImagesSection />}
        {activeSection === "eom" && <EmployeeOfMonthSection />}
        {activeSection === "blog" && <BlogSection />}
      </main>
    </div>
  );
};

export default AdminDashboard;
