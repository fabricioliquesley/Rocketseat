import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { randomUUID } from "crypto";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  async createPet(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      category: data.category,
      gender: data.gender,
      details: data.details,
      orgId: data.orgId,
    };

    this.items.push(pet);

    return pet;
  }

  async findPetById(id: string): Promise<Pet | null> {
    const pet = this.items.find(pet => pet.id === id);

    if (!pet) {
      return null;
    }

    return pet
  }
}
