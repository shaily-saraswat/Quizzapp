import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
    await mongoose.connect('mongodb+srv://shaily-saraswat:shaily123@cluster0.mlcegbu.mongodb.net/QuizApp');
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection error:", error.message);
    process.exit(1);
  }
}