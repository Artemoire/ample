import { ControllerResult } from "../../../modules/api-core/ControllerResult";

export interface PetClient {
  doTrick(name: string): Promise<ControllerResult>;
  storePet(name: string, type: "cat" | "dog", race?: string): Promise<ControllerResult>;
}