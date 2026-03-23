import { Router } from 'express';
import { getPublished } from '../controllers/testimonialController';

const router = Router();
router.get('/', getPublished);
export default router;
