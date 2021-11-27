import { Request, Response } from "express";
import { AuthenticatedControllerV2 } from "../../api-core-2/AuthenticatedControllerV2";
import { BasicAuth } from "../../api-core-2/BasicAuth";
import { AuthenticatedControllerRequest } from "../../api-core/AuthenticatedControllerRequest";

const parseBasicAuth = (authorizationHeader: string | undefined): BasicAuth | null => {
  if (!authorizationHeader) return null;
  if (!authorizationHeader.startsWith('Basic ')) return null;
  const decodedHeader = Buffer.from(authorizationHeader.substr('Basic '.length), "base64").toString("utf8");

  const firstColon = decodedHeader.indexOf(":");
  if (firstColon == -1) return null;
  return {
    clientId: decodedHeader.substr(0, firstColon),
    clientSecret: decodedHeader.substr(firstColon + 1)
  }
}

const mapExpressRequest = (req: Request): AuthenticatedControllerRequest<BasicAuth> => ({
  payload: req.body,
  query: req.query,
  params: req.params,
  headers: {},
  auth: parseBasicAuth(req.headers.authorization)
});

export const ExpressApiBasicAuthIntegrationV2 = (controller: AuthenticatedControllerV2<BasicAuth>) => async (req: Request, res: Response) => {
  const mappedRequest = mapExpressRequest(req);
  try {

    await controller.handle(mappedRequest, (result) => {
      res.status(result.code)
        .json(result.body)
    });

  } catch (error) {

  }
}