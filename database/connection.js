const MongodbURL =
  "mongodb+srv://boryanayourdanova:nextjsCrudPink@cluster0.qbgmq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// nextjsCrudPink
import mongoose from "mongoose";

export async function Connect() {
  try {
    await mongoose.connect(MongodbURL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Rethrow to allow calling code to handle
  }
}
