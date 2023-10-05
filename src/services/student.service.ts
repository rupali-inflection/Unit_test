import { ApiError } from "../common/api.error";
import { ErrorHandler } from "../common/error.handler";
import { PrismaClient } from "@prisma/client";
import { StudentMapper } from "../mapper/student.mapper";
import { PrismaClientInit } from "../startup/prisma.client.init";

export class StudentService {
  prisma: PrismaClient = null;
  constructor() {
    this.prisma = PrismaClientInit.instance().getPrismaInstance();
  }

  getStudents = async (req) => {
    const students = await this.prisma.student.findMany({
      include: {
        address: true,
      },
    });
    return StudentMapper.toArrayDto(students);
  };

  getStudentById = async (id: number) => {
    const student = await this.prisma.student.findUnique({
      where: {
        id: id,
      },
    });
    return StudentMapper.toDto(student);
  };

  createStudent = async (req) => {
    const student = await this.prisma.student.create({
      data: {
        name: req.body.name,
        age: req.body.age,
      },
    });
    return StudentMapper.toDto(student);
  };

  updateStudent = async (id, requestBody) => {
    const student = await this.prisma.student.update({
      data: {
        name: requestBody.name,
        age: requestBody.age,
      },
      where: {
        id: parseInt(id),
      },
    });
    return StudentMapper.toDto(student);
  };

  deleteStudent = async (id: number) => {
    const student = await this.prisma.student.delete({
      where: {
        id: id,
      },
    });
    return StudentMapper.toDto(student);
  };
}

// export const getStudents = async (req) => {

//   throw 'Unable to process'
//   return "student.service getStudents method";
// };

// export const createStudent = async (req) => {
//   return "student.service createStudent method";
// };

// export const updateStudent = async (req) => {
//   return "student.service updateStudent method";
// };

// export const deleteStudent = async (req) => {
//   return "student.service deleteStudent method";
// };
