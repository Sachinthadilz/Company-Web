import { Router } from 'express';
import requireAdmin from '../middleware/requireAdmin';
import { uploadSingle } from '../middleware/upload';
import { uploadImage } from '../controllers/uploadController';

const router = Router();

// POST /api/upload  — admin only
router.post('/', requireAdmin, uploadSingle, uploadImage);

export default router;
