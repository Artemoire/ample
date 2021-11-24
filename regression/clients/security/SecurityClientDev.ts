import { ControllerResult } from "../../../modules/api-core/ControllerResult";
import { baseClient as client } from "../baseClient";
import { SecurityClient } from "./SecurityClient";

export class SecurityClientDev implements SecurityClient {

  constructor(
    private baseUrl: string
  ) { }

  async getToken(clientId: string, clientSecret: string): Promise<ControllerResult> {
    const res = await client.post('/service/security/token', {
      'client_id': clientId,
      'client_secret': clientSecret
    }, {
      baseURL: this.baseUrl
    });

    return {
      code: res.status,
      body: res.data
    }
  }

}