import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:3000/animal-training-app';

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectDB;