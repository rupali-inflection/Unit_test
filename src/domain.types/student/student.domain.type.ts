import { AddressDto } from "../address/address.domain";

export interface StudentDto {
  id?: number;
  name?: string;
  age?: number;
  address?: AddressDto;
}

export interface StudentUpdateModel {
  name?: string;
  age?: number;
}
