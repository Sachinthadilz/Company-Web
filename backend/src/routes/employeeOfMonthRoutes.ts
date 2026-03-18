import { Router } from 'express';
import { getAll } from '../controllers/employeeOfMonthController';

const router = Router();

// Public – About page fetches from here
router.get('/', getAll);

export default router;
