import Joi from "joi";
import { ErrorHandler } from "../common/error.handler";

export class StudentValidator {
  static async validateCreateRequest(requestBody) {
    try {
      const schema = Joi.object({
        name: Joi.string().min(2).max(10).required(),
        age: Joi.number().integer().min(15).required(),
      });
      console.log(await schema.validateAsync(requestBody));
      return await schema.validateAsync(requestBody);
    } catch (error) {
      ErrorHandler.handleValidationError(error);
    }
  }

  static async validateUpdateRequest(requestBody) {
    try {
      const schema = Joi.object({
        name: Joi.string().min(2).max(10).optional(),
        age: Joi.number().integer().min(15).optional(),
      });
      console.log(await schema.validateAsync(requestBody));
      return await schema.validateAsync(requestBody);
    } catch (error) {
      ErrorHandler.handleValidationError(error);
    }
  }
}
