import { ApiDef } from "./ApiDef";
import { Router } from "express";
import { ExpressApiIntegrationV2 } from "../infra/ExpressApiIntegrationV2";

import { clientStore } from "../store/clientStore";
import { tokenStore } from "../store/tokenStore";
import { RequestTokenController } from "../../api-security/features/requestToken/RequestTokenController";
import { ExpressApiBasicAuthIntegrationV2 } from "../infra/ExpressApiBasicAuthIntegrationV2";
import { IntrospectionController } from "../../api-security/features/introspection/IntrospectionController";

const api = Router();

const requestTokenIntegration = ExpressApiIntegrationV2(
  new RequestTokenController(
    clientStore,
    tokenStore
  )
)

const introspectionIntegration = ExpressApiBasicAuthIntegrationV2(
  new IntrospectionController(
    clientStore,
    tokenStore
  )
);

api.post('/token', requestTokenIntegration);
api.post('/introspect', introspectionIntegration);

export const securityApi = ApiDef.from(api, 'security');

