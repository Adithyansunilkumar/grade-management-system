import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const testConn = async () => {
    try {
        console.log('Testing connection to:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
        console.log('SUCCESS: MongoDB Connected');
        process.exit(0);
    } catch (err) {
        console.error('ERROR: Connection failed.');
        console.error(err.message);
        process.exit(1);
    }
};

testConn();
