import { ControllerV2, Respond } from "../../../api-core-2/ControllerV2";
import { BadRequest, HereYouGo, Ok } from "../../../api-core/CommonResults";
import { ControllerRequest } from "../../../api-core/ControllerRequest";
import { ClientStoreDefinition } from "../../store/ClientStoreDefinition";
import { TokenStoreDefinition } from "../../store/TokenStoreDefinition";
import { RequestTokenFeature } from "./RequestTokenFeature";

export class RequestTokenController extends ControllerV2 {

  private feature: RequestTokenFeature;

  constructor(
    clientStore: ClientStoreDefinition,
    tokenStore: TokenStoreDefinition,
  ) {
    super();
    this.feature = new RequestTokenFeature(clientStore, tokenStore);
  }

  async handle(request: ControllerRequest, respond: Respond): Promise<void> {
    if (!('client_id' in request.payload)) return respond(BadRequest('must provide client_id'));
    if (!('client_secret' in request.payload)) return respond(BadRequest('must provide client_secret'));

    const clientId = request.payload['client_id'];
    const clientSecret = request.payload['client_secret'];

    await this.feature.does({
      input: { clientId, clientSecret }, conclude: {
        invalidClientId: () => respond(BadRequest('Invalid client credentials')),
        invalidClientSecret: () => respond(BadRequest('Invalid client secret')),
        validCredentials: (token) => respond(HereYouGo({ 'access_token': token.id }))
      }
    })
  }

}