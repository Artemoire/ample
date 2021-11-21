import { PetDefinition } from "../domain/PetDefinition";

export interface PetStoreDefinition {
  save(pet: PetDefinition): void;
  findByName(id: string): PetDefinition | undefined;
  list(): PetDefinition[];
}