import { ControllerRequest } from "../api-core/ControllerRequest";
import { ControllerResult } from "../api-core/ControllerResult";
import { Conclusion } from "./Conclusion";

export interface Respond extends Conclusion<ControllerResult> {
}

export abstract class ControllerV2 {
  abstract handle(request: ControllerRequest, respond: Respond): Promise<void>;
}