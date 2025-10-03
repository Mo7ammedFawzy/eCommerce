import {ITodoRepository} from "./ITodoRepository";
import {ITodo, Todo} from "../models/todoModel";
import {DeleteResult} from "mongoose";

class TodoRepository implements ITodoRepository {

  private constructor() {
  }

  static getInstance(): TodoRepository {
    return new TodoRepository();
  }

  async findAll(): Promise<ITodo[]> {
    return Todo.find();
  }

  async findById(id: string): Promise<ITodo | null> {
    return Todo.findById(id);
  }

  async create(todo: Partial<ITodo>): Promise<ITodo> {
    const newTodo = new Todo(todo);
    return newTodo.save();
  }

  async delete(id: string): Promise<ITodo | null> {
    return Todo.findByIdAndDelete(id);
  }

  async update(id: string, data: Partial<ITodo>): Promise<ITodo | null> {
    return Todo.findByIdAndUpdate(id, data, {new: true});
  }

  async deleteCompleted(): Promise<DeleteResult> {
    return Todo.deleteMany({completed: true})
  }

  async deleteAll(): Promise<DeleteResult> {
    return Todo.deleteMany();
  }

}

export const todoRepository = TodoRepository.getInstance();