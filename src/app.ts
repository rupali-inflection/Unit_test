import express from "express";
import { Router } from "./startup/router";
export default class Application {

  public _app: express.Application = null;;

  private _router: Router = null;

  private static _instance: Application | null = null;

  private constructor() {
    this._app = express();
    this._router = new Router(this._app);
  }

  public static instance(): Application {
    if(this._instance===null){
      return this._instance = new this()
    }
    else{
      return this._instance
    }
    //return this._instance || (this._instance = new this());
  }

  start = async () => {
    try {
      this.setupMiddlewares();
      //Create and mount the routes
      this._router.init();
      this.listen();
    } catch (error) {
      console.log(
        `An error occurred while starting demo-api service. ${error}`
      );
    }
  };

  private listen = async () => {
    return new Promise((resolve, reject) => {
      try {
        const port = process.env.PORT;
        this._app.listen(port, () => {
          console.log(
            `Demo API-service is up and listening on port ${process.env.PORT}`
          );
        });
      resolve(this._app)
      } catch (error) {
      reject(error)
      }
    });
  };

  private setupMiddlewares = async () => {
    return new Promise((resolve, reject) => {
      try {
        this._app.use(express.urlencoded());
        this._app.use(express.json());
        resolve(true);
      } catch (error) {
        reject(error)
      }
    });
  };
}
