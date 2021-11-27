import { AuthenticatedControllerRequest } from "../api-core/AuthenticatedControllerRequest";
import { ControllerResult } from "../api-core/ControllerResult";
import { Conclusion } from "./Conclusion";

export interface Respond extends Conclusion<ControllerResult> {
}

export abstract class AuthenticatedControllerV2<TAuth> {
  abstract handle(request: AuthenticatedControllerRequest<TAuth>, respond: Respond): Promise<void>;
}