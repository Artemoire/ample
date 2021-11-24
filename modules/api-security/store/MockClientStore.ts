import { Dictionary } from "../../generics/Dictionary";
import { ClientDefinition } from "../domain/ClientDefinition";
import { ClientStoreDefinition } from "./ClientStoreDefinition";

export class MockClientStore implements ClientStoreDefinition {

  private _store: Dictionary<ClientDefinition>;

  constructor(store?: Dictionary<ClientDefinition>) {
    this._store = store || {};
  }

  store(client: ClientDefinition): void {
    this._store[client.id] = client;
  }

  findById(id: string): ClientDefinition | undefined {
    return this._store[id];
  }

}