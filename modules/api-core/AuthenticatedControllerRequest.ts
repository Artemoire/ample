import { ControllerRequest } from "./ControllerRequest";

export interface AuthenticatedControllerRequest<TAuth> extends ControllerRequest {
  auth: TAuth | null;
}