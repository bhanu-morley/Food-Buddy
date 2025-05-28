import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from './models/Admin.js';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URL);

    const existingAdmin = await Admin.findOne({ email: 'bhanu@gmail.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash('bhanu', 10);
    const admin = new Admin({
      email: 'bhanu@gmail.com',
      password: hashedPassword,
    });

    await admin.save();
    console.log('Admin user created successfully');
    process.exit();
  } catch (err) {
    console.error('Error creating admin:', err);
    process.exit(1);
  }
};

createAdmin();
