import * as express from "express";
import { petsApi } from "./apis/pets-api";

const app = express();

const apis = [
  petsApi
]

apis.forEach((api) => {
  app.use('/service/' + api.api, api.router);
});

export { app };