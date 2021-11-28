import { TokenDefinition } from "../../domain/TokenDefinition";

import { ClientStoreDefinition } from "../../store/ClientStoreDefinition";
import { TokenStoreDefinition } from "../../store/TokenStoreDefinition";

import { UpdateClientConclusions } from "./Conclusions";

import { encrypt } from "../../domain/encrypt";
import * as crypto from "crypto";

type Request = {
  input: { clientId: string; clientSecret?: string; scope: string[] }
  conclude: UpdateClientConclusions;
}

export class UpdateClientFeature {

  constructor(
    private clientStore: ClientStoreDefinition,
  ) {
  }

  async does({ input: { clientId, clientSecret, scope }, conclude }: Request): Promise<void> {
    const encryptedClientSecret = encrypt(clientSecret || '12345');

    this.clientStore.store({
      id: clientId,
      encryptedSecret: encryptedClientSecret,
      scope: scope.join(" ")
    })

    console.log((this.clientStore as any)._store);


    return await conclude.success();
  }

}