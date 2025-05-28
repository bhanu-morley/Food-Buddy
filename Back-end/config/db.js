import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://bhanuprasanth:bhanu2003@cluster0.cckiimb.mongodb.net/food-buddy').then(()=>console.log("Database Connected"));
}