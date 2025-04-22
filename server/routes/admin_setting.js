import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { AdminchangePassword } from '../controllers/admin_settingController.js';

const router = express.Router();


router.put('/admin-change-password', authMiddleware, AdminchangePassword);

export default router;
