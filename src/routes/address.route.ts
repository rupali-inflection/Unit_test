import express from "express";
import { AddressController } from "../controller/address.controller";

export const register = (app: express.Application): void => {
  const router = express.Router();

  const controller = new AddressController();

  router.get("/all", controller.get);

  router.get("/:id", controller.getById);

  router.post("/", controller.create);

  router.put("/:id", controller.update);

  router.delete("/:id", controller.del);

  app.use("/api/v1/address", router);
};
// export const addressRoute = express.Router();

// addressRoute.get("/", get);

// addressRoute.post("/", create);

// addressRoute.put("/", update);

// addressRoute.delete("/", del);
