import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(async () => {
  const admin = await Admin.find();
  console.log("All Admins:", admin);
  process.exit();
});
