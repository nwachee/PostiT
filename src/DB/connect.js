import mongoose from 'mongoose';

const connectDb = async () => {
    const MONGO_URI = process.env.MONGO_URI;
    try {
      mongoose.set('strictQuery', false);
      mongoose.connect(MONGO_URI);
      console.log('Database don Connect!!!');
    } catch (error) {
      process.exit(1);
    }
  };

// create a model from schema and export it
export default connectDb