import { Conclusion } from "../../../api-core-2/Conclusion";
import { TokenDefinition } from "../../domain/TokenDefinition";

export interface ClientCredentialsAreValid extends Conclusion<TokenDefinition> {
}

export interface ClientIdIsInvalid extends Conclusion<void> {
}

export interface ClientSecretIsInvalid extends Conclusion<void> {

}

export interface RequestTokenConclusions {
  validCredentials: ClientCredentialsAreValid;
  invalidClientId: ClientIdIsInvalid;
  invalidClientSecret: ClientSecretIsInvalid;
}