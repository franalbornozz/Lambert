import { Router } from 'express';
import { getClientes, crearCliente } from '../controllers/clientes.controller';
import authenticateToken from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, getClientes);
router.post('/', authenticateToken, crearCliente);

export default router;
