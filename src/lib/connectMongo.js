// src/lib/connectMongo.js
import mongoose from 'mongoose';

let isConnected = false;

const connectMongo = async () => {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not defined in .env.local");

  try {
    await mongoose.connect(uri, {
      dbName: 'smartledger', // match the DB name used in URI
    });
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

export default connectMongo;
