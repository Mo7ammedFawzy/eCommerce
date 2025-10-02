import {ITodoService} from "./ITodoService";
import {ITodo} from "../models/todoModel";
import {todoRepository} from "../repositories/todoRepository";
import {DeleteResult, Promise} from "mongoose";

// Service Layer
export class TodoService implements ITodoService {
  private static _instance: TodoService;

  private constructor() {
  }

  static getInstance(): TodoService {
    if (!this._instance)
      this._instance = new TodoService();
    return this._instance;
  }

  async add(title: string) {
    return todoRepository.create({title});
  }

  async getAll() {
    return todoRepository.findAll();
  }

  async update(id: string, updateData: Partial<ITodo>) {
    return todoRepository.update(id, updateData);
  }

  async getTodoById(id: string) {
    return todoRepository.findById(id)
  }

  async delete(id: string) {
    return todoRepository.delete(id);
  }

  async deleteCompleted() {
    return todoRepository.deleteCompleted()
  }

  async deleteAll() {
    return todoRepository.deleteAll();
  }

}

export const todoService = TodoService.getInstance();