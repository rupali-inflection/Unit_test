import { AddressDto } from "../domain.types/address/address.domain";
import { StudentDto } from "../domain.types/student/student.domain.type";

export class AddressMapper {
  static toDto = (record): AddressDto => {
    if (record === null) {
      return null;
    }

    const dto: AddressDto = {
      id: record.id,
      city: record.city,
      studentId: record.studentId,
    };

    return dto;
  };

  static toArrayDto(record: any[]): AddressDto[] {
    if (record === null) {
      return null;
    }

    const dtos: AddressDto[] = [];
    record.forEach((element) => {
      dtos.push({
        id: element.id,
        city: element.city,
        studentId: element.studentId,
      });
    });
    return dtos;
  }
}
