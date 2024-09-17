import express from 'express';
import {
  getAdministrative,
  createAdministrative,
  updateAdministrative,
  adminLogin,

} from '../controllars/AdminControllar.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/find', authenticateToken, getAdministrative);
router.post('/', createAdministrative);
router.post('/login', adminLogin);
router.patch('/:id',authenticateToken , updateAdministrative);


export default router;
