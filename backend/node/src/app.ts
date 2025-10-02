import express from "express";
import cors from "cors";
import {todoRouter} from "./routes/todoRoutes";


const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/todos", todoRouter);

export default app;