import { TokenDefinition } from "../../domain/TokenDefinition";

import { ClientStoreDefinition } from "../../store/ClientStoreDefinition";
import { TokenStoreDefinition } from "../../store/TokenStoreDefinition";

import { RequestTokenConclusions } from "./Conclusions";

import { encrypt } from "../../domain/encrypt";
import * as crypto from "crypto";

type Request = {
  input: { clientId: string; clientSecret: string; }
  conclude: RequestTokenConclusions;
}

export class RequestTokenFeature {

  constructor(
    private clientStore: ClientStoreDefinition,
    private tokenStore: TokenStoreDefinition
  ) {
  }

  async does({ input: { clientId, clientSecret }, conclude }: Request): Promise<void> {
    const storedClient = this.clientStore.findById(clientId);
    if (storedClient === undefined) return await conclude.invalidClientId();

    const encryptedClientSecret = encrypt(clientSecret);
    if (storedClient.encryptedSecret !== encryptedClientSecret) return await conclude.invalidClientSecret();

    const issuedToken = TokenDefinition.from(crypto.randomBytes(32).toString('hex'), storedClient);

    this.tokenStore.store(issuedToken);

    return await conclude.validCredentials(issuedToken);
  }

}