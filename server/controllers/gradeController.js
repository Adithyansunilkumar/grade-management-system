import Grade from '../models/Grade.js';
import User from '../models/User.js';

// @desc    Assign grade to student
// @route   POST /api/grades
export const addGrade = async (req, res) => {
  try {
    const { studentId, subject, marks } = req.body;
    
    // Server-side check: Prevent duplicate subject for same student
    const exists = await Grade.findOne({ studentId, subject });
    if (exists) {
        return res.status(400).json({ message: `Grade for ${subject} already assigned to this student.` });
    }

    const grade = await Grade.create({
      studentId,
      subject,
      marks,
      assignedBy: req.user._id // The teacher logged in
    });

    res.status(201).json(grade);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all grades (with teacher-assigned-by info)
// @route   GET /api/grades
export const getGrades = async (req, res) => {
  try {
    const grades = await Grade.find()
      .populate('studentId', 'name email role')
      .populate('assignedBy', 'name email');
    res.status(200).json(grades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged-in student's grades
// @route   GET /api/grades/my-grades
export const getMyGrades = async (req, res) => {
  try {
    const grades = await Grade.find({ studentId: req.user._id })
      .populate('assignedBy', 'name');
    res.status(200).json(grades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
