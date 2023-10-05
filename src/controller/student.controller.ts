import { response } from "express";
import { ApiError } from "../common/api.error";
import { ErrorHandler } from "../common/error.handler";
import { ResponseHandler } from "../common/response.handler";
import { StudentService } from "../services/student.service";
import { StudentValidator } from "./student.validator";
import { StudentUpdateModel } from "../domain.types/student/student.domain.type";

export class StudentController {
  public service: StudentService;
  constructor() {
    this.service = new StudentService();
  }

  get = async (req, res) => {
    try {
      let students = await this.service.getStudents(req);
      if (students.length === 0) {
        ErrorHandler.throwNotFoundError("No record");
      }
      const message = "Successfully received student information";
      ResponseHandler.success(req, res, message, 200, students);
    } catch (error: any) {
      ResponseHandler.handleError(req, res, error);
    }
  };

  getById = async (req, res) => {
    try {
      const id: number = parseInt(req.params.id);
      const student = await this.service.getStudentById(id);
      console.log(student);
      if (student === null) {
        ErrorHandler.throwNotFoundError("Student Not Found");
      }
      const message = "Successfully received student information";
      ResponseHandler.success(req, res, message, 200, student);
    } catch (error: any) {
      ResponseHandler.handleError(req, res, error);
    }
  };

  create = async (req, res) => {
    try {
      await StudentValidator.validateCreateRequest(req.body);

      let student = await this.service.createStudent(req);
      if (student === null) {
        throw new ApiError("Unable to create user!", 400);
      }
      const message = "Student created successfully";
      ResponseHandler.success(req, res, message, 200, student);
    } catch (error: any) {
      ResponseHandler.handleError(req, res, error);
    }
  };

  update = async (req, res) => {
    try {
      const id: number = parseInt(req.params.id);
      const isPresent = await this.service.getStudentById(id);
      if (isPresent === null) {
        ErrorHandler.throwNotFoundError(
          `Student with id ${req.params.id} not found`
        );
      }
      await StudentValidator.validateUpdateRequest(req.body);
      const updateModel: StudentUpdateModel = this.getUpdateModel(req.body);
      const student = await this.service.updateStudent(
        req.params.id,
        updateModel
      );
      ResponseHandler.success(req, res, "Successfully updated.", 200, student);
    } catch (error: any) {
      ResponseHandler.handleError(req, res, error);
    }
  };

  del = async (req, res) => {
    try {
      const id: number = parseInt(req.params.id);
      const isPresent = await this.service.getStudentById(id);
      if (isPresent === null) {
        ErrorHandler.throwNotFoundError(
          `Student with id ${req.params.id} not found`
        );
      }

      let response = await this.service.deleteStudent(id);
      const message = "Student record deleted successfully";
      ResponseHandler.success(req, res, message, 200, response);
    } catch (error: any) {
      ResponseHandler.handleError(req, res, error);
    }
  };

  private getUpdateModel(requestBody): StudentUpdateModel {
    const studentModel: StudentUpdateModel = {
      name: requestBody.name,
      age: requestBody.age ? parseInt(requestBody.age) : undefined,
    };
    return studentModel;
  }
}

// export const get = async (req, res) => {
//   try {
//     let response = await getStudents(req);

//     res.send({
//       Message: response,
//       Url: req.baseUrl,
//       Method: req.method,
//     });
//   } catch (error) {
//     console.log(error);
//     res.send({
//       Message: error,
//       Url: req.baseUrl,
//       Method: req.method,
//     });
//   }
// };

// export const create = async (req, res) => {
//   try {
//     let response = await createStudent(req);

//     res.send({
//       Message: response,
//       Url: req.baseUrl,
//       Method: req.method,
//     });
//   } catch (error) {
//     console.log(error);
//     res.send({
//       Message: error,
//       Url: req.baseUrl,
//       Method: req.method,
//     });
//   }
// };

// export const update = async (req, res) => {
//   try {
//     let response = await updateStudent(req);
//     res.send({
//       Message: response,
//       Url: req.baseUrl,
//       Method: req.method,
//     });
//   } catch (error) {
//     console.log(error);
//     res.send({
//       Message: error,
//       Url: req.baseUrl,
//       Method: req.method,
//     });
//   }
// };

// export const del = async (req, res) => {
//   try {
//     let response = await deleteStudent(req);

//     res.send({
//       Message: response,
//       Url: req.baseUrl,
//       Method: req.method,
//     });
//   } catch (error) {
//     console.log(error);
//     res.send({
//       Message: error,
//       Url: req.baseUrl,
//       Method: req.method,
//     });
//   }
// };
