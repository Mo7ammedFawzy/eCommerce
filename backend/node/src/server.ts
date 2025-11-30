import dotenv from "dotenv";
import app from "./app";
import {connectDB} from "./config/db";
import {VercelRequest, VercelResponse} from "@vercel/node";

dotenv.config();
const PORT = process.env.PORT;
const isDevMode = process.env.NODE_ENV === "development";

async function start() {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

if (isDevMode)
  start();

export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res);
}