import { ControllerRequest } from "./ControllerRequest";
import { ControllerResult } from "./ControllerResult";

export interface ControllerDefinition {
  handle(request: ControllerRequest): ControllerResult | Promise<ControllerResult>;
}