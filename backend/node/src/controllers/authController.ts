import {Request, Response} from "express"
import {ObjectChecker} from "../utils/ObjectCheckerKlass";
import {ApiResponse} from "../utils/ApiResponseKlass";
import {userService} from "../services/userService";
import {IUser} from "../models/userModel";

class AuthController {
  private constructor() {
  }

  static getInstance() {
    return new AuthController();
  }

  async register(req: Request, res: Response) {
    //name & password
    const {email, password, name} = req.body as Partial<IUser>;
    const apiResponse = ApiResponse.addResponse(res);
    if (ObjectChecker.isEmptyOrNull(name))
      return apiResponse.badRequest("Name is Required");
    if (ObjectChecker.isEmptyOrNull(email))
      return apiResponse.badRequest("email is Required");
    if (ObjectChecker.isEmptyOrNull(password))
      return apiResponse.badRequest("password is Required");
    //check if user is already exist in db;
    const user = await userService.findByEmail(email);
    if (user)
      return apiResponse.badRequest("email is already exist")
    // const newUser = await userService.create({...req.body, password: hasedPassword});
    // return apiResponse.created(newUser);
  }

  async login(req: Request, res: Response) {

  }

  async getCurrentUser(req: Request, res: Response) {

  }

  async refresh() {

  }

  async logout() {

  }
}

export const authController = AuthController.getInstance();