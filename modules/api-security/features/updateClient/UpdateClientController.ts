import { ControllerV2, Respond } from "../../../api-core-2/ControllerV2";
import { BadRequest, Ok } from "../../../api-core/CommonResults";
import { ControllerRequest } from "../../../api-core/ControllerRequest";
import { ClientStoreDefinition } from "../../store/ClientStoreDefinition";
import { UpdateClientFeature } from "./UpdateClientFeature";

export class UpdateClientController extends ControllerV2 {

  private feature: UpdateClientFeature;

  constructor(
    clientStore: ClientStoreDefinition,
  ) {
    super();
    this.feature = new UpdateClientFeature(clientStore);
  }

  async handle(request: ControllerRequest, respond: Respond): Promise<void> {
    if (!('client' in request.payload)) return respond(BadRequest('must provide client'));
    if (!('scope' in request.payload)) return respond(BadRequest('must provide scope'));

    const clientId = request.payload['client'];
    const clientSecret = request.payload['secret'];
    const scope = request.payload['scope'];

    if (!Array.isArray(scope)) return respond(BadRequest('scope property must be array of strings'));

    await this.feature.does({
      input: { clientId, clientSecret, scope }, conclude: {
        success: () => respond(Ok('updated'))
      }
    });
  }

}