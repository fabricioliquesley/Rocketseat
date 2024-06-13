import { Org, Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { randomUUID } from "crypto";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];
  public orgs: Org[] = [];

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
    const pet = this.items.find((pet) => pet.id === id);

    if (!pet) {
      return null;
    }

    return pet;
  }

  async findPets(city: string): Promise<Pet[] | null> {
    const pets = this.items.filter((pet) => {
      const index = this.orgs.findIndex((org) => org.address.includes(city));

      return pet.orgId === this.orgs[index].id;
    });

    if (pets.length === 0) return null;

    return pets;
  }
}
