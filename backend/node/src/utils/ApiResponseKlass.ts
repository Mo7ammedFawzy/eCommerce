import type {Response} from "express";
import {ReasonPhrases, StatusCodes} from "http-status-codes";

class ApiResponseKlass {
  private _response!: Response;

  static getInstance(): ApiResponseKlass {
    return new ApiResponseKlass();
  }

  get response(): Response {
    return this._response;
  }

  set response(value: Response) {
    this._response = value;
  }

  addResponse(response: Response): ApiResponseKlass {
    this._response = response;
    return this;
  }

  created<T>(data: T) {
    return this.response.status(StatusCodes.CREATED).json({
      status: ReasonPhrases.CREATED,
      data
    })
  }

  success(data: unknown, message?: string) {
    return this.response.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message,
      data,
    })
  }

  badRequest(message: ReasonPhrases | string = ReasonPhrases.BAD_REQUEST) {
    return this.response.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      message
    })
  }

  notFound(message: ReasonPhrases | string = ReasonPhrases.NOT_FOUND) {
    return this.response.status(StatusCodes.NOT_FOUND).json({
      status: StatusCodes.NOT_FOUND,
      message
    })
  }

  requiredFields(...fields: string[]) {
    const message: string = fields.reduce((sentence, field) => {
      sentence += field + " is required, ";
      return sentence;
    }, "");
    return this.response.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      message
    })
  }
}

export const ApiResponse = ApiResponseKlass.getInstance()