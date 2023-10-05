import express from "express";
import { StudentController } from "../controller/student.controller";

export const register = (app: express.Application): void => {
  const router = express.Router();

  const controller = new StudentController();

  router.get("/all", controller.get);

  router.get("/:id", controller.getById);

  router.post("/", controller.create);

  router.put("/:id", controller.update);

  router.delete("/:id", controller.del);

  app.use("/api/v1/student", router);
};

// export const studentRoute = express.Router();

// studentRoute.get("/", get);

// studentRoute.post("/", create);

// studentRoute.put("/", update);

// studentRoute.delete("/", del);
