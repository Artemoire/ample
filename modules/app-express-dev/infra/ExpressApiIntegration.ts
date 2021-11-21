import { ApiIntegration } from "../../api-core/ApiIntegration";
import { ControllerDefinition } from "../../api-core/ControllerDefinition";
import { ControllerRequest } from "../../api-core/ControllerRequest";
import { ControllerResult } from "../../api-core/ControllerResult";

const mapExpressRequest = (req: any): ControllerRequest => ({
  payload: req.body,
  query: req.query
})

const mapExpressResult = (res: ControllerResult): any => {

}

export const ExpressApiIntegration =
  (controller: ControllerDefinition) => new ApiIntegration<any, void>(
    controller,
    mapExpressRequest,
    mapExpressResult
  );