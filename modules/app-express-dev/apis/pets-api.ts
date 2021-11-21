import { Router } from "express";
import { DoTrickController } from "../../api-pets/features/doTrick/DoTrickController";
import { DoTrickFeature } from "../../api-pets/features/doTrick/DoTrickFeature";
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

api.get('/', doTrickIntegration)

export const petsApi = ApiDef.from(api, 'pets');