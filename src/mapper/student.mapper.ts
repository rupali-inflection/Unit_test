import { StudentDto } from "../domain.types/student/student.domain.type";

export class StudentMapper {
  static toDto = (record): StudentDto => {
    if (record === null) {
      return null;
    }

    const dto: StudentDto = {
      id: record.id,
      name: record.name,
      age: record.age,
    };

    return dto;
  };

  static toArrayDto(record: any[]): StudentDto[] {
    if (record === null) {
      return null;
    }

    const dtos: StudentDto[] = [];
    record.forEach((element) => {
      dtos.push({
        id: element.id,
        name: element.name,
        age: element.age,
        address: element.address,
      });
    });
    return dtos;
  }
}
