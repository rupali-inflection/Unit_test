import express from "express";
import { register as registerStudentRoutes } from "../routes/student.route";
import { register as registerAddressRoutes } from "../routes/address.route";
export class Router {
  private _app:express.Application;
  constructor(app: express.Application) {
    this._app = app;
  }

  public init = async (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      try {
        this._app.get("/api/v1/", (req: any, res: any) => {
          res.send({
            message: `Demo Service API [Version ${process.env.API_VERSION}]`,
          });
        });

        registerStudentRoutes(this._app);
        registerAddressRoutes(this._app);
        resolve(true);
      } catch (error) {
        console.log(`Error initializing the router:  ${error}`);
        reject(false);
      }
    });
  };
}
