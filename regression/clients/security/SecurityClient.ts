import { ControllerResult } from "../../../modules/api-core/ControllerResult";

export interface SecurityClient {
  getToken(clientId: string, clientSecret: string): Promise<ControllerResult>;
}