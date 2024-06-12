import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
  createPet(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findPetById(id: string): Promise<Pet | null>;
}
