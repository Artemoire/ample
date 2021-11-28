import { BasicAuth } from "../../modules/api-core-2/auth/BasicAuth";
import { clients } from "../clients";

const { securityClient } = clients;

describe("security api", () => {

  describe('token endpoint', () => {

    it('should not issue token when invalid credentials', async () => {
      const res = await securityClient.getToken('nicky', 'thedog');
      expect(res.code).toBe(400);
    });

    it('should issue a token', async () => {
      const res = await securityClient.getToken('_root_', '12345');
      expect(res.code).toBe(200);
    });

  });

  describe('introspect endpoint', () => {

    it('should not allow introspection with invalid credentials', async () => {
      const res = await securityClient.introspect('xxx', new BasicAuth('aaa', 'bbb'));
      expect(res.code).toBe(401);
    });

    it('should not allow introspection when client has insufficient rights', async () => {
      const res = await securityClient.introspect('xxx', new BasicAuth('_dummy_', '12345'));
      expect(res.code).toBe(403);
    });

    it('should return error when token does not exist', async () => {
      const res = await securityClient.introspect('xxx', new BasicAuth('_root_', '12345'));
      expect(res.code).toBe(400);
    })

    it('should return token details', async () => {
      const tokenRes = await securityClient.getToken('_dummy_', '12345');
      const token = tokenRes.body['access_token'];
      const res = await securityClient.introspect(token, new BasicAuth('_root_', '12345'));

      expect(res.code).toBe(200);
    });

  });

});