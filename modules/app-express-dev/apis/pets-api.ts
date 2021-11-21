import { Router } from "express";
import { DoTrickController } from "../../api-pets/features/doTrick/DoTrickController";
import { DoTrickFeature } from "../../api-pets/features/doTrick/DoTrickFeature";
import { StorePetController } from "../../api-pets/features/storePet/StorePetController";
import { StorePetFeature } from "../../api-pets/features/storePet/StorePetFeature";
import { ExpressApiIntegration } from "../infra/ExpressApiIntegration";
import { petStore } from "../store/petStore";
import { ApiDef } from "./ApiDef";

const api = Router();

const doTrickIntegration = ExpressApiIntegration(
  new DoTrickController(
    new DoTrickFeature(
      petStore
    )
  )
)

const storePetIntegration = ExpressApiIntegration(
  new StorePetController(
    new StorePetFeature(
      petStore
    )
  )
)

api.get('/:petName/_trick', doTrickIntegration)

api.put('/', storePetIntegration);

export const petsApi = ApiDef.from(api, 'pets');