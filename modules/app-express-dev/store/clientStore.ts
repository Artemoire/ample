import { ClientDefinition } from "../../api-security/domain/ClientDefinition";
import { encrypt } from "../../api-security/domain/encrypt";
import { MockClientStore } from "../../api-security/store/MockClientStore";

export const clientStore = new MockClientStore({
  '_root_': {
    id: '_root_',
    encryptedSecret: encrypt('12345'),
    scope: 'introspect'
  }
});