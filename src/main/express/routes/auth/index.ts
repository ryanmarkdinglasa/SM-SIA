import express from 'express';
import { login, logout, refreshToken } from '../../controllers';
import M from '../../middleware';
const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/refresh-token', M.verifyToken, refreshToken);

export default router;