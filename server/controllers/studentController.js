import User from '../models/User.js';

// @desc    Get all students (Users with role 'student')
// @route   GET /api/students
export const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' })
      .select('-password')
      .sort({ name: 1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
