import express from "express";
import cors from "cors";
import {todoRouter} from "./routes/todoRoutes";
import {authRouter} from "./routes/authRoutes";
import {productRouter} from "./routes/productRoutes";

const allowedOrigins = [
  "http://localhost:5173",
  "https://ecommercelytics.vercel.app/"
]
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use("/api/products", productRouter);
app.use("/api/auth", authRouter);
app.use("/api/todos", todoRouter);
// start routing
app.use("/", (req, res) => {
  res.send("<h1>Jobs API updated-2</h1> <a href='/api/products'>Products</a>")
})

export default app;