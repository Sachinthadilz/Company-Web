import { Router } from 'express';
import { getPublishedBlogs, getBlogBySlug } from '../controllers/blogController';

const router = Router();

router.get('/', getPublishedBlogs);
router.get('/:slug', getBlogBySlug);

export default router;
