import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetDetailsService } from "../get-pet-details-service";

export function makeGetPetDetailsService() {
  const prismaPetRepository = new PrismaPetsRepository();
  const getPetDetailsService = new GetPetDetailsService(prismaPetRepository);

  return getPetDetailsService;
}
