import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  try {
    const user = process.env.MONGODB_USER;
    const pass = process.env.MONGODB_PASSWORD;
    const url = process.env.MONGODB_URL;
    const db = process.env.MONGODB_DB;

    const fullUrl = `mongodb+srv://${user}:${pass}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`;
    await mongoose.connect(fullUrl);
    
    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.log('Mongo connection error: ', e.message);
  }
};
