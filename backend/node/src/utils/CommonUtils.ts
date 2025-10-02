import {Request} from "express";

class CommonUtilsKlass {
  private static _instance: CommonUtilsKlass;

  private constructor() {
  }

  static getInstance(): CommonUtilsKlass {
    if (!this._instance)
      this._instance = new CommonUtilsKlass();
    return this._instance;
  }


  getParam(params: Record<string, any>, key: string): string {
    return params[key];
  }


  getBody<T extends object, K extends keyof T>(body: T, key: K): T[K] | undefined {
    return body[key];
  }

  getIdFromParams(req: Request) {
    return this.getParam(req.params, "id");
  }
}

export const CommonUtils = CommonUtilsKlass.getInstance();