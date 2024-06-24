import express from 'express';
import { DBConnection } from '../../controllers';
const router = express.Router();

router.post('/check', DBConnection);

export default router;