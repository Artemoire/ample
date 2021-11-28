import { ApiDef } from "./ApiDef";
import { Router } from "express";
import { ProxyV2Integration } from "../infra/ProxyV2Integration";

import { clientStore } from "../store/clientStore";
import { tokenStore } from "../store/tokenStore";
import { RequestTokenController } from "../../api-security/features/requestToken/RequestTokenController";
import { IntrospectionController } from "../../api-security/features/introspection/IntrospectionController";
import { BasicAuthMiddleware } from "../infra/BasicAuthMiddleware";

const api = Router();

const requestTokenIntegration = ProxyV2Integration(
  new RequestTokenController(
    clientStore,
    tokenStore
  )
)

const introspectionIntegration = ProxyV2Integration(
  new IntrospectionController(
    tokenStore
  )
);
const introspectionAuth = BasicAuthMiddleware('introspect', clientStore);

api.post('/token', requestTokenIntegration);
api.post('/introspect', introspectionAuth, introspectionIntegration);

export const securityApi = ApiDef.from(api, 'security');

