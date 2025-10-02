import {ITodo} from "../models/todoModel";
import {DeleteResult} from "mongoose";

export interface ITodoRepository {
  findAll(): Promise<ITodo[]>;

  findById(id: string): Promise<ITodo | null>;

  create(todo: Partial<ITodo>): Promise<ITodo>;

  update(id: string, data: Partial<ITodo>): Promise<ITodo | null>;

  delete(id: string): Promise<ITodo | null>

  deleteCompleted(): Promise<DeleteResult>

  deleteAll(): Promise<DeleteResult>
}