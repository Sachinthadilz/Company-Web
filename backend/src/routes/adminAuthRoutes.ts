import { Router } from 'express';
import { getAdminSession, loginAdmin, logoutAdmin } from '../controllers/adminAuthController';

const router = Router();

router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);
router.get('/me', getAdminSession);

export default router;
