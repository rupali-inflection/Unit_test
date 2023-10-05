import { ApiError } from "../common/api.error";
import { ErrorHandler } from "../common/error.handler";
import { ResponseHandler } from "../common/response.handler";
import { AddressService } from "../services/address.service";
import express from "express";

export class AddressController {
  public service: AddressService;
  constructor() {
    this.service = new AddressService();
  }

  get = async (req, res) => {
    try {
      let address = await this.service.getAddresses(req);
      if (address.length === 0) {
        ErrorHandler.throwNotFoundError("No record");
      }
      const message = "Successfully received address information";
      ResponseHandler.success(req, res, message, 200, address);
    } catch (error: any) {
      ResponseHandler.handleError(req, res, error);
    }
  };

  getById = async (req, res) => {
    try {
      const id: number = parseInt(req.params.id);
      const address = await this.service.getAddressById(id);
      console.log(address);
      if (address === null) {
        ErrorHandler.throwNotFoundError("address Not Found");
      }
      const message = "Successfully received address information";
      ResponseHandler.success(req, res, message, 200, address);
    } catch (error: any) {
      ResponseHandler.handleError(req, res, error);
    }
  };

  create = async (req, res) => {
    try {
      let address = await this.service.createAddress(req);
      if (address === null) {
        throw new ApiError("Unable to create address!", 400);
      }
      const message = "address created successfully";
      ResponseHandler.success(req, res, message, 200, address);
    } catch (error: any) {
      ResponseHandler.handleError(req, res, error);
    }
  };

  update = async (req, res) => {
    try {
      const id: number = parseInt(req.params.id);
      const isPresent = await this.service.getAddressById(id);
      if (isPresent === null) {
        ErrorHandler.throwNotFoundError(
          `Address with id ${req.params.id} not found`
        );
      }

      const address = await this.service.updateAddress(req);
      ResponseHandler.success(req, res, "Successfully updated.", 200, address);
    } catch (error: any) {
      ResponseHandler.handleError(req, res, error);
    }
  };

  del = async (req, res) => {
    try {
      const id: number = parseInt(req.params.id);
      const isPresent = await this.service.getAddressById(id);
      if (isPresent === null) {
        ErrorHandler.throwNotFoundError(
          `Address with id ${req.params.id} not found`
        );
      }

      let response = await this.service.deleteAddress(id);
      const message = "address record deleted successfully";
      ResponseHandler.success(req, res, message, 200, response);
    } catch (error: any) {
      ResponseHandler.handleError(req, res, error);
    }
  };
}
// export const get = async (req:express.Request, res:express.Response) => {
//   try {
//     let response = await getAddress(req);

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

// export const create = async (req:express.Request, res:express.Response) => {
//   try {
//     let response = await createAddress(req);

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

// export const update = async (req:express.Request, res:express.Response) => {
//   try {
//     let response = await updateAddress(req);
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

// export const del = async (req:express.Request, res:express.Response) => {
//   try {
//     let response = await deleteAddress(req);

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
