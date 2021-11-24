import { devClients } from "../clients";

const { securityClient } = devClients;

describe("security api", () => {

  it('should not issue token when invalid credentials', async () => {
    const res = await securityClient.getToken('nicky', 'thedog');
    expect(res.code).toBe(400);
  });

  it('should issue a token', async () => {
    const res = await securityClient.getToken('_root_', '12345');
    expect(res.code).toBe(200);
  });
})