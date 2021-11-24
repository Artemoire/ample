import { ApiDef } from "./ApiDef";
import { Router } from "express";
import { ExpressApiIntegrationV2 } from "../infra/ExpressApiIntegrationV2";

import { clientStore } from "../store/clientStore";
import { tokenStore } from "../store/tokenStore";
import { RequestTokenController } from "../../api-security/features/requestToken/RequestTokenController";

const api = Router();

const requestTokenIntegration = ExpressApiIntegrationV2(
  new RequestTokenController(
    clientStore,
    tokenStore
  )
)

api.post('/token', requestTokenIntegration);

export const securityApi = ApiDef.from(api, 'security');

