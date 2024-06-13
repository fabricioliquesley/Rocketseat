import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { describe, beforeEach, it, expect } from "vitest";
import { GetPetsService } from "./get-pets";
import { PetNotFoundError } from "./erros/pet-not-found-error";

let petsRepository: InMemoryPetsRepository;
let sut: GetPetsService;

describe("get pets service", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new GetPetsService(petsRepository);
  });

  it("should be able list all pets of a city", async () => {
    petsRepository.orgs.push({
      id: "12",
      address: "Maranhão",
      email: "org.maranhao@gmail.com",
      name: "MaraOrg",
      password_hash: "123",
      whatsApp_number: "0000-0000",
    });

    petsRepository.orgs.push({
      id: "13",
      address: "São Paulo",
      email: "org.saopaulo@gmail.com",
      name: "SPOrg",
      password_hash: "123",
      whatsApp_number: "0000-0000",
    });

    for (let i = 0; i < 3; i++) {
      let orgId = "12";

      if (i > 0) orgId = "13";

      petsRepository.items.push({
        id: String(i),
        category: "dog",
        gender: "male",
        details: `Lola #${i + 1}`,
        orgId,
      });
    }

    const { pets } = await sut.executeGetPets({
      city: "São Paulo",
    });

    expect(pets.length).toEqual(2);
  });

  it("should not be possible to list pets with an unregistered city", async () => {
    expect(async () => {
      await sut.executeGetPets({ city: "Maranhão" });
    }).rejects.toBeInstanceOf(PetNotFoundError);
  });

  it("must be able to list pets by characteristics", async () => {
    petsRepository.orgs.push({
      id: "12",
      address: "Maranhão",
      email: "org.maranhao@gmail.com",
      name: "MaraOrg",
      password_hash: "123",
      whatsApp_number: "0000-0000",
    });

    for (let i = 0; i < 6; i++) {
      let eyeColor = "preto";
      let animalType = "cadela"

      if (i == 2 || i == 5) {
        eyeColor = "azul"
        animalType = "gata"
      };

      petsRepository.items.push({
        id: String(i),
        category: "dog",
        gender: "male",
        details: `Lola é uma ${animalType}  #${i + 1}, cor do olho ${eyeColor}`,
        orgId: "12",
      });
    }

    const { pets } = await sut.executeGetPets({
      city: "Maranhão",
      searchDescription: "gata azul"
    }); 

    expect(pets.length).toEqual(2);
  });
});
