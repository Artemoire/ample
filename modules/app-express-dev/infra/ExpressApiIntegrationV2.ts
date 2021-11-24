import { Request, Response } from "express";
import { ControllerV2 } from "../../api-core-2/ControllerV2";
import { ControllerRequest } from "../../api-core/ControllerRequest";
import { ControllerResult } from "../../api-core/ControllerResult";

const mapExpressRequest = (req: Request): ControllerRequest => ({
  payload: req.body,
  query: req.query,
  params: req.params
});

export const ExpressApiIntegrationV2 = (controller: ControllerV2) => async (req: Request, res: Response) => {
  const mappedRequest = mapExpressRequest(req);
  try {

    await controller.handle(mappedRequest, (result) => {
      res.status(result.code)
        .json(result.body)
    });

  } catch (error) {

  }
}