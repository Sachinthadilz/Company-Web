import axios from 'axios';
import type { ContactFormData, ApiResponse } from '../types/contact';
import type { ContactMessage } from '../types/contact';
import type { Project } from '../types/project';
import type { Service } from '../types/service';
import type { Job } from '../types/job';
import type { AdminSession } from '../types/admin';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Projects
export const getProjects = () =>
  api.get<ApiResponse<Project[]>>('/projects');

export const createProject = (data: Omit<Project, '_id' | 'createdAt'>) =>
  api.post<ApiResponse<Project>>('/projects', data);

export const deleteProject = (id: string) =>
  api.delete<ApiResponse<null>>(`/projects/${id}`);

// Services
export const getServices = () =>
  api.get<ApiResponse<Service[]>>('/services');

// Jobs
export const getJobs = () =>
  api.get<ApiResponse<Job[]>>('/jobs');

export const getJobById = (id: string) =>
  api.get<ApiResponse<Job>>(`/jobs/${id}`);

// Contact
export const submitContact = (data: ContactFormData) =>
  api.post<ApiResponse<null>>('/contact', data);

// Admin auth
export const getAdminSession = () =>
  api.get<ApiResponse<AdminSession>>('/admin/auth/me');

export const loginAdmin = (data: { email: string; password: string }) =>
  api.post<ApiResponse<AdminSession>>('/admin/auth/login', data);

export const logoutAdmin = () =>
  api.post<ApiResponse<null>>('/admin/auth/logout');

// Admin projects
export const getAdminProjects = () =>
  api.get<ApiResponse<Project[]>>('/admin/projects');

export const createAdminProject = (data: Omit<Project, '_id' | 'createdAt'>) =>
  api.post<ApiResponse<Project>>('/admin/projects', data);

export const updateAdminProject = (id: string, data: Omit<Project, '_id' | 'createdAt'>) =>
  api.put<ApiResponse<Project>>(`/admin/projects/${id}`, data);

export const deleteAdminProject = (id: string) =>
  api.delete<ApiResponse<null>>(`/admin/projects/${id}`);

// Admin services
export const getAdminServices = () =>
  api.get<ApiResponse<Service[]>>('/admin/services');

export const createAdminService = (data: Omit<Service, '_id'>) =>
  api.post<ApiResponse<Service>>('/admin/services', data);

export const updateAdminService = (id: string, data: Omit<Service, '_id'>) =>
  api.put<ApiResponse<Service>>(`/admin/services/${id}`, data);

export const deleteAdminService = (id: string) =>
  api.delete<ApiResponse<null>>(`/admin/services/${id}`);

// Admin jobs
export const getAdminJobs = () =>
  api.get<ApiResponse<Job[]>>('/admin/jobs');

export const createAdminJob = (data: Omit<Job, '_id' | 'createdAt'>) =>
  api.post<ApiResponse<Job>>('/admin/jobs', data);

export const updateAdminJob = (id: string, data: Omit<Job, '_id' | 'createdAt'>) =>
  api.put<ApiResponse<Job>>(`/admin/jobs/${id}`, data);

export const deleteAdminJob = (id: string) =>
  api.delete<ApiResponse<null>>(`/admin/jobs/${id}`);

// Admin contacts
export const getAdminContacts = () =>
  api.get<ApiResponse<ContactMessage[]>>('/admin/contacts');

export const deleteAdminContact = (id: string) =>
  api.delete<ApiResponse<null>>(`/admin/contacts/${id}`);

export default api;
