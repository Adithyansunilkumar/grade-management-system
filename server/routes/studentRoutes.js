import express from 'express';
import { getStudents } from '../controllers/studentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, authorize('teacher'), getStudents); // Only teachers can list students

export default router;
