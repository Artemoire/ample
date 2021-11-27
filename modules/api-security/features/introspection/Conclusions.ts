import { Conclusion } from "../../../api-core-2/Conclusion";
import { TokenDefinition } from "../../domain/TokenDefinition";

export interface IntrospectionConclusions {
  invalidClient: Conclusion<void>;
  clientCantIntrospect: Conclusion<void>;
  invalidToken: Conclusion<void>;
  validToken: Conclusion<TokenDefinition>;
}