// Service Layer
import {IUserService} from "./IUserService";
import {IUser, User} from "../models/userModel";
import {DeleteResult, Promise} from "mongoose";

class UserService implements IUserService {

  private constructor() {
  }

  static getInstance() {
    return new UserService();
  }

  async getAll(): Promise<IUser[]> {
    return User.find();
  }

  async findByEmail(email: IUser["email"]): Promise<IUser | null> {
    return User.findOne({email})
  }

  async getById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  async create(user: Partial<IUser>): Promise<IUser> {
    return User.create(user);
  }

  async deleteById(id: string): Promise<IUser | null> {
    return User.findByIdAndDelete(id);
  }

  async deleteAll(): Promise<DeleteResult> {
    return User.deleteMany();
  }

  async update(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, updateData);
  }
}

export const userService = UserService.getInstance();