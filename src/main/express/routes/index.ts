import express from 'express';
import Database from './database';
import License from './license';
import Auth from './auth';
import { clearStorage } from '../controllers';


const router = express.Router();

router.use('/connection', Database);
router.use('/license', License);
router.use('/auth', Auth);

router.get('/clear-storage', clearStorage);


export default router;