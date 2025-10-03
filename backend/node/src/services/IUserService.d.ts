import {BaseService} from "./BaseService";
import {IUser} from "../models/userModel";

export interface IUserService extends BaseService<IUser> {
  create(user: Partial<IUser>): Promise<IUser>;

  findByEmail(email: IUser["email"]): Promise<IUser | null>
}