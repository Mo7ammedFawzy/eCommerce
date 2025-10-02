import {ITodo} from "../models/todoModel";
import {DeleteResult} from "mongoose";

export interface ITodoService {

  getAll(): Promise<ITodo[]>;

  add(title: string): Promise<ITodo>;

  update(id: string, updateData: Partial<ITodo>): Promise<ITodo | null>;

  getTodoById(id: string): Promise<ITodo | null>;

  delete(id: string): Promise<ITodo | null>;

  deleteCompleted(): Promise<DeleteResult>

  deleteAll(): Promise<DeleteResult>;
}