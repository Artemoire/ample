import { clients } from "../clients";

const { petClient } = clients;

describe("pets api", () => {

  it('should have nicky do a trick', async () => {
    const res = await petClient.doTrick('nicky');
    expect(res.code).toBe(200);
  });

  it('should allow storing a pet', async () => {
    const res = await petClient.storePet("freya", "cat", "russian blue");
    expect(res.code).toBe(200);
  });
})