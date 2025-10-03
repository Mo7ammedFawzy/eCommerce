import type {Request, Response} from "express";
import {todoService} from "../services/todoService";
import {ApiResponse} from "../utils/ApiResponseKlass";
import {ITodo} from "../models/todoModel";
import {CommonUtils} from "../utils/CommonUtils";
import {Messages} from "../utils/constants/messages";
import {ObjectChecker} from "../utils/ObjectCheckerKlass";

// handle http requests/responses
class TodoController {

  static getInstance() {
    return new TodoController();
  }

  async getAll(req: Request, res: Response) {
    ApiResponse.addResponse(res).success(await todoService.getAll());
  }

  async create(req: Request, res: Response) {
    const title = CommonUtils.getBody(req.body, "title");
    const apiResponse = ApiResponse.addResponse(res)
    if (ObjectChecker.isEmptyOrNull(title))
      return apiResponse.badRequest(Messages.TODO.REQUIRED_TITLE);
    const todo = await todoService.add(title);
    apiResponse.created(todo);
  }

  async update(req: Request, res: Response) {
    const updateData: Partial<ITodo> = req.body;
    const id = CommonUtils.getIdFromParams(req)
    const apiResponse = ApiResponse.addResponse(res)
    if (ObjectChecker.isEmptyOrNull(updateData.title))
      return apiResponse.badRequest(Messages.TODO.REQUIRED_TITLE);
    const updatedTodo = await todoService.update(id, updateData);
    if (!updatedTodo)
      return apiResponse.notFound(Messages.TODO.NOT_FOUND);
    apiResponse.success(updatedTodo, Messages.TODO.UPDATED);

  }

  async getTodoById(req: Request, res: Response) {
    const id = CommonUtils.getIdFromParams(req);
    const todo = await todoService.getById(id);
    const apiResponse = ApiResponse.addResponse(res)
    if (ObjectChecker.isEmptyOrNull(todo))
      return apiResponse.notFound(Messages.TODO.NOT_FOUND);
    return apiResponse.success(todo);
  }

  async delete(req: Request, res: Response) {
    const id = CommonUtils.getIdFromParams(req);
    const deletedTodo = await todoService.delete(id);
    const apiResponse = ApiResponse.addResponse(res)
    if (ObjectChecker.isEmptyOrNull(deletedTodo))
      return apiResponse.notFound(Messages.TODO.NOT_FOUND);
    apiResponse.success(deletedTodo, Messages.TODO.DELETED);
  }

  async toggle(req: Request, res: Response) {
    const id = CommonUtils.getIdFromParams(req);
    const todo = await todoService.getById(id);
    const apiResponse = ApiResponse.addResponse(res);
    if (ObjectChecker.isEmptyOrNull(todo))
      return !apiResponse.notFound(Messages.TODO.NOT_FOUND);
    todo.completed = !todo.completed;
    await todo.save();
    apiResponse.success(todo, Messages.TODO.TOGGLE);
  }

  async deleteCompleted(req: Request, res: Response) {
    const deleteResult = await todoService.deleteCompleted();
    const apiResponse = ApiResponse.addResponse(res);
    if (deleteResult.deletedCount === 0)
      return apiResponse.badRequest(Messages.COMMON.NO_DATA_DELETED);
    apiResponse.success(deleteResult, Messages.TODO.DELETE_COMPLETED);
  }

  async deleteAll(req: Request, res: Response) {
    const deleteResult = await todoService.deleteAll();
    const apiResponse = ApiResponse.addResponse(res);
    if (deleteResult.deletedCount === 0)
      return apiResponse.badRequest(Messages.COMMON.NO_DATA_DELETED);
    apiResponse.success(deleteResult, Messages.TODO.DELETED_ALL)
  }
}

export const todoController = TodoController.getInstance();