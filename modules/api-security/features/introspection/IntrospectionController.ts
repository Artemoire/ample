import { AuthenticatedControllerV2, Respond } from "../../../api-core-2/AuthenticatedControllerV2";
import { BasicAuth } from "../../../api-core-2/BasicAuth";
import { AuthenticatedControllerRequest } from "../../../api-core/AuthenticatedControllerRequest";
import { BadRequest, Forbidden, HereYouGo, Unauthorized } from "../../../api-core/CommonResults";
import { ClientStoreDefinition } from "../../store/ClientStoreDefinition";
import { TokenStoreDefinition } from "../../store/TokenStoreDefinition";
import { IntrospectionFeature } from "./IntrospectionFeature";

export class IntrospectionController implements AuthenticatedControllerV2<BasicAuth> {

  private feature: IntrospectionFeature;

  constructor(
    clientStore: ClientStoreDefinition,
    tokenStore: TokenStoreDefinition,
  ) {
    this.feature = new IntrospectionFeature(
      clientStore,
      tokenStore
    )
  }

  async handle(request: AuthenticatedControllerRequest<BasicAuth>, respond: Respond): Promise<void> {
    const token = request.payload?.token;
    if (!token) return respond(BadRequest("Missing token in request body"));
    if (!request.auth) return respond(Unauthorized('Unauthorized'));

    await this.feature.does({
      input: {
        clientId: request.auth.clientId,
        clientSecret: request.auth.clientSecret,
        introspectedToken: token
      },
      conclude: {
        invalidClient: () => respond(Unauthorized('Unauthorized')),
        clientCantIntrospect: () => respond(Forbidden('Forbidden')),
        invalidToken: () => respond(BadRequest('Token is expired')),
        validToken: (token) => respond(HereYouGo(token))
      }
    });

  }

}