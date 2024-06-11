import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { randomUUID } from "crypto";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  async createPet(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: randomUUID(),
      specie: data.specie,
      gender: data.gender,
      details: data.details,
      orgId: data.orgId,
    };

    this.items.push(pet);

    return pet;
  }
}
