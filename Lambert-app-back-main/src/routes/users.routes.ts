import { Router } from 'express';
import { getUsuarios } from '../controllers/users.controller';
import authenticateToken from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, getUsuarios);

export default router;
