import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const findUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const users = await User.find({}).select('email role');
        console.log('--- Current Users in DB ---');
        console.log(users);
        process.exit(0);
    } catch (error) {
        process.exit(1);
    }
};

findUsers();
