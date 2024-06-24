import express from 'express';
import Database from './database';

const router = express.Router();

router.use('/connection', Database)

export default router;