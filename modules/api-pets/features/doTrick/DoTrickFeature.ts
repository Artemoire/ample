import { PetDefinition } from "../../domain/PetDefinition";
import { PetStoreDefinition } from "../../store/PetStoreDefinition";

const RAND_ARRAY = <T>(values: T[]): T => {
  return values[Math.floor(Math.random() * values.length)];
}

const TRICKS = [
  "barrel roll",
  "backflip",
  "high five",
]

const TRICK_ADJECTIVES = [
  "cool",
  "fancy",
  "savory",
  "frustrating",
  "epic",
  "battle royale"
]

const petTrick = (): string => RAND_ARRAY(TRICKS);
const trickAdjective = (): string => RAND_ARRAY(TRICK_ADJECTIVES);

const trickFormatter = (pet: PetDefinition) =>
  pet.race === "muggle" ?
    `${pet.name} the ${pet.type}, did a ${trickAdjective()} ${petTrick()}`
    :
    `${pet.name} the ${pet.race} ${pet.type}, did a ${trickAdjective()} ${petTrick()}}`;

export class DoTrickFeature {
  constructor(private store: PetStoreDefinition) {
  }

  does(name: string): string | undefined {
    const pet = this.store.findByName(name);
    if (pet === undefined) return;

    return trickFormatter(pet);
  }

}