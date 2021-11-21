import { Request, Response } from "express";
import { ApiIntegration } from "../../api-core/ApiIntegration";
import { ControllerDefinition } from "../../api-core/ControllerDefinition";
import { ControllerRequest } from "../../api-core/ControllerRequest";
import { ControllerResult } from "../../api-core/ControllerResult";

const mapExpressRequest = (req: Request): ControllerRequest => ({
  payload: req.body,
  query: req.query
});

export const ExpressApiIntegration = (controller: ControllerDefinition) => async (req: Request, res: Response) => {
  const mappedRequest = mapExpressRequest(req);
  try {
    const controllerResult = await controller.handle(mappedRequest);

    res
      .status(controllerResult.code)
      .json(controllerResult.body);
  } catch (error) {

  }
}