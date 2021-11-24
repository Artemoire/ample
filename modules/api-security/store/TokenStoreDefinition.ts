import { TokenDefinition } from "../domain/TokenDefinition";

export interface TokenStoreDefinition {
  store(token: TokenDefinition): void;
  getById(id: string): TokenDefinition | undefined;
}