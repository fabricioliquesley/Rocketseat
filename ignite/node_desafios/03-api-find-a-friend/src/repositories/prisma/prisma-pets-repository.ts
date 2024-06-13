import { Prisma, Pet } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
  async createPet(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data });

    return pet;
  }

  async findPetById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: { id },
    });

    return pet;
  }

  async findPets(city: string): Promise<Pet[] | null> {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          address: {
            contains: city
          }
        }
      },
      include: {
        org: true
      }
    })

    return pets
  }
}
