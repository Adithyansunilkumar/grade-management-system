import express from 'express';
import { addGrade, getGrades, getMyGrades } from '../controllers/gradeController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, authorize('teacher'), addGrade);
router.get('/', protect, getGrades);
router.get('/my-grades', protect, getMyGrades); // Student sees their own grades

export default router;
