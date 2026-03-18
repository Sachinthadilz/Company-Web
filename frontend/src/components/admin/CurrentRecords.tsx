import { SectionCard } from "./SectionCard";
import { EntityList } from "./EntityList";
import type { Project } from "../../types/project";
import type { Service } from "../../types/service";
import type { Job } from "../../types/job";

interface CurrentRecordsProps {
  projects: Project[];
  services: Service[];
  jobs: Job[];
  onEditProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  onEditService: (service: Service) => void;
  onDeleteService: (id: string) => void;
  onEditJob: (job: Job) => void;
  onDeleteJob: (id: string) => void;
}

export const CurrentRecords = ({
  projects,
  services,
  jobs,
  onEditProject,
  onDeleteProject,
  onEditService,
  onDeleteService,
  onEditJob,
  onDeleteJob,
}: CurrentRecordsProps) => (
  <SectionCard
    title="Current Records"
    description="Review saved items and switch any record into edit mode."
  >
    <div className="space-y-6">
      <EntityList
        title="Projects"
        entities={projects}
        renderContent={(project) => (
          <>
            <p className="font-medium text-slate-900">{project.title}</p>
            <p className="mt-1 text-sm text-slate-600">{project.description}</p>
          </>
        )}
        onEdit={onEditProject}
        onDelete={onDeleteProject}
        emptyMessage="No projects yet."
      />

      <EntityList
        title="Services"
        entities={services}
        renderContent={(service) => (
          <>
            <p className="font-medium text-slate-900">{service.title}</p>
            <p className="mt-1 text-sm text-slate-600">{service.description}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
              {service.icon}
            </p>
          </>
        )}
        onEdit={onEditService}
        onDelete={onDeleteService}
        emptyMessage="No services yet."
      />

      <EntityList
        title="Jobs"
        entities={jobs}
        renderContent={(job) => (
          <>
            <p className="font-medium text-slate-900">{job.title}</p>
            <p className="mt-1 text-sm text-slate-600">
              {job.department} | {job.location}
            </p>
          </>
        )}
        onEdit={onEditJob}
        onDelete={onDeleteJob}
        emptyMessage="No jobs yet."
      />
    </div>
  </SectionCard>
);
