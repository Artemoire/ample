import { ClientDefinition } from "./ClientDefinition";

export class TokenDefinition {

  constructor(
    public readonly id: string,
    public readonly client: string,
    public readonly scope: string
  ) {
  }

  static from(id: string, client: ClientDefinition) {
    return new TokenDefinition(id, client.id, client.scope);
  }

}