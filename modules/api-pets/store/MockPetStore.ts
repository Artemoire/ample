import { PetDefinition } from "../domain/PetDefinition";
import { PetStoreDefinition } from "./PetStoreDefinition";
import { MockStore } from "../../api-core/store/MockStore";

export class MockPetStore implements PetStoreDefinition {

  private store: MockStore<PetDefinition>;

  constructor(
    pets?: PetDefinition[]
  ) {
    this.store = {};
    pets = pets || [];
    pets.forEach(pet => this.store[pet.name] = pet)
  }

  save(pet: PetDefinition): void {
    this.store[pet.name] = pet;
  }

  findByName(name: string): PetDefinition | undefined {
    return this.store[name];
  }

  list(): PetDefinition[] {
    return Object.values(this.store);
  }

}