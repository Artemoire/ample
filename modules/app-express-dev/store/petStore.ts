import { PetDefinition } from "../../api-pets/domain/PetDefinition";
import { MockPetStore } from "../../api-pets/store/MockPetStore";

const PET_STORE_DATA: PetDefinition[] = [
  {
    name: "nicky",
    race: "cotton de tulear",
    type: "dog"
  }
]

export const petStore = new MockPetStore(PET_STORE_DATA);