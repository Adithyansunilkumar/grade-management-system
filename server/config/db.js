import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Failed!');
    console.error(`Error-Type: ${error.name} | Message: ${error.message}`);
    console.log('\n--- ATLAS CONNECTION TIPS ---');
    console.log('1. Check if you whitelisted your IP in Atlas Network Access.');
    console.log('2. Ensure your password doesn\'t have special characters (or use URL encoding).');
    console.log('3. Current URI begins with: ' + (process.env.MONGO_URI ? process.env.MONGO_URI.substring(0, 25) : 'MISSING'));
    console.log('-----------------------------\n');
    process.exit(1);
  }
};

export default connectDB;
