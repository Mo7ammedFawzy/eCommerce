import {ITodo} from "../models/todoModel";
import {BaseService} from "./BaseService";
import {DeleteResult} from "mongoose";

export interface ITodoService extends BaseService<ITodo> {
  add(title: string): Promise<T>;

  deleteCompleted(): Promise<DeleteResult>
}