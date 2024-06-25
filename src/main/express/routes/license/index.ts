import express from 'express';
import { getKey, validate, generateLicense } from '../../controllers';
const router = express.Router();

router.get('/key', getKey);
router.post('/validate', validate);
router.post('/generate', generateLicense);

export default router;