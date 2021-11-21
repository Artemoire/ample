import { PetDefinition } from "../../domain/PetDefinition";
import { PetStoreDefinition } from "../../store/PetStoreDefinition";

export class StorePetFeature {

  constructor(private store: PetStoreDefinition) {
  }

  does(input: PetDefinition): void {
    this.store.save(input);
  }

}