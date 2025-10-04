import {ITodoService} from "./ITodoService";
import {ITodo} from "../models/todoModel";
import {todoRepository} from "../repositories/todoRepository";

// Service Layer
export class TodoService implements ITodoService {

  private constructor() {
  }

  static getInstance(): TodoService {
    return new TodoService();
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

  async getById(id: string) {
    return todoRepository.findById(id)
  }

  async deleteById(id: string) {
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