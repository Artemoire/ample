import { ClientDefinition } from "../domain/ClientDefinition";

export interface ClientStoreDefinition {
  store(client: ClientDefinition): void;
  findById(id: string): ClientDefinition | undefined;
}