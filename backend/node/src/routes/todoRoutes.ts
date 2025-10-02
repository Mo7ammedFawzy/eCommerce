import express from "express";
import {todoController} from "../controllers/todoController";

const router = express.Router();

//get all todos
router.get("/", todoController.getAll);
// get todo by id
router.get("/:id", todoController.getTodoById)
//create new todo
router.post("/", todoController.create);
// update todo by id
router.patch("/:id", todoController.update)
// toggle complete status
router.patch("/:id/toggle", todoController.toggle)
// delete All todos
router.delete("/deleteAll", todoController.deleteAll)
// delete todo by id
router.delete("/:id", todoController.delete)
// delete completed todos
router.delete("/delete/completed", todoController.deleteCompleted)


export const todoRouter = router;