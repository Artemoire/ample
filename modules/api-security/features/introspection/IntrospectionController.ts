import { ControllerV2, Respond } from "../../../api-core-2/ControllerV2";
import { BadRequest, Forbidden, HereYouGo, Unauthorized } from "../../../api-core/CommonResults";
import { ControllerRequest } from "../../../api-core/ControllerRequest";
import { ClientStoreDefinition } from "../../store/ClientStoreDefinition";
import { TokenStoreDefinition } from "../../store/TokenStoreDefinition";
import { IntrospectionFeature } from "./IntrospectionFeature";

export class IntrospectionController extends ControllerV2 {

  private feature: IntrospectionFeature;

  constructor(
    tokenStore: TokenStoreDefinition,
  ) {
    super();
    this.feature = new IntrospectionFeature(
      tokenStore
    )
  }

  async handle(request: ControllerRequest, respond: Respond): Promise<void> {
    const token = request.payload?.token;
    if (!token) return respond(BadRequest("Missing token in request body"));

    await this.feature.does({
      input: token,
      conclude: {
        invalidToken: () => respond(BadRequest('Token is expired')),
        validToken: (token) => respond(HereYouGo(token))
      }
    });

  }

}