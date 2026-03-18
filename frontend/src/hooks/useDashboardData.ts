import { useEffect } from "react";
import {
  getAdminProjects,
  createAdminProject,
  updateAdminProject,
  deleteAdminProject,
  getAdminServices,
  createAdminService,
  updateAdminService,
  deleteAdminService,
  getAdminJobs,
  createAdminJob,
  updateAdminJob,
  deleteAdminJob,
  getAdminContacts,
  deleteAdminContact,
} from "../services/api";
import { useEntityCRUD } from "./useEntityCRUD";
import type { Project } from "../types/project";
import type { Service } from "../types/service";
import type { Job } from "../types/job";
import type { ContactMessage } from "../types/contact";

export const useDashboardData = () => {
  const projects = useEntityCRUD<Project, Omit<Project, "_id" | "createdAt">>({
    getAll: getAdminProjects,
    create: createAdminProject,
    update: updateAdminProject,
    delete: deleteAdminProject,
  });

  const services = useEntityCRUD<Service, Omit<Service, "_id">>({
    getAll: getAdminServices,
    create: createAdminService,
    update: updateAdminService,
    delete: deleteAdminService,
  });

  const jobs = useEntityCRUD<Job, Omit<Job, "_id" | "createdAt">>({
    getAll: getAdminJobs,
    create: createAdminJob,
    update: updateAdminJob,
    delete: deleteAdminJob,
  });

  const contacts = useEntityCRUD<ContactMessage, never>({
    getAll: getAdminContacts,
    create: async () => {
      throw new Error("Contacts cannot be created");
    },
    update: async () => {
      throw new Error("Contacts cannot be updated");
    },
    delete: deleteAdminContact,
  });

  useEffect(() => {
    void Promise.all([
      projects.fetchEntities(),
      services.fetchEntities(),
      jobs.fetchEntities(),
      contacts.fetchEntities(),
    ]);
  }, []);

  const loading =
    projects.loading || services.loading || jobs.loading || contacts.loading;

  const errors = [
    projects.error,
    services.error,
    jobs.error,
    contacts.error,
  ].filter(Boolean);

  return {
    projects,
    services,
    jobs,
    contacts,
    loading,
    errors,
  };
};
