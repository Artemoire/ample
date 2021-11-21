import { PetClientDev } from "./pets/PetClientDev";

if (!process.env.BASE_URL) throw new Error("Missing env var BASE_URL");

const petClient = new PetClientDev(process.env.BASE_URL);

export const devClients = {
  petClient
}