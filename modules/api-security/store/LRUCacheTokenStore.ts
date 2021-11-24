import { LRUCache } from "../../generics/LRUCache";
import { TokenDefinition } from "../domain/TokenDefinition";
import { TokenStoreDefinition } from "./TokenStoreDefinition";

export class LRUCacheTokenStore implements TokenStoreDefinition {

  private _store: LRUCache<TokenDefinition>;

  constructor(
    cacheSize: number
  ) {
    this._store = new LRUCache<TokenDefinition>(cacheSize);
  }

  store(token: TokenDefinition): void {
    this._store.set(token.id, token);
  }
  getById(id: string): TokenDefinition | undefined {
    return this._store.get(id);
  }

}