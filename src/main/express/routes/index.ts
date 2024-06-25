import express from 'express';
import Database from './database';
import License from './license';

const router = express.Router();

router.use('/connection', Database);
router.use('/license', License);

export default router;