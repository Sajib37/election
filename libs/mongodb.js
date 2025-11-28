import mongoose from "mongoose";

const connectMongoDB = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected with MongoDB !")
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

export default connectMongoDB;