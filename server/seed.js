import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Student from './models/Student.js';
import Grade from './models/Grade.js';

dotenv.config();

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await User.deleteMany({});
        await Student.deleteMany({});
        await Grade.deleteMany({});
        console.log('Cleared existing data.');

        const salt = await bcrypt.genSalt(10);
        const demoPassword = await bcrypt.hash('password123', salt);

        // 1. Create Teacher
        const teacher = await User.create({
            name: 'Prof. McGonagall',
            email: 'teacher@school.com',
            password: demoPassword,
            role: 'teacher'
        });

        // 2. Create Students (Users)
        const studentUser1 = await User.create({
            name: 'Harry Potter',
            email: 'harry@hogwarts.com',
            password: demoPassword,
            role: 'student'
        });

        const studentUser2 = await User.create({
            name: 'Hermione Granger',
            email: 'hermione@hogwarts.com',
            password: demoPassword,
            role: 'student'
        });

        // 3. Create Student Records
        const student1 = await Student.create({
            name: 'Harry Potter',
            rollNumber: 'HP007',
            class: 'Class 12',
            email: 'harry@hogwarts.com'
        });

        const student2 = await Student.create({
            name: 'Hermione Granger',
            rollNumber: 'HG420',
            class: 'Class 12',
            email: 'hermione@hogwarts.com'
        });

        // 4. Create Grades
        await Grade.create([
            { studentId: student1._id, subject: 'Defense Against Dark Arts', marks: 95 },
            { studentId: student1._id, subject: 'Potions', marks: 55 },
            { studentId: student2._id, subject: 'Transfiguration', marks: 100 },
            { studentId: student2._id, subject: 'Arithmancy', marks: 99 },
            { studentId: student2._id, subject: 'History of Magic', marks: 98 }
        ]);

        console.log('✅ Seeding successful!');
        console.log('\nDemo Logins (Password: password123):');
        console.log('Teacher: teacher@school.com');
        console.log('Student 1: harry@hogwarts.com');
        console.log('Student 2: hermione@hogwarts.com');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seed();
