import {DeleteResult} from "mongoose";

export interface BaseService<T> {
  getAll(): Promise<T[]>;

  getById(id: string): Promise<T | null>;

  update(id: string, updateData: Partial<T>): Promise<T | null>;

  deleteById(id: string): Promise<T | null>;

  deleteAll(): Promise<DeleteResult>;
}