import express from "express";
import { ResponseDto } from "../domain.types/miscellaneous/response.dto";
import { ApiError } from "./api.error";

export class ResponseHandler {
  constructor() {}

  public static success(
    request: express.Request,
    response: express.Response,
    message: string,
    httpCode: number,
    data?: any
  ) {
    const responseObject: ResponseDto = {
      Status: "success",
      Message: message,
      HttpCode: httpCode ?? 200,
      Request: {
        Method: request ? request.method : null,
        Host: request ? request.hostname : null,
        Body: request ? request.body : null,
        Url: request ? request.originalUrl : null,
        Params: request ? request.params : null,
      },
      Data: data ?? null,
    };
    response.status(httpCode).send(responseObject);
  }

  public static failure(
    request: express.Request,
    response: express.Response,
    message?: string,
    httpErrorCode?: number,
    error?: Error
  ) {
    const msg = error
      ? error.message
      : message
      ? message
      : "An error has occurred.";

    const responseObject: ResponseDto = {
      Status: "failure",
      Message: msg,
      Request: {
        Method: request ? request.method : null,
        Host: request ? request.hostname : null,
        Body: request ? request.body : null,
        Url: request ? request.originalUrl : null,
        Params: request ? request.params : null,
      },
      HttpCode: httpErrorCode ? httpErrorCode : 500,
    };

    response.status(httpErrorCode).send(responseObject);
  }

  static handleError(
    request: express.Request,
    response: express.Response,
    error: Error
  ) {
    if (error instanceof ApiError) {
      var err = error as ApiError;
      ResponseHandler.failure(request, response, err.message, err.Code, error);
    } else {
      ResponseHandler.failure(request, response, error.message, 400, error);
    }
  }
}
