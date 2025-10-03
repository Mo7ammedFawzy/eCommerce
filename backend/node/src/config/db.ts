import mongoose from "mongoose";


let cached = (global as any)?.mongoose

if (!cached) {
  cached = (<any>global).mongoose = {conn: null, promise: null}
}

export const connectDB = async () => {
  if (cached.conn)
    return cached.conn;
  if (!cached.promise) {
    try {
      const mongoUrl = process.env.MONGO_URL;
      cached.promise = mongoose.connect(mongoUrl || "").then(m => m.connection)
      console.log("✅ MongoDB Connected");
    } catch (error) {
      console.log("❌ MongoDB Connection Failed", error);
      process.exit(1);
    }
    cached.conn = await cached.promise;
    return cached.conn;
  }

}