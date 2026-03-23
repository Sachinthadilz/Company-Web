import { Router } from 'express';
import { getAdminSession, loginAdmin, logoutAdmin } from '../controllers/adminAuthController';
import { loginLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/login', loginLimiter, loginAdmin);
router.post('/logout', logoutAdmin);
router.get('/me', getAdminSession);

export default router;
