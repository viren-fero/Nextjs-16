import mongoose from "mongoose";

export async function dbConnect() {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI)
        console.log("DB connected!");
    } catch (error) {
        throw new Error(error);
    }
}