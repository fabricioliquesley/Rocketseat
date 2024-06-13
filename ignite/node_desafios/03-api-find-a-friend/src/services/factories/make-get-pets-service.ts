import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetsService } from "../get-pets";

export function makeGetPetsService() {
  const prismaPetRepository = new PrismaPetsRepository();
  const getPetsService = new GetPetsService(prismaPetRepository);

  return getPetsService;
}
