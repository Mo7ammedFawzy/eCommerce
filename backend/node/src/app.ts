import express from "express";
import cors from "cors";
import {todoRouter} from "./routes/todoRoutes";
import {authRouter} from "./routes/authRoutes";
import {productRouter} from "./routes/productRoutes";


const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/todos", todoRouter);
// start routing
app.use("/", (req, res) => {
  res.send("<h1>Jobs API</h1> <a href='/api/todos'>Todos</a>")
})

export default app;