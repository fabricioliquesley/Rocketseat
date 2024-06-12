import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { CreatePetService } from "../create-pet";

export function makeCreatePetServices() {
  const prismaPetRepository = new PrismaPetsRepository();
  const createPetService = new CreatePetService(prismaPetRepository);

  return createPetService;
}
