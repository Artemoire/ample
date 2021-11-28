import { Conclusion } from "../../../api-core-2/Conclusion";
import { TokenDefinition } from "../../domain/TokenDefinition";

export interface IntrospectionConclusions {
  invalidToken: Conclusion<void>;
  validToken: Conclusion<TokenDefinition>;
}