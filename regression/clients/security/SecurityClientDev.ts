import { BasicAuth } from "../../../modules/api-core-2/auth/BasicAuth";
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

  async introspect(token: string, credentials: BasicAuth): Promise<ControllerResult> {
    const res = await client.post('/service/security/introspect', {
      token
    }, {
      baseURL: this.baseUrl,
      auth: {
        username: credentials.user,
        password: credentials.pass
      }
    });

    return {
      code: res.status,
      body: res.data
    }
  }

}