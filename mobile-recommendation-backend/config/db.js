const mongoose = require('mongoose');

const connectDB = async () => {
  console.log('Attempting MongoDB connection...');
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    // Do not exit here; let the server still start so health routes work
  }
};

module.exports = connectDB;