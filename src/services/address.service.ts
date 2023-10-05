import { PrismaClient } from ".prisma/client";
import { AddressMapper } from "../mapper/address.mapper";
import { PrismaClientInit } from "../startup/prisma.client.init";

export class AddressService {
  prisma: PrismaClient = null;
  constructor() {
    this.prisma = PrismaClientInit.instance().getPrismaInstance();
  }

  getAddresses = async (req) => {
    const addresses = await this.prisma.address.findMany({});
    return AddressMapper.toArrayDto(addresses);
  };

  getAddressById = async (id: number) => {
    const student = await this.prisma.address.findUnique({
      where: {
        id: id,
      },
    });
    return AddressMapper.toDto(student);
  };

  createAddress = async (req) => {
    const student = await this.prisma.address.create({
      data: {
        city: req.body.city,
        studentId: parseInt(req.body.studentId),
      },
    });
    return AddressMapper.toDto(student);
  };

  updateAddress = async (req) => {
    const address = await this.prisma.address.update({
      data: {
        city: req.body.city,
      },
      where: {
        id: parseInt(req.params.id),
      },
    });
    return AddressMapper.toDto(address);
  };

  deleteAddress = async (id: number) => {
    const address = await this.prisma.address.delete({
      where: {
        id: id,
      },
    });
    return AddressMapper.toDto(address);
  };
}
// export const getAddress = async (req) => {

//     //throw 'Unable to process'
//     return "Address.service getAddress method";
//   };

//   export const createAddress = async (req) => {
//     return "Address.service createAddress method";
//   };

//   export const updateAddress = async (req) => {
//     return "Address.service updateAddress method";
//   };

//   export const deleteAddress = async (req) => {
//     return "Address.service deleteAddress method";
//   };
