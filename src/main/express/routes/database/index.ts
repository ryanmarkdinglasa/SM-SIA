import express from 'express';
import { DBConnection, getConnection, setConnection, clearStorage } from '../../controllers';
const router = express.Router();

router.post('/check', DBConnection);
router.get('/get', getConnection);
router.post('/set', setConnection);
router.get('/clear', clearStorage);

export default router;