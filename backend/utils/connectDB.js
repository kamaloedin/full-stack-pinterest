import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('MongoDB is connected!');
  } catch (error) {
    console.log('MONGO CONNECTION ERROR', error);
  }
};

export default connectDB;
