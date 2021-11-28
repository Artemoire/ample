import { Request, Response, NextFunction } from "express";
import { BasicAuth } from "../../api-core-2/auth/BasicAuth";
import { encrypt } from "../../api-security/domain/encrypt";
import { ClientStoreDefinition } from "../../api-security/store/ClientStoreDefinition";


const unauthorized = (res: Response) => res.status(401).json({ message: 'Unauthorized' });
const forbidden = (res: Response) => res.status(403).json({ message: 'Forbidden' });


export const BasicAuthMiddleware = (requiredScope: string, clientStore: ClientStoreDefinition) => async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization === undefined) return unauthorized(res);
  const basicAuth = BasicAuth.fromHeader(req.headers.authorization);
  if (basicAuth === null) return unauthorized(res);

  const clientDefinition = await clientStore.findById(basicAuth.user);
  if (clientDefinition === undefined) return unauthorized(res);
  const secret = encrypt(basicAuth.pass);
  if (clientDefinition.encryptedSecret !== secret) return unauthorized(res);
  if (!clientDefinition.scope.split(" ").includes(requiredScope)) return forbidden(res);

  return next();
}