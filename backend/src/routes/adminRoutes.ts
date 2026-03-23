import { Router } from 'express';
import requireAdmin from '../middleware/requireAdmin';
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from '../controllers/projectController';
import {
  createService,
  deleteService,
  getServices,
  updateService,
} from '../controllers/serviceController';
import {
  createJob,
  deleteJob,
  getJobById,
  getJobs,
  updateJob,
} from '../controllers/jobController';
import { deleteContact, getContacts, markAsRead } from '../controllers/contactController';
import {
  createHeroImage,
  deleteHeroImage,
  reorderHeroImages,
} from '../controllers/heroImageController';
import {
  create as createEOM,
  update as updateEOM,
  remove as removeEOM,
} from '../controllers/employeeOfMonthController';
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController';
import {
  getAll as getAllTestimonials,
  create as createTestimonial,
  update as updateTestimonial,
  remove as removeTestimonial,
} from '../controllers/testimonialController';

const router = Router();

router.use(requireAdmin);

router.get('/projects', getProjects);
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

router.get('/services', getServices);
router.post('/services', createService);
router.put('/services/:id', updateService);
router.delete('/services/:id', deleteService);

router.get('/jobs', getJobs);
router.get('/jobs/:id', getJobById);
router.post('/jobs', createJob);
router.put('/jobs/:id', updateJob);
router.delete('/jobs/:id', deleteJob);

router.get('/contacts', getContacts);
router.delete('/contacts/:id', deleteContact);
router.patch('/contacts/:id/read', markAsRead);

// Hero images
router.post('/hero-images', createHeroImage);
router.delete('/hero-images/:id', deleteHeroImage);
router.put('/hero-images/reorder', reorderHeroImages);

// Employee Of The Month
router.post('/employee-of-month', createEOM);
router.put('/employee-of-month/:id', updateEOM);
router.delete('/employee-of-month/:id', removeEOM);

// Blog
router.get('/blogs', getAllBlogs);
router.get('/blogs/:id', getBlogById);
router.post('/blogs', createBlog);
router.put('/blogs/:id', updateBlog);
router.delete('/blogs/:id', deleteBlog);

// Testimonials
router.get('/testimonials', getAllTestimonials);
router.post('/testimonials', createTestimonial);
router.put('/testimonials/:id', updateTestimonial);
router.delete('/testimonials/:id', removeTestimonial);

export default router;
