import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    // Connect to MongoDB
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    // Log the error and throw an exception
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Unable to connect to the database');
  }
};