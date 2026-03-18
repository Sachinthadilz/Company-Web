import { Router } from 'express';
import { getHeroImages } from '../controllers/heroImageController';

const router = Router();

// Public – the frontend hero section fetches these
router.get('/', getHeroImages);

export default router;
