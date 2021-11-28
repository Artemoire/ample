import { ClientStoreDefinition } from "../../store/ClientStoreDefinition";
import { TokenStoreDefinition } from "../../store/TokenStoreDefinition";

import { encrypt } from "../../domain/encrypt";
import { IntrospectionConclusions } from "./Conclusions";

type Request = {
  input: string;
  conclude: IntrospectionConclusions;
}

export class IntrospectionFeature {

  constructor(
    private tokenStore: TokenStoreDefinition
  ) {
  }

  async does({ input, conclude }: Request): Promise<void> {
    const token = await this.tokenStore.getById(input);
    if (!token) return await conclude.invalidToken();

    return await conclude.validToken(token);
  }

}