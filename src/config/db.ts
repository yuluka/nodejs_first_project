import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionStr = process.env.MONGO_URL || "mongodb://localhost:27017";

export const db = mongoose.connect(connectionStr).then(() => console.log("Connected to MongoDB")).catch((err) => console.error(err));