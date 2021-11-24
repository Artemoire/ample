import * as express from "express";
import { petsApi } from "./apis/pets-api";
import { securityApi } from "./apis/security-api";

const app = express();

app.use(express.json());

const apis = [
  petsApi,
  securityApi
]

apis.forEach((api) => {
  app.use('/service/' + api.api, api.router);
});

export { app };