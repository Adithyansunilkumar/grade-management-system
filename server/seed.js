import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Grade from './models/Grade.js';

dotenv.config();

const SUBJECTS = [
  "Design and Analysis of Algorithms",
  "Operating Systems",
  "Database Management Systems",
  "Computer Organization and Architecture",
  "Software Engineering",
  "Microprocessors"
];

const createDemoData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB...');

    // Clear existing data
    await User.deleteMany({});
    await Grade.deleteMany({});
    console.log('🗑️  Existing data cleared.');

    const salt = await bcrypt.genSalt(10);

    // 1. Create Teachers
    const alicePwd = await bcrypt.hash('Alice', salt);
    const bobPwd = await bcrypt.hash('Bob', salt);
    
    const teacherAlice = await User.create({
      name: 'Alice',
      email: 'alice@teacher.com',
      password: alicePwd,
      role: 'teacher'
    });

    const teacherBob = await User.create({
      name: 'Bob',
      email: 'bob@teacher.com',
      password: bobPwd,
      role: 'teacher'
    });

    console.log('🏛️  Faculty created.');

    // 2. Create 20 Students with Roll Numbers
    const studentIds = [];
    for (let i = 1; i <= 20; i++) {
        const name = `Student ${i}`;
        const pwd = await bcrypt.hash(name, salt);
        const s = await User.create({
          name,
          email: `student${i}@enrollment.com`,
          rollNo: `2024CS${String(i).padStart(2, '0')}`,
          password: pwd,
          role: 'student'
        });
        studentIds.push(s._id);
    }
    console.log('👨‍🎓 20 Students created with Roll Nos.');

    // 3. Create full academic records for ALL students (6 subjects each)
    const allGrades = [];
    for (const sid of studentIds) {
        for (let j = 0; j < SUBJECTS.length; j++) {
            const assignedBy = j < 3 ? teacherAlice._id : teacherBob._id;
            const marks = Math.floor(Math.random() * 29) + 70;

            allGrades.push({
                studentId: sid,
                subject: SUBJECTS[j],
                marks,
                assignedBy
            });
        }
    }

    await Grade.insertMany(allGrades);
    console.log(`📊 Successfully generated ${allGrades.length} academic records!`);

    console.log('\n🚀 SEEDING COMPLETE WITH ROLL NUMBERS!');
    console.log('--------------------------');
    console.log('TEACHERS: Alice, Bob');
    console.log('STUDENTS: Student 1 (2024CS01) ... Student 20 (2024CS20)');
    console.log('--------------------------');

    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

createDemoData();
