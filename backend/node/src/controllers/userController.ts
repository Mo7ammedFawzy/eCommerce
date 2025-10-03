import {Request, Response} from "express"

class UserController {
  private constructor() {
  }

  static getInstance() {
    return new UserController();
  }

  async update(req: Request, res: Response) {

  }

  async delete(req: Request, res: Response) {

  }

  async listAllUsers(req: Request, res: Response) {

  }
}

export const userController = UserController.getInstance();