import { ClientStoreDefinition } from "../../store/ClientStoreDefinition";
import { TokenStoreDefinition } from "../../store/TokenStoreDefinition";

import { encrypt } from "../../domain/encrypt";
import { IntrospectionConclusions } from "./Conclusions";

type Request = {
  input: { clientId: string; clientSecret: string; introspectedToken: string; }
  conclude: IntrospectionConclusions;
}

export class IntrospectionFeature {

  constructor(
    private clientStore: ClientStoreDefinition,
    private tokenStore: TokenStoreDefinition
  ) {
  }

  async does({ input: { clientId, clientSecret, introspectedToken }, conclude }: Request): Promise<void> {
    const storedClient = this.clientStore.findById(clientId);
    if (storedClient === undefined) return await conclude.invalidClient();

    const encryptedClientSecret = encrypt(clientSecret);
    if (storedClient.encryptedSecret !== encryptedClientSecret) return await conclude.invalidClient();
    if (!storedClient.scope.split(" ").includes("introspect")) return await conclude.clientCantIntrospect();

    const token = await this.tokenStore.getById(introspectedToken);
    if (!token) return await conclude.invalidToken();

    return await conclude.validToken(token);
  }

}