import { StudentDto } from "../student/student.domain.type";

export interface AddressDto {
  id?: number;
  city: string;
  studentId?: number;
}
