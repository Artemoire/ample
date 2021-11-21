import { ControllerResult } from "../../../modules/api-core/ControllerResult";
import { baseClient as client } from "../baseClient";
import { PetClient } from "./PetClient";

export class PetClientDev implements PetClient {
  constructor(
    private baseUrl: string
  ) { }

  async doTrick(name: string): Promise<ControllerResult> {
    const res = await client.get(`/service/pets/${name}/_trick`,
      {
        baseURL: this.baseUrl
      }
    );
    return {
      code: res.status,
      body: res.data
    }
  }

  async storePet(name: string, type: "cat" | "dog", race?: string): Promise<ControllerResult> {
    const raceParam = race ? '&race=' + race : "";
    const res = await client.get(`/service/pets/_store?name=${name}&type=${type}${raceParam}`,
      {
        baseURL: this.baseUrl
      }
    );
    return {
      code: res.status,
      body: res.data
    }
  }
}