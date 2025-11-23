import mongoose from "mongoose";

export const connectDB = async()=>{
    try{
        const conn = mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB connected: ${(await conn).connection.host}`);
    }catch(err){
        console.log("MongoDB connection error:",err);
    }
};